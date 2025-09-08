import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Link, BookOpen, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { conceptUtils } from '../data/conceptRegistry';
import { cn } from '@/lib/utils';

const ConceptSearch = ({ 
  isOpen, 
  onClose, 
  onConceptSelect, 
  onDiagramNavigate,
  className 
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Search concepts when query changes
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate search delay for better UX
    const searchTimeout = setTimeout(() => {
      const searchResults = conceptUtils.searchConcepts(query);
      setResults(searchResults);
      setSelectedIndex(0);
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            handleConceptSelect(results[selectedIndex]);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  const handleConceptSelect = (concept) => {
    onConceptSelect?.(concept);
    onClose();
    setQuery('');
  };

  const handleDiagramNavigate = (concept, diagramId) => {
    onDiagramNavigate?.(diagramId, concept);
    onClose();
    setQuery('');
  };

  const getCategoryColor = (category) => {
    const colors = {
      identity: 'bg-purple-100 text-purple-800',
      memory: 'bg-blue-100 text-blue-800',
      cognition: 'bg-green-100 text-green-800',
      metabolism: 'bg-orange-100 text-orange-800',
      embodiment: 'bg-gray-100 text-gray-800',
      sensing: 'bg-yellow-100 text-yellow-800',
      action: 'bg-red-100 text-red-800',
      evolution: 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getImportanceIcon = (importance) => {
    switch (importance) {
      case 'critical': return '🔴';
      case 'high': return '🟡';
      case 'medium': return '🟢';
      default: return '⚪';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className={cn("w-full max-w-2xl mx-4", className)}>
        <Card className="shadow-2xl">
          <CardContent className="p-0">
            {/* Search Header */}
            <div className="flex items-center p-4 border-b">
              <Search className="h-5 w-5 text-gray-400 mr-3" />
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search concepts across all diagrams..."
                className="border-0 focus:ring-0 text-lg"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="ml-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto">
              {isLoading && (
                <div className="p-4 text-center text-gray-500">
                  Searching concepts...
                </div>
              )}

              {!isLoading && query.trim().length >= 2 && results.length === 0 && (
                <div className="p-4 text-center text-gray-500">
                  No concepts found for "{query}"
                </div>
              )}

              {!isLoading && results.length > 0 && (
                <div className="py-2">
                  {results.map((concept, index) => (
                    <div
                      key={concept.id}
                      className={cn(
                        "px-4 py-3 cursor-pointer border-l-4 border-transparent hover:bg-gray-50",
                        index === selectedIndex && "bg-blue-50 border-blue-500"
                      )}
                      onClick={() => handleConceptSelect(concept)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm">
                              {getImportanceIcon(concept.metadata.importance)}
                            </span>
                            <h3 className="font-medium text-gray-900 truncate">
                              {concept.canonicalName}
                            </h3>
                            <Badge 
                              variant="secondary" 
                              className={cn("text-xs", getCategoryColor(concept.category))}
                            >
                              {concept.category}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {concept.definition}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Lightbulb className="h-3 w-3" />
                              <span>Biological analogy available</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Link className="h-3 w-3" />
                              <span>{concept.relatedConcepts.length} related</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="ml-4 flex-shrink-0">
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>

                      {/* Diagram Locations */}
                      <div className="mt-2 flex flex-wrap gap-1">
                        {Object.keys(concept.diagramLocations).map((diagramId) => (
                          <Button
                            key={diagramId}
                            variant="outline"
                            size="sm"
                            className="h-6 px-2 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDiagramNavigate(concept, diagramId);
                            }}
                          >
                            <BookOpen className="h-3 w-3 mr-1" />
                            {diagramId.replace('-', ' ')}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Search Tips */}
              {query.trim().length < 2 && (
                <div className="p-4 text-sm text-gray-500 space-y-2">
                  <p className="font-medium">Search Tips:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Type at least 2 characters to search</li>
                    <li>• Search by concept name, definition, or biological analogy</li>
                    <li>• Use keywords like "memory", "token", "DNA", "metabolism"</li>
                    <li>• Click diagram buttons to jump to specific locations</li>
                  </ul>
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs text-gray-400">
                      Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Esc</kbd> to close, 
                      <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs ml-1">↑↓</kbd> to navigate, 
                      <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs ml-1">Enter</kbd> to select
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConceptSearch;

