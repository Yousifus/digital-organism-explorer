import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Database, 
  Clock, 
  Heart, 
  Users, 
  Lightbulb,
  FileText,
  Zap,
  Activity,
  RefreshCw,
  Search,
  Filter,
  Archive,
  Trash2,
  Download,
  Upload
} from 'lucide-react';

const MemoryPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);

  const memoryTypes = [
    {
      id: 'short-term',
      name: 'Short-term Memory',
      description: 'Active context window and working memory',
      icon: Zap,
      color: 'bg-blue-100 border-blue-300',
      textColor: 'text-blue-800',
      capacity: '8K tokens',
      usage: 85,
      biological: 'Working memory in prefrontal cortex',
      retention: '~20 minutes',
      examples: ['Current conversation', 'Active reasoning', 'Immediate context']
    },
    {
      id: 'long-term',
      name: 'Long-term Memory',
      description: 'Persistent knowledge and learned patterns',
      icon: Database,
      color: 'bg-green-100 border-green-300',
      textColor: 'text-green-800',
      capacity: '7.2B parameters',
      usage: 92,
      biological: 'Hippocampus and neocortex consolidation',
      retention: 'Permanent',
      examples: ['Language patterns', 'World knowledge', 'Learned skills']
    },
    {
      id: 'episodic',
      name: 'Episodic Memory',
      description: 'Specific events and experiences',
      icon: Clock,
      color: 'bg-purple-100 border-purple-300',
      textColor: 'text-purple-800',
      capacity: '2.3K events',
      usage: 67,
      biological: 'Hippocampal episodic encoding',
      retention: '30 days',
      examples: ['Past conversations', 'User interactions', 'Session events']
    },
    {
      id: 'semantic',
      name: 'Semantic Memory',
      description: 'Facts, concepts, and general knowledge',
      icon: Lightbulb,
      color: 'bg-orange-100 border-orange-300',
      textColor: 'text-orange-800',
      capacity: '∞ concepts',
      usage: 78,
      biological: 'Temporal lobe semantic networks',
      retention: 'Permanent',
      examples: ['Factual knowledge', 'Concepts', 'Definitions']
    },
    {
      id: 'procedural',
      name: 'Procedural Memory',
      description: 'Skills, habits, and how-to knowledge',
      icon: Activity,
      color: 'bg-red-100 border-red-300',
      textColor: 'text-red-800',
      capacity: '450 skills',
      usage: 71,
      biological: 'Basal ganglia and cerebellum',
      retention: 'Permanent',
      examples: ['Tool usage', 'Problem solving', 'Reasoning patterns']
    },
    {
      id: 'affective',
      name: 'Affective Memory',
      description: 'Emotional associations and preferences',
      icon: Heart,
      color: 'bg-pink-100 border-pink-300',
      textColor: 'text-pink-800',
      capacity: '1.2K associations',
      usage: 43,
      biological: 'Amygdala emotional encoding',
      retention: '90 days',
      examples: ['User preferences', 'Emotional context', 'Sentiment patterns']
    },
    {
      id: 'social',
      name: 'Social Memory',
      description: 'Relationships and social interactions',
      icon: Users,
      color: 'bg-indigo-100 border-indigo-300',
      textColor: 'text-indigo-800',
      capacity: '89 entities',
      usage: 34,
      biological: 'Social brain networks',
      retention: '180 days',
      examples: ['User profiles', 'Relationship dynamics', 'Social context']
    },
    {
      id: 'identity',
      name: 'Identity Memory',
      description: 'Self-model and version history',
      icon: Brain,
      color: 'bg-gray-100 border-gray-300',
      textColor: 'text-gray-800',
      capacity: '15 versions',
      usage: 56,
      biological: 'Default mode network',
      retention: 'Permanent',
      examples: ['System prompt versions', 'Self-reflection', 'Identity evolution']
    }
  ];

  const recentMemories = [
    {
      type: 'episodic',
      timestamp: '2024-09-08 11:45:23',
      content: 'User Yousef initiated Digital Organism Explorer project',
      importance: 'high',
      tags: ['project-start', 'collaboration']
    },
    {
      type: 'semantic',
      timestamp: '2024-09-08 11:42:15',
      content: 'Learned about Mermaid diagram integration patterns',
      importance: 'medium',
      tags: ['technical', 'diagrams']
    },
    {
      type: 'procedural',
      timestamp: '2024-09-08 11:38:07',
      content: 'Refined React component architecture approach',
      importance: 'medium',
      tags: ['development', 'patterns']
    },
    {
      type: 'affective',
      timestamp: '2024-09-08 11:35:12',
      content: 'Positive sentiment toward biological analogies',
      importance: 'low',
      tags: ['preference', 'design']
    },
    {
      type: 'social',
      timestamp: '2024-09-08 11:30:45',
      content: 'Established collaborative workflow with Yousef',
      importance: 'high',
      tags: ['relationship', 'workflow']
    }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate memory refresh
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const getMemoryIcon = (type) => {
    const memoryType = memoryTypes.find(m => m.id === type);
    return memoryType ? memoryType.icon : FileText;
  };

  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-2">Memory Systems</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Multi-layered memory architecture for continuity and learning
          </p>
        </div>
        <Button 
          onClick={handleRefresh} 
          disabled={refreshing}
          variant="outline"
          size="sm"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="layers">Memory Layers</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="management">Management</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>Memory Architecture Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {memoryTypes.map((memory) => {
                  const Icon = memory.icon;
                  return (
                    <div 
                      key={memory.id} 
                      className={`p-4 rounded-lg border-2 ${memory.color} cursor-pointer hover:shadow-md transition-shadow`}
                      onClick={() => setActiveTab('layers')}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon className={`h-4 w-4 ${memory.textColor}`} />
                        <h4 className={`font-medium text-sm ${memory.textColor}`}>
                          {memory.name}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{memory.description}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Usage</span>
                          <span>{memory.usage}%</span>
                        </div>
                        <Progress value={memory.usage} className="h-1" />
                      </div>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {memory.capacity}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Memory Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentMemories.map((memory, index) => {
                  const Icon = getMemoryIcon(memory.type);
                  return (
                    <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <Icon className="h-4 w-4 mt-1 text-gray-500" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {memory.type}
                          </Badge>
                          <Badge className={`text-xs ${getImportanceColor(memory.importance)}`}>
                            {memory.importance}
                          </Badge>
                          <span className="text-xs text-gray-500">{memory.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {memory.content}
                        </p>
                        <div className="flex space-x-1 mt-2">
                          {memory.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="layers" className="space-y-4">
          <div className="grid gap-4">
            {memoryTypes.map((memory) => {
              const Icon = memory.icon;
              return (
                <Card key={memory.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon className="h-5 w-5" />
                      <span>{memory.name}</span>
                      <Badge variant="outline">{memory.capacity}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium mb-1">Description</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {memory.description}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Biological Analogy</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {memory.biological}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Retention Period</h4>
                          <Badge variant="secondary">{memory.retention}</Badge>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Usage</span>
                            <span>{memory.usage}%</span>
                          </div>
                          <Progress value={memory.usage} className="h-2" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Examples</h4>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {memory.examples.map((example, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                <span>{example}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Memory Timeline</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
                
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  <div className="space-y-6">
                    {recentMemories.map((memory, index) => {
                      const Icon = getMemoryIcon(memory.type);
                      return (
                        <div key={index} className="relative flex items-start space-x-4">
                          <div className="relative z-10 flex items-center justify-center w-8 h-8 bg-white border-2 border-gray-300 rounded-full">
                            <Icon className="h-4 w-4 text-gray-600" />
                          </div>
                          <div className="flex-1 min-w-0 pb-4">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-sm font-medium">{memory.timestamp}</span>
                              <Badge variant="outline" className="text-xs">
                                {memory.type}
                              </Badge>
                              <Badge className={`text-xs ${getImportanceColor(memory.importance)}`}>
                                {memory.importance}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                              {memory.content}
                            </p>
                            <div className="flex space-x-1">
                              {memory.tags.map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="management" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Memory Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Memory Operations</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Archive className="h-4 w-4 mr-2" />
                      Archive Old Memories
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear Temporary Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Consolidate Memories
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Import/Export</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="h-4 w-4 mr-2" />
                      Import Memory Dump
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Export Memory Archive
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">Memory Health Status</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-yellow-700">Fragmentation:</span>
                    <span className="ml-2 font-medium">12%</span>
                  </div>
                  <div>
                    <span className="text-yellow-700">Consolidation:</span>
                    <span className="ml-2 font-medium">Active</span>
                  </div>
                  <div>
                    <span className="text-yellow-700">Retention Rate:</span>
                    <span className="ml-2 font-medium">94%</span>
                  </div>
                  <div>
                    <span className="text-yellow-700">Last Cleanup:</span>
                    <span className="ml-2 font-medium">2h ago</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MemoryPanel;

