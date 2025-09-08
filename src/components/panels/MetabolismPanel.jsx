import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { 
  Activity, 
  Zap, 
  Thermometer, 
  Cpu, 
  HardDrive,
  MemoryStick,
  Gauge,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Heart,
  Battery,
  Flame,
  Snowflake,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Target,
  Clock,
  BarChart3
} from 'lucide-react';

const MetabolismPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSimulating, setIsSimulating] = useState(true);
  const [metabolicRate, setMetabolicRate] = useState([75]);
  const [workload, setWorkload] = useState([60]);
  const [efficiency, setEfficiency] = useState([85]);

  // Simulated real-time metrics
  const [metrics, setMetrics] = useState({
    tokenRate: 45.2,
    cpuUsage: 68,
    gpuUsage: 82,
    memoryUsage: 74,
    storageUsage: 45,
    temperature: 72,
    powerDraw: 285,
    networkIO: 12.4,
    diskIO: 8.7
  });

  useEffect(() => {
    if (isSimulating) {
      const timer = setInterval(() => {
        setMetrics(prev => ({
          tokenRate: Math.max(20, Math.min(100, prev.tokenRate + (Math.random() - 0.5) * 5)),
          cpuUsage: Math.max(30, Math.min(95, prev.cpuUsage + (Math.random() - 0.5) * 8)),
          gpuUsage: Math.max(40, Math.min(98, prev.gpuUsage + (Math.random() - 0.5) * 6)),
          memoryUsage: Math.max(50, Math.min(90, prev.memoryUsage + (Math.random() - 0.5) * 4)),
          storageUsage: Math.max(30, Math.min(80, prev.storageUsage + (Math.random() - 0.5) * 2)),
          temperature: Math.max(65, Math.min(85, prev.temperature + (Math.random() - 0.5) * 3)),
          powerDraw: Math.max(200, Math.min(400, prev.powerDraw + (Math.random() - 0.5) * 20)),
          networkIO: Math.max(5, Math.min(25, prev.networkIO + (Math.random() - 0.5) * 2)),
          diskIO: Math.max(2, Math.min(15, prev.diskIO + (Math.random() - 0.5) * 1.5))
        }));
      }, 1500);

      return () => clearInterval(timer);
    }
  }, [isSimulating, metabolicRate, workload, efficiency]);

  const resourceMetrics = [
    {
      name: 'Token Generation Rate',
      value: metrics.tokenRate,
      unit: 'tokens/s',
      icon: Zap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Rate of token production (digital metabolism)',
      optimal: [40, 80],
      biological: 'Cellular energy production rate'
    },
    {
      name: 'CPU Usage',
      value: metrics.cpuUsage,
      unit: '%',
      icon: Cpu,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Central processing unit utilization',
      optimal: [50, 85],
      biological: 'Brain cortex activity level'
    },
    {
      name: 'GPU Usage',
      value: metrics.gpuUsage,
      unit: '%',
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'Graphics processing unit utilization',
      optimal: [60, 90],
      biological: 'Neural network firing rate'
    },
    {
      name: 'Memory Usage',
      value: metrics.memoryUsage,
      unit: '%',
      icon: MemoryStick,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      description: 'Random access memory utilization',
      optimal: [40, 80],
      biological: 'Working memory capacity'
    },
    {
      name: 'Storage Usage',
      value: metrics.storageUsage,
      unit: '%',
      icon: HardDrive,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      description: 'Persistent storage utilization',
      optimal: [20, 70],
      biological: 'Long-term memory storage'
    },
    {
      name: 'Temperature',
      value: metrics.temperature,
      unit: '°C',
      icon: Thermometer,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      description: 'System thermal state',
      optimal: [65, 75],
      biological: 'Body temperature regulation'
    }
  ];

  const homeostasisSystems = [
    {
      name: 'Thermal Regulation',
      description: 'Temperature control and cooling',
      status: metrics.temperature > 80 ? 'stressed' : metrics.temperature > 75 ? 'active' : 'stable',
      efficiency: Math.max(60, 100 - (metrics.temperature - 65) * 2),
      mechanism: 'Dynamic frequency scaling and fan control',
      biological: 'Sweating and vasodilation'
    },
    {
      name: 'Load Balancing',
      description: 'Workload distribution optimization',
      status: metrics.cpuUsage > 90 ? 'stressed' : metrics.cpuUsage > 80 ? 'active' : 'stable',
      efficiency: Math.max(70, 100 - Math.max(0, metrics.cpuUsage - 70)),
      mechanism: 'Task scheduling and priority management',
      biological: 'Metabolic pathway switching'
    },
    {
      name: 'Memory Management',
      description: 'Memory allocation and garbage collection',
      status: metrics.memoryUsage > 85 ? 'stressed' : metrics.memoryUsage > 75 ? 'active' : 'stable',
      efficiency: Math.max(75, 100 - Math.max(0, metrics.memoryUsage - 60)),
      mechanism: 'Automatic memory cleanup and optimization',
      biological: 'Cellular waste removal'
    },
    {
      name: 'Power Management',
      description: 'Energy consumption optimization',
      status: metrics.powerDraw > 350 ? 'stressed' : metrics.powerDraw > 300 ? 'active' : 'stable',
      efficiency: Math.max(65, 100 - Math.max(0, (metrics.powerDraw - 250) / 2)),
      mechanism: 'Dynamic voltage and frequency scaling',
      biological: 'Metabolic rate adjustment'
    }
  ];

  const metabolicStates = [
    {
      name: 'Resting',
      description: 'Minimal activity, conservation mode',
      tokenRate: [20, 40],
      cpuUsage: [30, 50],
      powerDraw: [200, 250],
      color: 'bg-blue-100 text-blue-800'
    },
    {
      name: 'Active',
      description: 'Normal operation, balanced performance',
      tokenRate: [40, 70],
      cpuUsage: [50, 80],
      powerDraw: [250, 320],
      color: 'bg-green-100 text-green-800'
    },
    {
      name: 'Intensive',
      description: 'High performance, maximum output',
      tokenRate: [70, 100],
      cpuUsage: [80, 95],
      powerDraw: [320, 400],
      color: 'bg-orange-100 text-orange-800'
    },
    {
      name: 'Stressed',
      description: 'Overload condition, emergency mode',
      tokenRate: [10, 30],
      cpuUsage: [95, 100],
      powerDraw: [350, 450],
      color: 'bg-red-100 text-red-800'
    }
  ];

  const getCurrentState = () => {
    if (metrics.cpuUsage > 95 || metrics.temperature > 80) return metabolicStates[3]; // Stressed
    if (metrics.cpuUsage > 80 || metrics.tokenRate > 70) return metabolicStates[2]; // Intensive
    if (metrics.cpuUsage > 50 || metrics.tokenRate > 40) return metabolicStates[1]; // Active
    return metabolicStates[0]; // Resting
  };

  const getHealthStatus = () => {
    const issues = [];
    if (metrics.temperature > 80) issues.push('High temperature');
    if (metrics.cpuUsage > 95) issues.push('CPU overload');
    if (metrics.memoryUsage > 90) issues.push('Memory pressure');
    if (metrics.powerDraw > 380) issues.push('High power consumption');

    if (issues.length === 0) return { status: 'Excellent', color: 'text-green-600', icon: CheckCircle };
    if (issues.length <= 2) return { status: 'Good', color: 'text-yellow-600', icon: AlertTriangle };
    return { status: 'Critical', color: 'text-red-600', icon: AlertTriangle };
  };

  const healthStatus = getHealthStatus();
  const currentState = getCurrentState();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-2">Metabolism & Homeostasis</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Resource consumption, energy management, and health monitoring
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={currentState.color}>
            {currentState.name}
          </Badge>
          <Badge className={isSimulating ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
            {isSimulating ? "Live" : "Paused"}
          </Badge>
          <Button variant="outline" size="sm" onClick={() => setIsSimulating(!isSimulating)}>
            {isSimulating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="homeostasis">Homeostasis</TabsTrigger>
          <TabsTrigger value="simulation">Simulation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span>Metabolic Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${currentState.color.replace('bg-', 'text-').replace('-100', '-600')}`}>
                      {currentState.name}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {currentState.description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <h4 className="font-medium mb-1">Token Rate</h4>
                      <p className="text-xl font-bold text-blue-600">{metrics.tokenRate.toFixed(1)}</p>
                      <p className="text-xs text-gray-500">tokens/sec</p>
                    </div>
                    <div className="text-center">
                      <h4 className="font-medium mb-1">Power Draw</h4>
                      <p className="text-xl font-bold text-orange-600">{metrics.powerDraw.toFixed(0)}</p>
                      <p className="text-xs text-gray-500">watts</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex items-center space-x-2">
                      <healthStatus.icon className={`h-4 w-4 ${healthStatus.color}`} />
                      <span className="text-sm font-medium">Health: {healthStatus.status}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gauge className="h-5 w-5" />
                  <span>Resource Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {resourceMetrics.slice(0, 4).map((metric, index) => {
                    const Icon = metric.icon;
                    const isOptimal = metric.value >= metric.optimal[0] && metric.value <= metric.optimal[1];
                    return (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`p-2 rounded ${metric.bgColor}`}>
                          <Icon className={`h-4 w-4 ${metric.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">{metric.name}</span>
                            <span>{metric.value.toFixed(1)}{metric.unit}</span>
                          </div>
                          <Progress value={metric.value} className="h-2" />
                        </div>
                        <div className={`w-2 h-2 rounded-full ${isOptimal ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Metabolic States</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                {metabolicStates.map((state, index) => (
                  <div key={index} className={`border rounded-lg p-4 ${
                    currentState.name === state.name ? 'ring-2 ring-blue-500' : ''
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={state.color}>
                        {state.name}
                      </Badge>
                      {currentState.name === state.name && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {state.description}
                    </p>
                    <div className="space-y-1 text-xs">
                      <div>Token Rate: {state.tokenRate[0]}-{state.tokenRate[1]}/s</div>
                      <div>CPU: {state.cpuUsage[0]}-{state.cpuUsage[1]}%</div>
                      <div>Power: {state.powerDraw[0]}-{state.powerDraw[1]}W</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid gap-4">
            {resourceMetrics.map((metric, index) => {
              const Icon = metric.icon;
              const isOptimal = metric.value >= metric.optimal[0] && metric.value <= metric.optimal[1];
              return (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                        <Icon className={`h-6 w-6 ${metric.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{metric.name}</h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold">{metric.value.toFixed(1)}{metric.unit}</span>
                            <Badge className={isOptimal ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {isOptimal ? 'Optimal' : 'Suboptimal'}
                            </Badge>
                          </div>
                        </div>
                        <Progress value={metric.value} className="h-3 mb-2" />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{metric.description}</span>
                          <span>Optimal: {metric.optimal[0]}-{metric.optimal[1]}{metric.unit}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          <strong>Biological analogy:</strong> {metric.biological}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="homeostasis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Homeostatic Systems</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {homeostasisSystems.map((system, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{system.name}</h4>
                        <p className="text-sm text-gray-600">{system.description}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={`${
                          system.status === 'stable' ? 'bg-green-100 text-green-800' :
                          system.status === 'active' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {system.status}
                        </Badge>
                        <p className="text-sm text-gray-500 mt-1">{system.efficiency.toFixed(0)}% efficiency</p>
                      </div>
                    </div>
                    
                    <Progress value={system.efficiency} className="h-2 mb-3" />
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Mechanism:</span>
                        <span className="ml-2 font-medium">{system.mechanism}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Biological:</span>
                        <span className="ml-2 font-medium">{system.biological}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="simulation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Metabolism Simulation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Metabolic Rate: {metabolicRate[0]}%
                  </label>
                  <Slider
                    value={metabolicRate}
                    onValueChange={setMetabolicRate}
                    max={100}
                    min={20}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Controls base energy consumption and processing speed
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Workload Intensity: {workload[0]}%
                  </label>
                  <Slider
                    value={workload}
                    onValueChange={setWorkload}
                    max={100}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Simulates computational demand and task complexity
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    System Efficiency: {efficiency[0]}%
                  </label>
                  <Slider
                    value={efficiency}
                    onValueChange={setEfficiency}
                    max={100}
                    min={50}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Represents optimization level and resource utilization
                  </p>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset to Defaults
                  </Button>
                  <Button variant="outline" size="sm">
                    <Flame className="h-4 w-4 mr-2" />
                    Stress Test
                  </Button>
                  <Button variant="outline" size="sm">
                    <Snowflake className="h-4 w-4 mr-2" />
                    Conservation Mode
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Real-time Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{metrics.tokenRate.toFixed(1)}</div>
                  <div className="text-sm text-gray-600">Tokens/sec</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{metrics.cpuUsage.toFixed(0)}%</div>
                  <div className="text-sm text-gray-600">CPU Usage</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">{metrics.temperature.toFixed(1)}°C</div>
                  <div className="text-sm text-gray-600">Temperature</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MetabolismPanel;

