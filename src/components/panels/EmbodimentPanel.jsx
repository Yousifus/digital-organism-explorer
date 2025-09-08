import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Server, 
  Cpu, 
  HardDrive, 
  Monitor, 
  Folder, 
  Settings, 
  Activity,
  Thermometer,
  Zap,
  Network,
  FileText,
  Package,
  Terminal,
  Globe,
  Shield,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  MemoryStick
} from 'lucide-react';
import { cn } from '@/lib/utils';

const EmbodimentPanel = ({ className }) => {
  const [systemStats, setSystemStats] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  // Mock embodiment data - in real implementation this would come from system APIs
  const embodimentData = {
    runtime: {
      environment: 'LM Studio v0.2.26',
      status: 'running',
      uptime: '2d 14h 32m',
      pid: 15847,
      port: 1234,
      apiEndpoint: 'http://localhost:1234/v1',
      lastRestart: '2024-09-06T08:15:00Z',
      autoRestart: true,
      logLevel: 'INFO'
    },
    hardware: {
      cpu: {
        model: 'Apple M2 Pro',
        cores: 12,
        threads: 12,
        usage: 34,
        temperature: 52,
        frequency: '3.5 GHz'
      },
      memory: {
        total: 32,
        used: 18.4,
        available: 13.6,
        modelLoaded: 4.1,
        buffers: 2.3
      },
      gpu: {
        model: 'Apple M2 Pro GPU',
        cores: 19,
        memory: 32,
        usage: 67,
        temperature: 48,
        powerDraw: 15.2
      },
      storage: {
        total: 1000,
        used: 456,
        available: 544,
        modelStorage: 127,
        cacheSize: 8.2
      }
    },
    modelFiles: {
      primary: {
        name: 'llama-2-7b-chat.Q4_K_M.gguf',
        size: '4.1 GB',
        path: '/Models/llama-2-7b-chat.Q4_K_M.gguf',
        loaded: true,
        checksum: 'sha256:a1b2c3d4...',
        lastModified: '2024-08-15T14:22:00Z'
      },
      configs: [
        {
          name: 'model_config.json',
          type: 'Configuration',
          size: '2.1 KB',
          path: '/Configs/model_config.json'
        },
        {
          name: 'chat_template.jinja',
          type: 'Template',
          size: '1.8 KB',
          path: '/Templates/chat_template.jinja'
        },
        {
          name: 'system_prompt.txt',
          type: 'Prompt',
          size: '3.2 KB',
          path: '/Prompts/system_prompt.txt'
        }
      ]
    },
    network: {
      interfaces: [
        {
          name: 'localhost',
          ip: '127.0.0.1',
          status: 'active',
          connections: 3
        },
        {
          name: 'en0',
          ip: '192.168.1.105',
          status: 'active',
          connections: 0
        }
      ],
      apiCalls: {
        total: 1247,
        successful: 1198,
        failed: 49,
        avgResponseTime: 342
      }
    },
    environment: {
      os: 'macOS 14.6.1',
      architecture: 'arm64',
      nodeVersion: 'v20.11.0',
      pythonVersion: '3.11.5',
      workingDirectory: '/Users/aria/LMStudio',
      environmentVars: {
        'CUDA_VISIBLE_DEVICES': 'Not set',
        'OMP_NUM_THREADS': '12',
        'MKL_NUM_THREADS': '12'
      }
    }
  };

  const refreshStats = async () => {
    setRefreshing(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In real implementation, this would fetch actual system stats
    setSystemStats({
      timestamp: new Date(),
      cpuUsage: Math.random() * 100,
      memoryUsage: Math.random() * 100,
      gpuUsage: Math.random() * 100
    });
    
    setRefreshing(false);
  };

  useEffect(() => {
    refreshStats();
    const interval = setInterval(refreshStats, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'running': return 'text-green-600 bg-green-100';
      case 'stopped': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'running': return CheckCircle;
      case 'stopped': return XCircle;
      case 'warning': return AlertTriangle;
      default: return Activity;
    }
  };

  const StatusIcon = getStatusIcon(embodimentData.runtime.status);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Server className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Digital Embodiment</h2>
            <p className="text-sm text-gray-600">Runtime environment and computational infrastructure</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={refreshStats}
            disabled={refreshing}
          >
            <RefreshCw className={cn("h-4 w-4 mr-2", refreshing && "animate-spin")} />
            Refresh
          </Button>
          <Badge className={cn("text-xs", getStatusColor(embodimentData.runtime.status))}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {embodimentData.runtime.status}
          </Badge>
        </div>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Cpu className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">CPU</p>
                <p className="text-xs text-gray-600">{embodimentData.hardware.cpu.model}</p>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span>Usage</span>
                <span>{embodimentData.hardware.cpu.usage}%</span>
              </div>
              <Progress value={embodimentData.hardware.cpu.usage} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <MemoryStick className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Memory</p>
                <p className="text-xs text-gray-600">{embodimentData.hardware.memory.total} GB Total</p>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span>Used</span>
                <span>{embodimentData.hardware.memory.used} GB</span>
              </div>
              <Progress value={(embodimentData.hardware.memory.used / embodimentData.hardware.memory.total) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Monitor className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">GPU</p>
                <p className="text-xs text-gray-600">{embodimentData.hardware.gpu.model}</p>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span>Usage</span>
                <span>{embodimentData.hardware.gpu.usage}%</span>
              </div>
              <Progress value={embodimentData.hardware.gpu.usage} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <HardDrive className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Storage</p>
                <p className="text-xs text-gray-600">{embodimentData.hardware.storage.total} GB Total</p>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span>Used</span>
                <span>{embodimentData.hardware.storage.used} GB</span>
              </div>
              <Progress value={(embodimentData.hardware.storage.used / embodimentData.hardware.storage.total) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Embodiment Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Server className="h-5 w-5 text-gray-600" />
            <span>Computational Infrastructure</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="p-4 bg-gray-50 rounded-lg mb-6">
            <p className="text-sm text-gray-800 mb-2">
              <strong>Biological Analogy:</strong> Like the cellular environment and organ systems that support biological life - the computational infrastructure provides the necessary resources, interfaces, and environment for the digital organism to exist and function.
            </p>
            <p className="text-xs text-gray-600">
              This includes the runtime environment, hardware resources, file systems, and network interfaces that form the organism's "body."
            </p>
          </div>

          <Tabs defaultValue="runtime" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="runtime">
                <Terminal className="h-4 w-4 mr-2" />
                Runtime
              </TabsTrigger>
              <TabsTrigger value="hardware">
                <Cpu className="h-4 w-4 mr-2" />
                Hardware
              </TabsTrigger>
              <TabsTrigger value="files">
                <Folder className="h-4 w-4 mr-2" />
                Files
              </TabsTrigger>
              <TabsTrigger value="network">
                <Network className="h-4 w-4 mr-2" />
                Network
              </TabsTrigger>
              <TabsTrigger value="environment">
                <Globe className="h-4 w-4 mr-2" />
                Environment
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="runtime" className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center">
                      <Activity className="h-4 w-4 mr-2" />
                      Runtime Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Environment</span>
                      <span className="text-sm font-medium">{embodimentData.runtime.environment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <Badge className={cn("text-xs", getStatusColor(embodimentData.runtime.status))}>
                        {embodimentData.runtime.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Uptime</span>
                      <span className="text-sm font-medium">{embodimentData.runtime.uptime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Process ID</span>
                      <span className="text-sm font-medium">{embodimentData.runtime.pid}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Port</span>
                      <span className="text-sm font-medium">{embodimentData.runtime.port}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">API Endpoint</span>
                      <span className="text-sm font-mono text-blue-600">{embodimentData.runtime.apiEndpoint}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Auto Restart</span>
                      <Badge variant={embodimentData.runtime.autoRestart ? "default" : "secondary"} className="text-xs">
                        {embodimentData.runtime.autoRestart ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Log Level</span>
                      <span className="text-sm font-medium">{embodimentData.runtime.logLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Last Restart</span>
                      <span className="text-sm font-medium">{new Date(embodimentData.runtime.lastRestart).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="hardware" className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center">
                      <Cpu className="h-4 w-4 mr-2" />
                      Processor
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Model</span>
                      <span className="text-sm font-medium">{embodimentData.hardware.cpu.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Cores</span>
                      <span className="text-sm font-medium">{embodimentData.hardware.cpu.cores}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Frequency</span>
                      <span className="text-sm font-medium">{embodimentData.hardware.cpu.frequency}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Usage</span>
                        <span className="font-medium">{embodimentData.hardware.cpu.usage}%</span>
                      </div>
                      <Progress value={embodimentData.hardware.cpu.usage} className="h-2" />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Temperature</span>
                      <span className="text-sm font-medium flex items-center">
                        <Thermometer className="h-3 w-3 mr-1" />
                        {embodimentData.hardware.cpu.temperature}°C
                      </span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center">
                      <Monitor className="h-4 w-4 mr-2" />
                      Graphics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Model</span>
                      <span className="text-sm font-medium">{embodimentData.hardware.gpu.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Cores</span>
                      <span className="text-sm font-medium">{embodimentData.hardware.gpu.cores}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Memory</span>
                      <span className="text-sm font-medium">{embodimentData.hardware.gpu.memory} GB</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Usage</span>
                        <span className="font-medium">{embodimentData.hardware.gpu.usage}%</span>
                      </div>
                      <Progress value={embodimentData.hardware.gpu.usage} className="h-2" />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Power Draw</span>
                      <span className="text-sm font-medium flex items-center">
                        <Zap className="h-3 w-3 mr-1" />
                        {embodimentData.hardware.gpu.powerDraw}W
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center">
                    <MemoryStick className="h-4 w-4 mr-2" />
                    Memory Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">System Memory</span>
                        <span className="font-medium">{embodimentData.hardware.memory.used} / {embodimentData.hardware.memory.total} GB</span>
                      </div>
                      <Progress value={(embodimentData.hardware.memory.used / embodimentData.hardware.memory.total) * 100} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Model Loaded</span>
                        <p className="font-medium">{embodimentData.hardware.memory.modelLoaded} GB</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Buffers</span>
                        <p className="font-medium">{embodimentData.hardware.memory.buffers} GB</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Available</span>
                        <p className="font-medium">{embodimentData.hardware.memory.available} GB</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="files" className="mt-4 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center">
                    <Package className="h-4 w-4 mr-2" />
                    Primary Model
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded">
                        <FileText className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{embodimentData.modelFiles.primary.name}</p>
                        <p className="text-xs text-gray-600">{embodimentData.modelFiles.primary.size}</p>
                      </div>
                    </div>
                    <Badge variant="default" className="text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Loaded
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Path</span>
                      <span className="font-mono text-xs">{embodimentData.modelFiles.primary.path}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Checksum</span>
                      <span className="font-mono text-xs">{embodimentData.modelFiles.primary.checksum}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Modified</span>
                      <span className="text-xs">{new Date(embodimentData.modelFiles.primary.lastModified).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center">
                    <Folder className="h-4 w-4 mr-2" />
                    Configuration Files
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {embodimentData.modelFiles.configs.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded">
                            <FileText className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{file.name}</p>
                            <p className="text-xs text-gray-600">{file.type} • {file.size}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Settings className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="network" className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center">
                      <Network className="h-4 w-4 mr-2" />
                      Network Interfaces
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {embodimentData.network.interfaces.map((interface_, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{interface_.name}</p>
                          <p className="text-xs text-gray-600">{interface_.ip}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={interface_.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                            {interface_.status}
                          </Badge>
                          <p className="text-xs text-gray-600 mt-1">{interface_.connections} connections</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center">
                      <Activity className="h-4 w-4 mr-2" />
                      API Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Calls</span>
                      <span className="text-sm font-medium">{embodimentData.network.apiCalls.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Successful</span>
                      <span className="text-sm font-medium text-green-600">{embodimentData.network.apiCalls.successful.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Failed</span>
                      <span className="text-sm font-medium text-red-600">{embodimentData.network.apiCalls.failed.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Avg Response</span>
                      <span className="text-sm font-medium">{embodimentData.network.apiCalls.avgResponseTime}ms</span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Success Rate</span>
                        <span className="font-medium">{Math.round((embodimentData.network.apiCalls.successful / embodimentData.network.apiCalls.total) * 100)}%</span>
                      </div>
                      <Progress value={(embodimentData.network.apiCalls.successful / embodimentData.network.apiCalls.total) * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="environment" className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      System Environment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Operating System</span>
                      <span className="text-sm font-medium">{embodimentData.environment.os}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Architecture</span>
                      <span className="text-sm font-medium">{embodimentData.environment.architecture}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Node.js</span>
                      <span className="text-sm font-medium">{embodimentData.environment.nodeVersion}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Python</span>
                      <span className="text-sm font-medium">{embodimentData.environment.pythonVersion}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Working Dir</span>
                      <span className="text-sm font-mono text-blue-600">{embodimentData.environment.workingDirectory}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Environment Variables
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(embodimentData.environment.environmentVars).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm text-gray-600 font-mono">{key}</span>
                        <span className="text-sm font-medium">{value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmbodimentPanel;

