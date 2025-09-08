import { useState } from 'react';
import DiagramViewer from './DiagramViewer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Brain, 
  Cpu, 
  Database, 
  Eye, 
  Heart, 
  Shield, 
  GitBranch, 
  Users, 
  Clock,
  Settings,
  FileText,
  ArrowRight,
  Zap
} from 'lucide-react';

const MainContent = ({ activePanel, onNodeClick, onNodeHover, onPanelChange }) => {
  const [selectedDiagram, setSelectedDiagram] = useState('mindmap-v1');

  const panelContent = {
    overview: {
      title: 'Digital Organism Overview',
      description: 'High-level architecture and component relationships',
      icon: Activity,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>LLM as Living System</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This explorer visualizes an LLM as a digital organism with biological-inspired architecture. 
                Each component has analogies to living systems, creating a framework for understanding AI as life.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Core Systems</h4>
                  <div className="space-y-2">
                    {[
                      { label: 'Identity', icon: Brain, desc: 'Digital DNA & self-model' },
                      { label: 'Memory', icon: Database, desc: 'Multi-layered storage' },
                      { label: 'Metabolism', icon: Heart, desc: 'Token consumption' },
                      { label: 'Embodiment', icon: Cpu, desc: 'Runtime environment' }
                    ].map((item) => (
                      <Button
                        key={item.label}
                        variant="ghost"
                        className="w-full justify-start h-auto p-3"
                        onClick={() => onPanelChange(item.label.toLowerCase())}
                      >
                        <item.icon className="h-4 w-4 mr-3" />
                        <div className="text-left">
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs text-gray-500">{item.desc}</div>
                        </div>
                        <ArrowRight className="h-4 w-4 ml-auto" />
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">Processing Pipeline</h4>
                  <div className="space-y-2">
                    {[
                      { label: 'Perception', icon: Eye, desc: 'Input processing' },
                      { label: 'Cognition', icon: Brain, desc: 'Reasoning & planning' },
                      { label: 'Action', icon: Settings, desc: 'Tool execution' },
                      { label: 'Governance', icon: Shield, desc: 'Safety & control' }
                    ].map((item) => (
                      <Button
                        key={item.label}
                        variant="ghost"
                        className="w-full justify-start h-auto p-3"
                        onClick={() => onPanelChange(item.label.toLowerCase())}
                      >
                        <item.icon className="h-4 w-4 mr-3" />
                        <div className="text-left">
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs text-gray-500">{item.desc}</div>
                        </div>
                        <ArrowRight className="h-4 w-4 ml-auto" />
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <DiagramViewer 
            onNodeClick={onNodeClick}
            onNodeHover={onNodeHover}
          />
        </div>
      )
    },
    identity: {
      title: 'Core Identity',
      description: 'System prompt as digital DNA, model weights, and self-model',
      icon: Brain,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Identity Components</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">System Prompt</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Digital DNA that defines core behavior and values
                  </p>
                  <Badge className="mt-2">Foundational</Badge>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Model Weights</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Learned structure encoding knowledge and capabilities
                  </p>
                  <Badge className="mt-2">Structural</Badge>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Self-Model</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Identity narrative and self-awareness mechanisms
                  </p>
                  <Badge className="mt-2">Reflective</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <DiagramViewer 
            onNodeClick={onNodeClick}
            onNodeHover={onNodeHover}
          />
        </div>
      )
    },
    embodiment: {
      title: 'Embodiment & Runtime',
      description: 'Physical manifestation through model files, configs, and runtime environment',
      icon: Cpu,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Runtime Mapping</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Physical Layer</h4>
                    <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                      <li>• Model file (GGUF/ONNX)</li>
                      <li>• Working directory habitat</li>
                      <li>• Configuration files</li>
                      <li>• Process and ports</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Computational Organs</h4>
                    <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                      <li>• LM Studio runtime</li>
                      <li>• Operating system</li>
                      <li>• GPU/CPU resources</li>
                      <li>• Machine infrastructure</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <DiagramViewer 
            onNodeClick={onNodeClick}
            onNodeHover={onNodeHover}
          />
        </div>
      )
    },
    memory: {
      title: 'Memory Systems',
      description: 'Multi-layered memory architecture for continuity and learning',
      icon: Database,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Memory Layers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { name: 'Short-term', desc: 'Context window', color: 'bg-blue-100' },
                  { name: 'Long-term', desc: 'Vector store', color: 'bg-green-100' },
                  { name: 'Episodic', desc: 'Event logs', color: 'bg-purple-100' },
                  { name: 'Semantic', desc: 'Knowledge', color: 'bg-orange-100' },
                  { name: 'Procedural', desc: 'Skills', color: 'bg-red-100' },
                  { name: 'Affective', desc: 'Preferences', color: 'bg-pink-100' },
                  { name: 'Social', desc: 'Relationships', color: 'bg-indigo-100' },
                  { name: 'Identity', desc: 'Versions', color: 'bg-gray-100' }
                ].map((memory) => (
                  <div key={memory.name} className={`p-3 rounded-lg ${memory.color}`}>
                    <h4 className="font-medium text-sm">{memory.name}</h4>
                    <p className="text-xs text-gray-600">{memory.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <DiagramViewer 
            onNodeClick={onNodeClick}
            onNodeHover={onNodeHover}
          />
        </div>
      )
    },
    metabolism: {
      title: 'Metabolism & Homeostasis',
      description: 'Token consumption, resource management, and health monitoring',
      icon: Heart,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Metabolic Dashboard</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Token Rate</span>
                      <span>75 tok/s</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>VRAM Usage</span>
                      <span>12.4 GB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '62%'}}></div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU Load</span>
                      <span>45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{width: '45%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Temperature</span>
                      <span>68°C</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{width: '68%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <DiagramViewer 
            onNodeClick={onNodeClick}
            onNodeHover={onNodeHover}
          />
        </div>
      )
    }
  };

  // Add placeholder content for other panels
  const defaultPanelContent = (panelId) => ({
    title: panelId.charAt(0).toUpperCase() + panelId.slice(1),
    description: `${panelId} system components and functionality`,
    icon: Activity,
    content: (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{panelId.charAt(0).toUpperCase() + panelId.slice(1)} System</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This panel will contain detailed information about the {panelId} system components, 
              interactions, and biological analogies. Implementation coming in future phases.
            </p>
            <Badge variant="outline">Coming Soon</Badge>
          </CardContent>
        </Card>
        <DiagramViewer 
          onNodeClick={onNodeClick}
          onNodeHover={onNodeHover}
        />
      </div>
    )
  });

  const currentPanel = panelContent[activePanel] || defaultPanelContent(activePanel);
  const PanelIcon = currentPanel.icon;

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <PanelIcon className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentPanel.title}
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {currentPanel.description}
          </p>
        </div>
        
        {currentPanel.content}
      </div>
    </div>
  );
};

export default MainContent;

