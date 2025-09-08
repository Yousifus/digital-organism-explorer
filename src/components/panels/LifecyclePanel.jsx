import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Power, 
  PowerOff,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Rewind,
  Eye,
  Brain,
  Zap,
  Heart,
  Shield,
  GitBranch,
  Clock,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Settings,
  Monitor,
  Cpu,
  Database,
  Network,
  FileText,
  Users,
  Target,
  TrendingUp,
  Layers,
  ArrowRight,
  ArrowDown,
  Circle,
  Square,
  Triangle,
  Hexagon,
  Octagon,
  Star,
  Diamond
} from 'lucide-react';

const LifecyclePanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentState, setCurrentState] = useState('active');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [stateHistory, setStateHistory] = useState([]);

  // Lifecycle states from the Mermaid diagram
  const lifecycleStates = [
    {
      id: 'init',
      name: 'Initialize',
      description: 'System startup and component initialization',
      icon: Power,
      color: 'bg-gray-100 text-gray-800',
      duration: '2-5s',
      nextStates: ['boot'],
      activities: ['Load configuration', 'Initialize memory', 'Setup environment'],
      biologicalAnalogy: 'Embryonic development and cellular differentiation'
    },
    {
      id: 'boot',
      name: 'Boot',
      description: 'Loading models and establishing connections',
      icon: Cpu,
      color: 'bg-blue-100 text-blue-800',
      duration: '10-30s',
      nextStates: ['idle'],
      activities: ['Load model weights', 'Establish API connections', 'Verify integrity'],
      biologicalAnalogy: 'Birth and initial life support activation'
    },
    {
      id: 'idle',
      name: 'Idle',
      description: 'Waiting for input or scheduled tasks',
      icon: Pause,
      color: 'bg-green-100 text-green-800',
      duration: 'Variable',
      nextStates: ['perceive', 'sleep'],
      activities: ['Monitor inputs', 'Maintain homeostasis', 'Background processing'],
      biologicalAnalogy: 'Resting state with basic metabolic functions'
    },
    {
      id: 'perceive',
      name: 'Perceive',
      description: 'Processing sensory input and environmental data',
      icon: Eye,
      color: 'bg-purple-100 text-purple-800',
      duration: '100-500ms',
      nextStates: ['plan', 'idle'],
      activities: ['Parse input', 'Extract features', 'Update attention'],
      biologicalAnalogy: 'Sensory processing and environmental awareness'
    },
    {
      id: 'plan',
      name: 'Plan',
      description: 'Reasoning, decision-making, and action planning',
      icon: Brain,
      color: 'bg-orange-100 text-orange-800',
      duration: '500ms-5s',
      nextStates: ['act', 'idle'],
      activities: ['Analyze context', 'Generate plans', 'Evaluate options'],
      biologicalAnalogy: 'Cognitive processing and decision-making'
    },
    {
      id: 'act',
      name: 'Act',
      description: 'Executing actions and tool calls',
      icon: Zap,
      color: 'bg-yellow-100 text-yellow-800',
      duration: '100ms-10s',
      nextStates: ['learn', 'idle'],
      activities: ['Execute tools', 'Generate responses', 'Modify environment'],
      biologicalAnalogy: 'Motor actions and environmental manipulation'
    },
    {
      id: 'learn',
      name: 'Learn',
      description: 'Updating memory and knowledge structures',
      icon: Database,
      color: 'bg-indigo-100 text-indigo-800',
      duration: '50-200ms',
      nextStates: ['reflect', 'idle'],
      activities: ['Store experiences', 'Update weights', 'Consolidate memory'],
      biologicalAnalogy: 'Memory formation and synaptic plasticity'
    },
    {
      id: 'reflect',
      name: 'Reflect',
      description: 'Self-assessment and performance evaluation',
      icon: Monitor,
      color: 'bg-pink-100 text-pink-800',
      duration: '200ms-1s',
      nextStates: ['evolve', 'idle'],
      activities: ['Evaluate performance', 'Identify improvements', 'Update self-model'],
      biologicalAnalogy: 'Metacognition and self-awareness'
    },
    {
      id: 'evolve',
      name: 'Evolve',
      description: 'Proposing and implementing improvements',
      icon: GitBranch,
      color: 'bg-teal-100 text-teal-800',
      duration: '1-10s',
      nextStates: ['review', 'idle'],
      activities: ['Generate mutations', 'Propose changes', 'Test variations'],
      biologicalAnalogy: 'Genetic mutation and adaptation'
    },
    {
      id: 'review',
      name: 'Review',
      description: 'Human oversight and approval of changes',
      icon: Users,
      color: 'bg-cyan-100 text-cyan-800',
      duration: 'Variable',
      nextStates: ['deploy', 'rollback', 'idle'],
      activities: ['Present changes', 'Await approval', 'Gather feedback'],
      biologicalAnalogy: 'Social validation and group decision-making'
    },
    {
      id: 'deploy',
      name: 'Deploy',
      description: 'Implementing approved changes',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-800',
      duration: '1-5s',
      nextStates: ['idle'],
      activities: ['Apply changes', 'Update configuration', 'Verify integrity'],
      biologicalAnalogy: 'Developmental changes and growth'
    },
    {
      id: 'rollback',
      name: 'Rollback',
      description: 'Reverting to previous stable state',
      icon: RotateCcw,
      color: 'bg-red-100 text-red-800',
      duration: '1-3s',
      nextStates: ['idle'],
      activities: ['Restore backup', 'Reset configuration', 'Clear changes'],
      biologicalAnalogy: 'Immune response and damage repair'
    },
    {
      id: 'sleep',
      name: 'Sleep',
      description: 'Low-power mode with memory consolidation',
      icon: PowerOff,
      color: 'bg-gray-100 text-gray-800',
      duration: 'Variable',
      nextStates: ['idle', 'shutdown'],
      activities: ['Consolidate memory', 'Reduce activity', 'Maintain core functions'],
      biologicalAnalogy: 'Sleep state with memory consolidation'
    },
    {
      id: 'shutdown',
      name: 'Shutdown',
      description: 'Graceful system termination',
      icon: PowerOff,
      color: 'bg-red-100 text-red-800',
      duration: '2-10s',
      nextStates: [],
      activities: ['Save state', 'Close connections', 'Terminate processes'],
      biologicalAnalogy: 'Natural death and resource recycling'
    },
    {
      id: 'active',
      name: 'Active',
      description: 'Normal operational state with full capabilities',
      icon: Activity,
      color: 'bg-green-100 text-green-800',
      duration: 'Continuous',
      nextStates: ['perceive', 'plan', 'act', 'learn', 'reflect'],
      activities: ['Process inputs', 'Execute tasks', 'Maintain awareness'],
      biologicalAnalogy: 'Awake and alert state with full consciousness'
    }
  ];

  // Simulated state transitions and history
  useEffect(() => {
    const history = [
      { state: 'init', timestamp: '2024-09-08 11:45:00', duration: '3.2s', trigger: 'System startup' },
      { state: 'boot', timestamp: '2024-09-08 11:45:03', duration: '15.7s', trigger: 'Initialization complete' },
      { state: 'idle', timestamp: '2024-09-08 11:45:19', duration: '2.1s', trigger: 'Boot complete' },
      { state: 'perceive', timestamp: '2024-09-08 11:45:21', duration: '0.3s', trigger: 'User input detected' },
      { state: 'plan', timestamp: '2024-09-08 11:45:21', duration: '1.8s', trigger: 'Input processed' },
      { state: 'act', timestamp: '2024-09-08 11:45:23', duration: '2.4s', trigger: 'Plan generated' },
      { state: 'learn', timestamp: '2024-09-08 11:45:25', duration: '0.1s', trigger: 'Action completed' },
      { state: 'reflect', timestamp: '2024-09-08 11:45:25', duration: '0.5s', trigger: 'Learning complete' },
      { state: 'active', timestamp: '2024-09-08 11:45:26', duration: 'Ongoing', trigger: 'Reflection complete' }
    ];
    setStateHistory(history);
  }, []);

  const getCurrentStateData = () => {
    return lifecycleStates.find(state => state.id === currentState);
  };

  const getStateMetrics = () => {
    const totalTransitions = stateHistory.length;
    const uniqueStates = new Set(stateHistory.map(h => h.state)).size;
    const avgDuration = stateHistory
      .filter(h => h.duration !== 'Ongoing' && h.duration !== 'Variable')
      .reduce((acc, h) => acc + parseFloat(h.duration), 0) / 
      stateHistory.filter(h => h.duration !== 'Ongoing' && h.duration !== 'Variable').length;
    
    return {
      totalTransitions,
      uniqueStates,
      avgDuration: avgDuration.toFixed(1),
      uptime: '1h 42m 15s'
    };
  };

  const handleStateTransition = (newState) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentState(newState);
      setStateHistory(prev => [...prev, {
        state: newState,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        duration: 'Ongoing',
        trigger: 'Manual transition'
      }]);
      setIsTransitioning(false);
    }, 1000);
  };

  const currentStateData = getCurrentStateData();
  const StateIcon = currentStateData?.icon || Activity;
  const metrics = getStateMetrics();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-2">Lifecycle State Machine</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Complete organism lifecycle with state transitions and monitoring
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={currentStateData?.color}>
            <StateIcon className="h-3 w-3 mr-1" />
            {currentStateData?.name}
          </Badge>
          <Badge className="bg-blue-100 text-blue-800">
            <Clock className="h-3 w-3 mr-1" />
            {metrics.uptime}
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="states">States</TabsTrigger>
          <TabsTrigger value="transitions">Transitions</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Current State</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <StateIcon className="h-12 w-12 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-blue-600">{currentStateData?.name}</div>
                    <p className="text-sm text-gray-600 mt-1">
                      {currentStateData?.description}
                    </p>
                  </div>
                  
                  <div className="border-t pt-3">
                    <h4 className="font-medium mb-2">Current Activities:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {currentStateData?.activities.map((activity, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t pt-3">
                    <p className="text-xs text-gray-500">
                      <strong>Biological Analogy:</strong> {currentStateData?.biologicalAnalogy}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Lifecycle Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Transitions</span>
                    <span className="text-lg font-bold">{metrics.totalTransitions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">States Visited</span>
                    <span className="text-lg font-bold text-blue-600">{metrics.uniqueStates}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Avg Duration</span>
                    <span className="text-lg font-bold text-green-600">{metrics.avgDuration}s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">System Uptime</span>
                    <span className="text-lg font-bold text-purple-600">{metrics.uptime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Layers className="h-5 w-5" />
                <span>State Machine Visualization</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {lifecycleStates.slice(0, 14).map((state, index) => {
                  const StateIcon = state.icon;
                  const isActive = state.id === currentState;
                  const canTransition = currentStateData?.nextStates.includes(state.id);
                  
                  return (
                    <div key={index} className={`border rounded-lg p-3 text-center cursor-pointer transition-all ${
                      isActive ? 'ring-2 ring-blue-500 bg-blue-50' : 
                      canTransition ? 'hover:bg-gray-50 border-green-300' : 
                      'opacity-50'
                    }`} onClick={() => canTransition && handleStateTransition(state.id)}>
                      <StateIcon className={`h-6 w-6 mx-auto mb-1 ${
                        isActive ? 'text-blue-600' : 
                        canTransition ? 'text-green-600' : 
                        'text-gray-400'
                      }`} />
                      <div className="text-xs font-medium">{state.name}</div>
                      <Badge className={`${state.color} text-xs mt-1`}>
                        {state.duration}
                      </Badge>
                      {isActive && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-1 animate-pulse"></div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p><strong>Legend:</strong> Blue = Current State, Green = Available Transitions, Gray = Inactive</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="states" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>All Lifecycle States</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lifecycleStates.map((state, index) => {
                  const StateIcon = state.icon;
                  const isActive = state.id === currentState;
                  
                  return (
                    <div key={index} className={`border rounded-lg p-4 ${
                      isActive ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <StateIcon className={`h-6 w-6 ${isActive ? 'text-blue-600' : 'text-gray-600'}`} />
                          <h4 className="font-medium">{state.name}</h4>
                          <Badge className={state.color}>
                            {state.duration}
                          </Badge>
                          {isActive && (
                            <Badge className="bg-blue-100 text-blue-800">
                              Current
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{state.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <h5 className="text-sm font-medium mb-1">Activities:</h5>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {state.activities.map((activity, actIndex) => (
                              <li key={actIndex}>• {activity}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium mb-1">Next States:</h5>
                          <div className="flex flex-wrap gap-1">
                            {state.nextStates.map((nextState, nextIndex) => (
                              <Badge key={nextIndex} variant="outline" className="text-xs">
                                {lifecycleStates.find(s => s.id === nextState)?.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t pt-2">
                        <p className="text-xs text-gray-500">
                          <strong>Biological Analogy:</strong> {state.biologicalAnalogy}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transitions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Transition History</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stateHistory.slice().reverse().map((entry, index) => {
                  const stateData = lifecycleStates.find(s => s.id === entry.state);
                  const StateIcon = stateData?.icon || Circle;
                  
                  return (
                    <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                      <StateIcon className="h-5 w-5 text-blue-600" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{stateData?.name}</span>
                          <Badge className={stateData?.color}>
                            {entry.duration}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{entry.trigger}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {entry.timestamp}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Lifecycle Testing</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Manual State Transitions</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {currentStateData?.nextStates.map((stateId, index) => {
                      const targetState = lifecycleStates.find(s => s.id === stateId);
                      const TargetIcon = targetState?.icon || Circle;
                      
                      return (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleStateTransition(stateId)}
                          disabled={isTransitioning}
                          className="flex items-center space-x-2"
                        >
                          <TargetIcon className="h-4 w-4" />
                          <span>{targetState?.name}</span>
                        </Button>
                      );
                    })}
                  </div>
                  {isTransitioning && (
                    <div className="mt-2 text-sm text-blue-600">
                      Transitioning state...
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Automated Test Sequences</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Play className="h-4 w-4" />
                      <span>Full Lifecycle Test</span>
                    </Button>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Zap className="h-4 w-4" />
                      <span>Perception-Action Loop</span>
                    </Button>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <GitBranch className="h-4 w-4" />
                      <span>Evolution Workflow</span>
                    </Button>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <span>Emergency Protocols</span>
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">System Health Checks</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">State Transition Integrity</span>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Passed
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Memory Consistency</span>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Passed
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Resource Management</span>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Passed
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Safety Protocols</span>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Passed
                      </Badge>
                    </div>
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

export default LifecyclePanel;

