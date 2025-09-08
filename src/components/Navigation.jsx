import { useState } from 'react';
import { 
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
  Activity,
  FileText,
  MessageCircle,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const Navigation = ({ activePanel, onPanelChange, className }) => {
  const [expandedSections, setExpandedSections] = useState({
    core: true,
    systems: true,
    management: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const navigationItems = {
    core: {
      title: 'Core Architecture',
      icon: Brain,
      items: [
        {
          id: 'overview',
          label: 'Overview',
          icon: Activity,
          description: 'High-level organism map',
          badge: 'Start Here'
        },
        {
          id: 'identity',
          label: 'Identity',
          icon: Brain,
          description: 'System prompt, model weights, self-model'
        },
        {
          id: 'embodiment',
          label: 'Embodiment',
          icon: Cpu,
          description: 'Runtime mapping, model files, configs'
        },
        {
          id: 'memory',
          label: 'Memory',
          icon: Database,
          description: 'Short-term, long-term, episodic systems'
        }
      ]
    },
    systems: {
      title: 'Processing Systems',
      icon: Eye,
      items: [
        {
          id: 'perception',
          label: 'Perception',
          icon: Eye,
          description: 'Input processing and sensing'
        },
        {
          id: 'cognition',
          label: 'Cognition',
          icon: Brain,
          description: 'Reasoning, planning, reflection'
        },
        {
          id: 'action',
          label: 'Action',
          icon: Settings,
          description: 'Tool calls and environment effects'
        },
        {
          id: 'metabolism',
          label: 'Metabolism',
          icon: Heart,
          description: 'Token consumption and homeostasis'
        }
      ]
    },
    management: {
      title: 'Management & Evolution',
      icon: Shield,
      items: [
        {
          id: 'governance',
          label: 'Governance',
          icon: Shield,
          description: 'Safety, permissions, audit logs'
        },
        {
          id: 'evolution',
          label: 'Evolution',
          icon: GitBranch,
          description: 'Versioning, mutations, HITL review'
        },
        {
          id: 'ecosystem',
          label: 'Ecosystem',
          icon: Users,
          description: 'Relationships and environment'
        },
        {
          id: 'temporality',
          label: 'Temporality',
          icon: Clock,
          description: 'Time sense and lifecycle'
        },
        {
          id: 'lifecycle',
          label: 'Lifecycle',
          icon: Activity,
          description: 'State machine and transitions'
        },
        {
          id: 'journal',
          label: 'Journal',
          icon: FileText,
          description: 'Activity logs and history'
        },
        {
          id: 'livechat',
          label: 'Live Chat',
          icon: MessageCircle,
          description: 'Real AI conversations via LM Studio'
        }
      ]
    }
  };

  const handleItemClick = (itemId) => {
    onPanelChange(itemId);
  };

  return (
    <nav className={cn("w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto", className)}>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Organism Layers
        </h2>
        
        <div className="space-y-4">
          {Object.entries(navigationItems).map(([sectionKey, section]) => {
            const SectionIcon = section.icon;
            const isExpanded = expandedSections[sectionKey];
            
            return (
              <div key={sectionKey} className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-between p-2 h-auto"
                  onClick={() => toggleSection(sectionKey)}
                >
                  <div className="flex items-center space-x-2">
                    <SectionIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">{section.title}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
                
                {isExpanded && (
                  <div className="ml-2 space-y-1">
                    {section.items.map((item) => {
                      const ItemIcon = item.icon;
                      const isActive = activePanel === item.id;
                      
                      return (
                        <Button
                          key={item.id}
                          variant={isActive ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start p-2 h-auto text-left",
                            isActive && "bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-500"
                          )}
                          onClick={() => handleItemClick(item.id)}
                        >
                          <div className="flex items-start space-x-3 w-full">
                            <ItemIcon className={cn(
                              "h-4 w-4 mt-0.5 flex-shrink-0",
                              isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-500"
                            )} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <span className={cn(
                                  "text-sm font-medium",
                                  isActive ? "text-blue-900 dark:text-blue-100" : "text-gray-900 dark:text-gray-100"
                                )}>
                                  {item.label}
                                </span>
                                {item.badge && (
                                  <Badge variant="secondary" className="text-xs">
                                    {item.badge}
                                  </Badge>
                                )}
                              </div>
                              <p className={cn(
                                "text-xs mt-1",
                                isActive ? "text-blue-700 dark:text-blue-300" : "text-gray-500 dark:text-gray-400"
                              )}>
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Quick Navigation
          </h3>
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <p>• Click layers to explore components</p>
            <p>• Use diagrams for visual navigation</p>
            <p>• Inspector shows node details</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

