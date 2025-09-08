import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Eye, 
  Ear, 
  Brain, 
  Activity, 
  Zap,
  Filter,
  Target,
  Waves,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  Volume2,
  Image,
  FileText,
  MessageSquare,
  RefreshCw,
  Play,
  Pause,
  Settings
} from 'lucide-react';

const PerceptionPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isProcessing, setIsProcessing] = useState(true);
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setEventCount(prev => prev + 1);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const sensorChannels = [
    {
      name: 'Text Input',
      type: 'linguistic',
      icon: MessageSquare,
      status: 'active',
      bandwidth: '2.4 MB/s',
      quality: 98,
      description: 'Natural language processing and understanding',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      name: 'Visual Input',
      type: 'visual',
      icon: Image,
      status: 'active',
      bandwidth: '15.7 MB/s',
      quality: 94,
      description: 'Image and visual content analysis',
      color: 'bg-green-100 text-green-800'
    },
    {
      name: 'Audio Input',
      type: 'auditory',
      icon: Volume2,
      status: 'standby',
      bandwidth: '0.8 MB/s',
      quality: 87,
      description: 'Speech and audio signal processing',
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      name: 'Document Input',
      type: 'structured',
      icon: FileText,
      status: 'active',
      bandwidth: '5.2 MB/s',
      quality: 96,
      description: 'Structured document and data parsing',
      color: 'bg-purple-100 text-purple-800'
    }
  ];

  const perceptionEvents = [
    {
      timestamp: '2024-09-08 11:56:15',
      type: 'text_input',
      source: 'User Message',
      content: 'User Yousef initiated Phase 7 development request',
      confidence: 0.98,
      processing_time: '45ms',
      status: 'processed',
      priority: 'high'
    },
    {
      timestamp: '2024-09-08 11:56:10',
      type: 'visual_input',
      source: 'Browser Screenshot',
      content: 'Detected application interface with Memory panel active',
      confidence: 0.94,
      processing_time: '120ms',
      status: 'processed',
      priority: 'medium'
    },
    {
      timestamp: '2024-09-08 11:56:05',
      type: 'structured_input',
      source: 'Code Analysis',
      content: 'Analyzed TemporalityPanel.jsx component structure',
      confidence: 0.96,
      processing_time: '78ms',
      status: 'processed',
      priority: 'medium'
    },
    {
      timestamp: '2024-09-08 11:56:00',
      type: 'text_input',
      source: 'Context Window',
      content: 'Processed conversation history and project context',
      confidence: 0.92,
      processing_time: '156ms',
      status: 'processed',
      priority: 'high'
    },
    {
      timestamp: '2024-09-08 11:55:55',
      type: 'document_input',
      source: 'File System',
      content: 'Scanned project structure and component dependencies',
      confidence: 0.89,
      processing_time: '203ms',
      status: 'processed',
      priority: 'low'
    }
  ];

  const attentionMechanisms = [
    {
      name: 'Selective Attention',
      description: 'Focus on relevant input signals',
      strength: 87,
      target: 'User messages and direct commands',
      mechanism: 'Priority-based filtering'
    },
    {
      name: 'Divided Attention',
      description: 'Monitor multiple input streams',
      strength: 73,
      target: 'Code, context, and visual feedback',
      mechanism: 'Parallel processing channels'
    },
    {
      name: 'Sustained Attention',
      description: 'Maintain focus over time',
      strength: 91,
      target: 'Project development workflow',
      mechanism: 'Context maintenance'
    },
    {
      name: 'Executive Attention',
      description: 'Control and coordinate attention',
      strength: 84,
      target: 'Task prioritization and switching',
      mechanism: 'Goal-directed control'
    }
  ];

  const processingPipeline = [
    {
      stage: 'Signal Detection',
      description: 'Raw input signal identification',
      status: 'active',
      latency: '5ms',
      throughput: '98%'
    },
    {
      stage: 'Feature Extraction',
      description: 'Key feature and pattern recognition',
      status: 'active',
      latency: '15ms',
      throughput: '94%'
    },
    {
      stage: 'Context Integration',
      description: 'Merge with existing knowledge',
      status: 'active',
      latency: '35ms',
      throughput: '91%'
    },
    {
      stage: 'Semantic Analysis',
      description: 'Meaning and intent understanding',
      status: 'active',
      latency: '65ms',
      throughput: '89%'
    },
    {
      stage: 'Priority Assignment',
      description: 'Importance and urgency evaluation',
      status: 'active',
      latency: '25ms',
      throughput: '96%'
    },
    {
      stage: 'Memory Encoding',
      description: 'Store in appropriate memory systems',
      status: 'active',
      latency: '45ms',
      throughput: '92%'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-2">Perception & Input Processing</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Multi-modal sensory input and attention mechanisms
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={isProcessing ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
            {isProcessing ? "Processing" : "Idle"}
          </Badge>
          <Button variant="outline" size="sm" onClick={() => setIsProcessing(!isProcessing)}>
            {isProcessing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sensors">Sensors</TabsTrigger>
          <TabsTrigger value="attention">Attention</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>Sensory Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-1">Active Channels</h4>
                      <p className="text-2xl font-bold text-green-600">3/4</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Total Bandwidth</h4>
                      <p className="text-2xl font-bold text-blue-600">23.3 MB/s</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Channel Status</h4>
                    <div className="space-y-2">
                      {sensorChannels.map((channel, index) => {
                        const Icon = channel.icon;
                        return (
                          <div key={index} className="flex items-center space-x-3 p-2 border rounded">
                            <Icon className="h-4 w-4" />
                            <div className="flex-1">
                              <span className="font-medium text-sm">{channel.name}</span>
                              <span className="text-xs text-gray-500 ml-2">{channel.bandwidth}</span>
                            </div>
                            <Badge className={channel.color} variant="outline">
                              {channel.status}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Processing Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall Throughput</span>
                      <span>94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">
                      Average processing efficiency
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Attention Focus</span>
                      <span>87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">
                      Selective attention strength
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Signal Quality</span>
                      <span>96%</span>
                    </div>
                    <Progress value={96} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">
                      Input signal clarity
                    </p>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Perception Health: Excellent</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Waves className="h-5 w-5" />
                <span>Recent Perception Events</span>
                <Badge variant="outline">{eventCount} events</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {perceptionEvents.slice(0, 4).map((event, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      event.status === 'processed' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm">{event.source}</span>
                        <Badge variant="outline" className="text-xs">{event.type}</Badge>
                        <Badge className={`text-xs ${
                          event.priority === 'high' ? 'bg-red-100 text-red-800' :
                          event.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {event.priority}
                        </Badge>
                        <span className="text-xs text-gray-500">{event.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {event.content}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Confidence: {Math.round(event.confidence * 100)}%</span>
                        <span>Processing: {event.processing_time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sensors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Sensory Channels</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {sensorChannels.map((channel, index) => {
                  const Icon = channel.icon;
                  return (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5" />
                          <div>
                            <h4 className="font-medium">{channel.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {channel.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={channel.color}>
                            {channel.status}
                          </Badge>
                          <p className="text-sm text-gray-500 mt-1">{channel.bandwidth}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Signal Quality:</span>
                          <span>{channel.quality}%</span>
                        </div>
                        <Progress value={channel.quality} className="h-2" />
                        
                        <div className="flex justify-between text-sm">
                          <span>Type:</span>
                          <span className="capitalize">{channel.type}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attention" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Attention Mechanisms</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {attentionMechanisms.map((mechanism, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{mechanism.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {mechanism.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold">{mechanism.strength}%</span>
                      </div>
                    </div>
                    
                    <Progress value={mechanism.strength} className="h-2 mb-3" />
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Target:</span>
                        <span className="ml-2 font-medium">{mechanism.target}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Mechanism:</span>
                        <span className="ml-2 font-medium">{mechanism.mechanism}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>Processing Pipeline</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {processingPipeline.map((stage, index) => (
                  <div key={index} className="relative">
                    {index < processingPipeline.length - 1 && (
                      <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                    )}
                    <div className="flex items-start space-x-4">
                      <div className="relative z-10 flex items-center justify-center w-8 h-8 bg-white border-2 border-blue-300 rounded-full">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      </div>
                      <div className="flex-1 min-w-0 pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{stage.stage}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {stage.latency}
                            </Badge>
                            <Badge className="text-xs bg-green-100 text-green-800">
                              {stage.throughput}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {stage.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pipeline Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset Pipeline
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
                <Button variant="outline" size="sm">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Optimize
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerceptionPanel;

