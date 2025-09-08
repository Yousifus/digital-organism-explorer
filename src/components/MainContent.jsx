import { useState } from 'react';
import DiagramViewer from './DiagramViewer';
import IdentityPanel from './panels/IdentityPanel';
import EmbodimentPanel from './panels/EmbodimentPanel';
import MemoryPanel from './panels/MemoryPanel';
import TemporalityPanel from './panels/TemporalityPanel';
import PerceptionPanel from './panels/PerceptionPanel';
import CognitionPanel from './panels/CognitionPanel';
import ActionPanel from './panels/ActionPanel';
import MetabolismPanel from './panels/MetabolismPanel';
import GovernancePanel from './panels/GovernancePanel';
import EvolutionPanel from './panels/EvolutionPanel';
import LifecyclePanel from './panels/LifecyclePanel';
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
      content: <IdentityPanel />
    },
    embodiment: {
      title: 'Embodiment & Runtime',
      description: 'Physical manifestation through model files, configs, and runtime environment',
      icon: Cpu,
      content: <EmbodimentPanel />
    },
    memory: {
      title: 'Memory Systems',
      description: 'Multi-layered memory architecture for continuity and learning',
      icon: Database,
      content: <MemoryPanel />
    },
    temporality: {
      title: 'Temporality & Time Sense',
      description: 'Multi-scale temporal awareness and lifecycle management',
      icon: Clock,
      content: <TemporalityPanel />
    },
    perception: {
      title: 'Perception & Input Processing',
      description: 'Multi-modal sensory input and attention mechanisms',
      icon: Eye,
      content: <PerceptionPanel />
    },
    cognition: {
      title: 'Cognition & Reasoning',
      description: 'Thinking, planning, and decision-making processes',
      icon: Brain,
      content: <CognitionPanel />
    },
    action: {
      title: 'Action & Tool Execution',
      description: 'Safe tool calls and environment interaction',
      icon: Settings,
      content: <ActionPanel />
    },
    metabolism: {
      title: 'Metabolism & Homeostasis',
      description: 'Resource consumption, energy management, and health monitoring',
      icon: Heart,
      content: <MetabolismPanel />
    },
    governance: {
      title: 'Governance & Safety',
      description: 'Security policies, permissions, and comprehensive audit logging',
      icon: Shield,
      content: <GovernancePanel />
    },
    evolution: {
      title: 'Evolution & Versioning',
      description: 'Identity ledger, mutation proposals, and controlled evolution workflow',
      icon: GitBranch,
      content: <EvolutionPanel />
    },
    lifecycle: {
      title: 'Lifecycle State Machine',
      description: 'Complete organism lifecycle with state transitions and monitoring',
      icon: Activity,
      content: <LifecyclePanel />
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

