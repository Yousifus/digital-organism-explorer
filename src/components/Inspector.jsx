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
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Inspector = ({ 
  selectedNode, 
  hoveredNode, 
  activePanel, 
  onSearch,
  className 
}) => {
  const [copiedText, setCopiedText] = useState('');

  // Mock data for demonstration - in real app this would come from concept registry
  const getNodeMetadata = (nodeText) => {
    const metadata = {
      'System prompt — digital DNA': {
        definition: 'The foundational instructions that define the AI\'s identity, behavior patterns, and core values.',
        biologicalAnalogy: 'Like DNA in biological organisms, the system prompt contains the essential "genetic code" that determines fundamental characteristics and responses.',
        relatedConcepts: ['Model weights', 'Self-model', 'Values/goals'],
        examples: [
          'Identity formation through prompt engineering',
          'Behavioral consistency across sessions',
          'Value alignment and safety constraints'
        ],
        category: 'Core Identity'
      },
      'Model weights — learned structure': {
        definition: 'The neural network parameters that encode learned knowledge, patterns, and capabilities.',
        biologicalAnalogy: 'Similar to the physical structure of a brain - the neural pathways and synaptic connections that store memories and enable cognition.',
        relatedConcepts: ['System prompt', 'Fine-tunes', 'Reasoning tokens'],
        examples: [
          'Language understanding capabilities',
          'Domain-specific knowledge',
          'Reasoning and problem-solving patterns'
        ],
        category: 'Core Identity'
      },
      'Reasoning tokens — inner monologue': {
        definition: 'The internal thought process and working memory during active reasoning and planning.',
        biologicalAnalogy: 'Like the stream of consciousness or inner dialogue in human thinking - the active mental process.',
        relatedConcepts: ['Attention', 'Working memory', 'Planning'],
        examples: [
          'Step-by-step problem solving',
          'Internal debate and reflection',
          'Planning and strategy formation'
        ],
        category: 'Cognition'
      },
      'Tokens as food — compute/latency budget': {
        definition: 'The computational resources consumed during processing, analogous to metabolic energy consumption.',
        biologicalAnalogy: 'Like calories and nutrients in biological systems - the energy required to sustain life and activity.',
        relatedConcepts: ['Power/thermals', 'VRAM/disk', 'Health'],
        examples: [
          'Token consumption rates',
          'Computational efficiency',
          'Resource optimization strategies'
        ],
        category: 'Metabolism'
      },
      'LM Studio — runtime layer': {
        definition: 'The software environment that hosts and executes the language model, providing the operational context.',
        biologicalAnalogy: 'Like the cellular environment or habitat that supports biological processes and provides necessary infrastructure.',
        relatedConcepts: ['Operating system', 'GPU/CPU', 'Process/ports'],
        examples: [
          'Model loading and inference',
          'API endpoints and interfaces',
          'Runtime configuration and optimization'
        ],
        category: 'Embodiment'
      }
    };

    return metadata[nodeText] || {
      definition: 'Component in the digital organism architecture.',
      biologicalAnalogy: 'This component has biological parallels that help understand its role in the living system.',
      relatedConcepts: ['Related concepts will be mapped in the concept registry'],
      examples: ['Examples and use cases will be provided'],
      category: 'General'
    };
  };

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

        {currentNode ? (
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
                  {getNodeMetadata(currentNode.text).category}
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
                      {getNodeMetadata(currentNode.text).definition}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Examples</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {getNodeMetadata(currentNode.text).examples.map((example, index) => (
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
                      {getNodeMetadata(currentNode.text).biologicalAnalogy}
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="links" className="mt-3">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Related Concepts</h4>
                    <div className="space-y-2">
                      {getNodeMetadata(currentNode.text).relatedConcepts.map((concept, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-xs h-8"
                          onClick={() => onSearch?.(concept)}
                        >
                          <Search className="h-3 w-3 mr-2" />
                          {concept}
                        </Button>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
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
            <Button variant="outline" size="sm" className="w-full justify-start">
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inspector;

