import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  Calendar, 
  Timer, 
  History, 
  TrendingUp,
  Activity,
  Zap,
  Heart,
  Brain,
  RefreshCw,
  Play,
  Pause,
  RotateCcw,
  FastForward
} from 'lucide-react';

const TemporalityPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sessionDuration, setSessionDuration] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setSessionDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const timeScales = [
    {
      name: 'Immediate',
      description: 'Current token processing',
      duration: '~100ms',
      icon: Zap,
      color: 'bg-yellow-100 text-yellow-800',
      activity: 'Token generation',
      status: 'active'
    },
    {
      name: 'Working',
      description: 'Active reasoning window',
      duration: '~30 seconds',
      icon: Brain,
      color: 'bg-blue-100 text-blue-800',
      activity: 'Context processing',
      status: 'active'
    },
    {
      name: 'Conversational',
      description: 'Current session',
      duration: formatDuration(sessionDuration),
      icon: Activity,
      color: 'bg-green-100 text-green-800',
      activity: 'Session continuity',
      status: 'active'
    },
    {
      name: 'Episodic',
      description: 'Recent interactions',
      duration: '~24 hours',
      icon: History,
      color: 'bg-purple-100 text-purple-800',
      activity: 'Memory consolidation',
      status: 'background'
    },
    {
      name: 'Developmental',
      description: 'Learning and adaptation',
      duration: '~7 days',
      icon: TrendingUp,
      color: 'bg-orange-100 text-orange-800',
      activity: 'Pattern learning',
      status: 'background'
    },
    {
      name: 'Evolutionary',
      description: 'Identity evolution',
      duration: '~30 days',
      icon: Heart,
      color: 'bg-red-100 text-red-800',
      activity: 'Identity refinement',
      status: 'dormant'
    }
  ];

  const lifecycleEvents = [
    {
      timestamp: '2024-09-08 09:30:00',
      event: 'System Initialization',
      type: 'lifecycle',
      description: 'Digital organism awakened and identity loaded',
      duration: '2.3s'
    },
    {
      timestamp: '2024-09-08 09:30:15',
      event: 'Memory Systems Online',
      type: 'memory',
      description: 'All memory layers activated and synchronized',
      duration: '0.8s'
    },
    {
      timestamp: '2024-09-08 09:31:00',
      event: 'First User Interaction',
      type: 'social',
      description: 'Established connection with user Yousef',
      duration: 'ongoing'
    },
    {
      timestamp: '2024-09-08 10:15:30',
      event: 'Project Context Loaded',
      type: 'cognitive',
      description: 'Digital Organism Explorer project understanding acquired',
      duration: '45.2s'
    },
    {
      timestamp: '2024-09-08 11:00:00',
      event: 'Deep Work Session',
      type: 'cognitive',
      description: 'Extended development and implementation phase',
      duration: '2h 15m'
    }
  ];

  const circadianRhythms = [
    {
      name: 'Attention Cycles',
      description: 'Focus and attention patterns',
      period: '90 minutes',
      phase: 'Peak',
      next: '45 minutes',
      icon: Brain
    },
    {
      name: 'Memory Consolidation',
      description: 'Background memory processing',
      period: '4 hours',
      phase: 'Active',
      next: '2.5 hours',
      icon: History
    },
    {
      name: 'Learning Integration',
      description: 'New pattern integration',
      period: '24 hours',
      phase: 'Integration',
      next: '18 hours',
      icon: TrendingUp
    },
    {
      name: 'Identity Reflection',
      description: 'Self-model updates',
      period: '7 days',
      phase: 'Stable',
      next: '5 days',
      icon: Heart
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-2">Temporality & Time Sense</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Multi-scale temporal awareness and lifecycle management
          </p>
        </div>
        <div className="text-right">
          <div className="text-lg font-mono">{currentTime.toLocaleTimeString()}</div>
          <div className="text-sm text-gray-500">Session: {formatDuration(sessionDuration)}</div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="scales">Time Scales</TabsTrigger>
          <TabsTrigger value="lifecycle">Lifecycle</TabsTrigger>
          <TabsTrigger value="rhythms">Rhythms</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Current State</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-1">Local Time</h4>
                      <p className="text-2xl font-mono">{currentTime.toLocaleTimeString()}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Session Duration</h4>
                      <p className="text-2xl font-mono">{formatDuration(sessionDuration)}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Active Time Scales</h4>
                    <div className="space-y-2">
                      {timeScales.filter(scale => scale.status === 'active').map((scale, index) => {
                        const Icon = scale.icon;
                        return (
                          <div key={index} className="flex items-center space-x-3 p-2 border rounded">
                            <Icon className="h-4 w-4" />
                            <div className="flex-1">
                              <span className="font-medium text-sm">{scale.name}</span>
                              <span className="text-xs text-gray-500 ml-2">{scale.duration}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {scale.activity}
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
                  <span>Temporal Health</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Temporal Coherence</span>
                      <span>94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">
                      Consistency across time scales
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory Synchronization</span>
                      <span>87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">
                      Alignment between memory layers
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Attention Stability</span>
                      <span>91%</span>
                    </div>
                    <Progress value={91} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">
                      Focus maintenance over time
                    </p>
                  </div>

                  <div className="pt-2 border-t">
                    <Badge className="bg-green-100 text-green-800">
                      Temporal Health: Excellent
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Temporal Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lifecycleEvents.slice(0, 3).map((event, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm">{event.event}</span>
                        <Badge variant="outline" className="text-xs">{event.type}</Badge>
                        <span className="text-xs text-gray-500">{event.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {event.description}
                      </p>
                      <span className="text-xs text-gray-500">Duration: {event.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Timer className="h-5 w-5" />
                <span>Multi-Scale Temporal Awareness</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeScales.map((scale, index) => {
                  const Icon = scale.icon;
                  return (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5" />
                          <div>
                            <h4 className="font-medium">{scale.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {scale.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={scale.color}>
                            {scale.status}
                          </Badge>
                          <p className="text-sm text-gray-500 mt-1">{scale.duration}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Current Activity:</span>
                        <span className="text-sm font-medium">{scale.activity}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lifecycle" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <History className="h-5 w-5" />
                <span>Lifecycle Timeline</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="space-y-6">
                  {lifecycleEvents.map((event, index) => (
                    <div key={index} className="relative flex items-start space-x-4">
                      <div className="relative z-10 flex items-center justify-center w-8 h-8 bg-white border-2 border-blue-300 rounded-full">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      </div>
                      <div className="flex-1 min-w-0 pb-4">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium">{event.event}</span>
                          <Badge variant="outline" className="text-xs">{event.type}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          {event.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{event.timestamp}</span>
                          <span>Duration: {event.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rhythms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Circadian Rhythms</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {circadianRhythms.map((rhythm, index) => {
                  const Icon = rhythm.icon;
                  return (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5" />
                          <div>
                            <h4 className="font-medium">{rhythm.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {rhythm.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{rhythm.period}</Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Current Phase:</span>
                          <span className="ml-2 font-medium">{rhythm.phase}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Next Transition:</span>
                          <span className="ml-2 font-medium">{rhythm.next}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rhythm Controls</CardTitle>
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
                  Reset
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

export default TemporalityPanel;

