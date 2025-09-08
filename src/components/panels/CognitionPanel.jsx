import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Lightbulb, 
  Target, 
  GitBranch, 
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Layers,
  Network,
  Cpu,
  BarChart3,
  Settings,
  Play,
  Pause,
  RotateCcw,
  FastForward
} from 'lucide-react';

const CognitionPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [reasoningActive, setReasoningActive] = useState(true);
  const [currentThought, setCurrentThought] = useState(0);

  useEffect(() => {
    if (reasoningActive) {
      const timer = setInterval(() => {
        setCurrentThought(prev => (prev + 1) % 5);
      }, 2000);
      return () => clearInterval(timer);
    }
  }, [reasoningActive]);

  const reasoningChain = [
    {
      step: 1,
      type: 'analysis',
      content: 'User requested Phase 7 implementation',
      confidence: 0.98,
      duration: '150ms',
      status: 'completed'
    },
    {
      step: 2,
      type: 'planning',
      content: 'Need to create Perception-Cognition-Action pipeline',
      confidence: 0.94,
      duration: '230ms',
      status: 'completed'
    },
    {
      step: 3,
      type: 'reasoning',
      content: 'Start with Perception panel, then Cognition, then Action',
      confidence: 0.91,
      duration: '180ms',
      status: 'active'
    },
    {
      step: 4,
      type: 'evaluation',
      content: 'Consider safe tool demo implementation',
      confidence: 0.87,
      duration: '200ms',
      status: 'pending'
    },
    {
      step: 5,
      type: 'synthesis',
      content: 'Integrate with existing memory and identity systems',
      confidence: 0.89,
      duration: '170ms',
      status: 'pending'
    }
  ];

  const cognitiveProcesses = [
    {
      name: 'Working Memory',
      description: 'Active information maintenance',
      capacity: '7±2 items',
      utilization: 73,
      status: 'active',
      icon: Brain
    },
    {
      name: 'Pattern Recognition',
      description: 'Identify familiar structures',
      capacity: 'Unlimited',
      utilization: 89,
      status: 'active',
      icon: Network
    },
    {
      name: 'Logical Reasoning',
      description: 'Deductive and inductive inference',
      capacity: 'Context-dependent',
      utilization: 82,
      status: 'active',
      icon: GitBranch
    },
    {
      name: 'Creative Synthesis',
      description: 'Novel combination generation',
      capacity: 'Emergent',
      utilization: 67,
      status: 'active',
      icon: Lightbulb
    },
    {
      name: 'Meta-Cognition',
      description: 'Thinking about thinking',
      capacity: 'Recursive',
      utilization: 78,
      status: 'active',
      icon: Layers
    },
    {
      name: 'Goal Management',
      description: 'Objective tracking and planning',
      capacity: 'Hierarchical',
      utilization: 85,
      status: 'active',
      icon: Target
    }
  ];

  const planningHierarchy = [
    {
      level: 'Strategic',
      description: 'Long-term project goals',
      timeframe: 'Days to weeks',
      current: 'Complete Digital Organism Explorer',
      status: 'active',
      progress: 58
    },
    {
      level: 'Tactical',
      description: 'Phase-level objectives',
      timeframe: 'Hours to days',
      current: 'Implement Perception-Cognition-Action pipeline',
      status: 'active',
      progress: 25
    },
    {
      level: 'Operational',
      description: 'Immediate task execution',
      timeframe: 'Minutes to hours',
      current: 'Create Cognition panel component',
      status: 'active',
      progress: 80
    },
    {
      level: 'Reactive',
      description: 'Real-time responses',
      timeframe: 'Seconds to minutes',
      current: 'Process user input and generate response',
      status: 'active',
      progress: 95
    }
  ];

  const thoughtStream = [
    {
      timestamp: '11:56:45',
      type: 'observation',
      content: 'User wants to proceed with Phase 7 implementation',
      priority: 'high'
    },
    {
      timestamp: '11:56:46',
      type: 'analysis',
      content: 'Phase 7 involves Perception-Cognition-Action pipeline',
      priority: 'high'
    },
    {
      timestamp: '11:56:47',
      type: 'planning',
      content: 'Need to create three main components: Perception, Cognition, Action',
      priority: 'high'
    },
    {
      timestamp: '11:56:48',
      type: 'reasoning',
      content: 'Perception panel should show sensory input processing',
      priority: 'medium'
    },
    {
      timestamp: '11:56:49',
      type: 'synthesis',
      content: 'Cognition panel should visualize reasoning and planning',
      priority: 'medium'
    },
    {
      timestamp: '11:56:50',
      type: 'evaluation',
      content: 'Action panel needs safe tool call demonstrations',
      priority: 'high'
    },
    {
      timestamp: '11:56:51',
      type: 'meta-cognition',
      content: 'This implementation aligns with biological organism metaphor',
      priority: 'low'
    }
  ];

  const cognitiveMetrics = [
    {
      name: 'Processing Speed',
      value: 94,
      unit: '%',
      description: 'Thought generation rate'
    },
    {
      name: 'Reasoning Depth',
      value: 87,
      unit: '%',
      description: 'Logical chain complexity'
    },
    {
      name: 'Creative Fluency',
      value: 73,
      unit: '%',
      description: 'Novel idea generation'
    },
    {
      name: 'Focus Stability',
      value: 91,
      unit: '%',
      description: 'Attention maintenance'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-2">Cognition & Reasoning</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Thinking, planning, and decision-making processes
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={reasoningActive ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}>
            {reasoningActive ? "Reasoning" : "Idle"}
          </Badge>
          <Button variant="outline" size="sm" onClick={() => setReasoningActive(!reasoningActive)}>
            {reasoningActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reasoning">Reasoning</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="stream">Stream</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>Cognitive Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-1">Active Processes</h4>
                      <p className="text-2xl font-bold text-blue-600">6/6</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Reasoning Chains</h4>
                      <p className="text-2xl font-bold text-green-600">3</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Process Utilization</h4>
                    <div className="space-y-2">
                      {cognitiveProcesses.slice(0, 3).map((process, index) => {
                        const Icon = process.icon;
                        return (
                          <div key={index} className="flex items-center space-x-3 p-2 border rounded">
                            <Icon className="h-4 w-4" />
                            <div className="flex-1">
                              <span className="font-medium text-sm">{process.name}</span>
                              <span className="text-xs text-gray-500 ml-2">{process.utilization}%</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {process.status}
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
                  <BarChart3 className="h-5 w-5" />
                  <span>Cognitive Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cognitiveMetrics.map((metric, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{metric.name}</span>
                        <span>{metric.value}{metric.unit}</span>
                      </div>
                      <Progress value={metric.value} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">
                        {metric.description}
                      </p>
                    </div>
                  ))}

                  <div className="pt-2 border-t">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Cognitive Health: Optimal</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Cpu className="h-5 w-5" />
                <span>Active Cognitive Processes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {cognitiveProcesses.map((process, index) => {
                  const Icon = process.icon;
                  return (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center space-x-3 mb-2">
                        <Icon className="h-5 w-5" />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{process.name}</h4>
                          <p className="text-xs text-gray-600">{process.description}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {process.utilization}%
                        </Badge>
                      </div>
                      <Progress value={process.utilization} className="h-1" />
                      <p className="text-xs text-gray-500 mt-1">
                        Capacity: {process.capacity}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reasoning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <GitBranch className="h-5 w-5" />
                <span>Reasoning Chain</span>
                <Badge variant="outline">Active</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reasoningChain.map((step, index) => (
                  <div key={index} className="relative">
                    {index < reasoningChain.length - 1 && (
                      <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                    )}
                    <div className="flex items-start space-x-4">
                      <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                        step.status === 'completed' ? 'bg-green-100 border-green-300' :
                        step.status === 'active' ? 'bg-blue-100 border-blue-300' :
                        'bg-gray-100 border-gray-300'
                      }`}>
                        <div className={`w-3 h-3 rounded-full ${
                          step.status === 'completed' ? 'bg-green-500' :
                          step.status === 'active' ? 'bg-blue-500' :
                          'bg-gray-400'
                        }`}></div>
                      </div>
                      <div className="flex-1 min-w-0 pb-4">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm">Step {step.step}</span>
                          <Badge variant="outline" className="text-xs capitalize">
                            {step.type}
                          </Badge>
                          <Badge className={`text-xs ${
                            step.status === 'completed' ? 'bg-green-100 text-green-800' :
                            step.status === 'active' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {step.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          {step.content}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Confidence: {Math.round(step.confidence * 100)}%</span>
                          <span>Duration: {step.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Planning Hierarchy</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {planningHierarchy.map((level, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{level.level} Level</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {level.description} • {level.timeframe}
                        </p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        {level.progress}%
                      </Badge>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm font-medium mb-1">Current Objective:</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {level.current}
                      </p>
                    </div>
                    
                    <Progress value={level.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stream" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Thought Stream</span>
                <Badge variant="outline">Live</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {thoughtStream.map((thought, index) => (
                  <div key={index} className={`p-3 rounded-lg border-l-4 ${
                    thought.priority === 'high' ? 'border-l-red-400 bg-red-50' :
                    thought.priority === 'medium' ? 'border-l-yellow-400 bg-yellow-50' :
                    'border-l-gray-400 bg-gray-50'
                  }`}>
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs text-gray-500">{thought.timestamp}</span>
                      <Badge variant="outline" className="text-xs capitalize">
                        {thought.type}
                      </Badge>
                      <Badge className={`text-xs ${
                        thought.priority === 'high' ? 'bg-red-100 text-red-800' :
                        thought.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {thought.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {thought.content}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stream Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Resume
                </Button>
                <Button variant="outline" size="sm">
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>
                <Button variant="outline" size="sm">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button variant="outline" size="sm">
                  <FastForward className="h-4 w-4 mr-2" />
                  Accelerate
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CognitionPanel;

