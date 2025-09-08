import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Info, 
  Link, 
  Search, 
  BookOpen, 
  Lightbulb,
  ExternalLink,
  Copy,
  Check,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { conceptUtils } from '../data/conceptRegistry';

const Inspector = ({ 
  selectedNode, 
  hoveredNode, 
  activePanel, 
  onSearch,
  onConceptSelect,
  onDiagramNavigate,
  className 
}) => {
  const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const currentNode = selectedNode || hoveredNode;
  
  // Find concept data from registry
  const concept = currentNode ? conceptUtils.findConcept(currentNode.text) : null;

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

  return (
    <div className={cn("w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 h-full overflow-y-auto", className)}>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Inspector
          </h2>
          <Badge variant="outline" className="text-xs">
            {activePanel || 'overview'}
          </Badge>
        </div>

        {currentNode && concept ? (
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base leading-tight">
                  {concept.canonicalName}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(concept.canonicalName)}
                  className="ml-2 h-6 w-6 p-0"
                >
                  {copiedText === concept.canonicalName ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">
                  {getImportanceIcon(concept.metadata.importance)}
                </span>
                <Badge 
                  variant="secondary" 
                  className={cn("text-xs", getCategoryColor(concept.category))}
                >
                  {concept.category}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {concept.metadata.layer}
                </Badge>
                {selectedNode && (
                  <Badge variant="outline" className="text-xs">
                    Selected
                  </Badge>
                )}
                {hoveredNode && !selectedNode && (
                  <Badge variant="outline" className="text-xs">
                    Hovered
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <Tabs defaultValue="definition" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="definition" className="text-xs">
                    <Info className="h-3 w-3 mr-1" />
                    Info
                  </TabsTrigger>
                  <TabsTrigger value="biology" className="text-xs">
                    <Lightbulb className="h-3 w-3 mr-1" />
                    Biology
                  </TabsTrigger>
                  <TabsTrigger value="links" className="text-xs">
                    <Link className="h-3 w-3 mr-1" />
                    Links
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="definition" className="mt-3 space-y-3">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Definition</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {concept.definition}
                    </p>
                  </div>
                  
                  {concept.aliases.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Also Known As</h4>
                      <div className="flex flex-wrap gap-1">
                        {concept.aliases.map((alias, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {alias}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Examples</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {concept.examples.map((example, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="biology" className="mt-3">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Biological Analogy</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {concept.biologicalAnalogy}
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="links" className="mt-3 space-y-3">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Related Concepts</h4>
                    <div className="space-y-2">
                      {conceptUtils.getRelatedConcepts(concept.id).map((relatedConcept) => (
                        <Button
                          key={relatedConcept.id}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-xs h-8"
                          onClick={() => onConceptSelect?.(relatedConcept)}
                        >
                          <Search className="h-3 w-3 mr-2" />
                          {relatedConcept.canonicalName}
                          <ArrowRight className="h-3 w-3 ml-auto" />
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Appears In Diagrams</h4>
                    <div className="space-y-1">
                      {Object.keys(concept.diagramLocations).map((diagramId) => (
                        <Button
                          key={diagramId}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-xs h-8"
                          onClick={() => onDiagramNavigate?.(diagramId, concept)}
                        >
                          <BookOpen className="h-3 w-3 mr-2" />
                          {diagramId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          <ExternalLink className="h-3 w-3 ml-auto" />
                        </Button>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ) : currentNode ? (
          // Fallback for nodes not in concept registry
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base leading-tight">
                  {currentNode.text}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(currentNode.text)}
                  className="ml-2 h-6 w-6 p-0"
                >
                  {copiedText === currentNode.text ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  Unmapped
                </Badge>
                {selectedNode && (
                  <Badge variant="outline" className="text-xs">
                    Selected
                  </Badge>
                )}
                {hoveredNode && !selectedNode && (
                  <Badge variant="outline" className="text-xs">
                    Hovered
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This node is not yet mapped in the concept registry. 
                Future versions will include detailed metadata and cross-diagram relationships.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">
                  Click or hover over diagram nodes to explore their details and relationships.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => onSearch?.('')}
            >
              <Search className="h-4 w-4 mr-2" />
              Global Search
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <ExternalLink className="h-4 w-4 mr-2" />
              Export View
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <BookOpen className="h-4 w-4 mr-2" />
              Documentation
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Navigation Tips</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xs text-gray-600 dark:text-gray-400 space-y-2">
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>Use left panel to navigate organism layers</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>Click diagram nodes for detailed information</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>Related concepts link across diagrams</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>Biological analogies explain digital concepts</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>Use global search to find concepts quickly</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inspector;

