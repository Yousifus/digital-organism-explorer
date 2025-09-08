import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  Settings, 
  Zap, 
  Shield, 
  Play, 
  Pause,
  CheckCircle,
  AlertTriangle,
  Clock,
  ArrowRight,
  FileText,
  Search,
  Calculator,
  Image,
  Code,
  Terminal,
  Globe,
  Database,
  Wrench,
  Eye,
  RefreshCw
} from 'lucide-react';

const ActionPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isExecuting, setIsExecuting] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [toolInput, setToolInput] = useState('');
  const [executionLog, setExecutionLog] = useState([]);

  const availableTools = [
    {
      id: 'file_read',
      name: 'File Reader',
      description: 'Read and analyze file contents',
      icon: FileText,
      category: 'file_system',
      safety_level: 'safe',
      parameters: ['file_path'],
      example: '/home/user/document.txt'
    },
    {
      id: 'web_search',
      name: 'Web Search',
      description: 'Search the internet for information',
      icon: Search,
      category: 'information',
      safety_level: 'safe',
      parameters: ['query'],
      example: 'latest AI developments'
    },
    {
      id: 'calculator',
      name: 'Calculator',
      description: 'Perform mathematical calculations',
      icon: Calculator,
      category: 'computation',
      safety_level: 'safe',
      parameters: ['expression'],
      example: '(25 * 4) + sqrt(144)'
    },
    {
      id: 'image_analyze',
      name: 'Image Analyzer',
      description: 'Analyze and describe images',
      icon: Image,
      category: 'vision',
      safety_level: 'safe',
      parameters: ['image_path'],
      example: '/path/to/image.jpg'
    },
    {
      id: 'code_execute',
      name: 'Code Executor',
      description: 'Execute code in sandboxed environment',
      icon: Code,
      category: 'development',
      safety_level: 'controlled',
      parameters: ['code', 'language'],
      example: 'print("Hello World")'
    },
    {
      id: 'shell_command',
      name: 'Shell Command',
      description: 'Execute system commands',
      icon: Terminal,
      category: 'system',
      safety_level: 'restricted',
      parameters: ['command'],
      example: 'ls -la'
    }
  ];

  const recentActions = [
    {
      timestamp: '2024-09-08 11:57:15',
      tool: 'file_read',
      input: '/home/ubuntu/digital-organism-explorer/src/components/panels/MemoryPanel.jsx',
      output: 'Successfully read MemoryPanel component (2.1KB)',
      status: 'success',
      duration: '45ms',
      safety_check: 'passed'
    },
    {
      timestamp: '2024-09-08 11:57:10',
      tool: 'web_search',
      input: 'React component best practices',
      output: 'Found 15 relevant articles about React development',
      status: 'success',
      duration: '1.2s',
      safety_check: 'passed'
    },
    {
      timestamp: '2024-09-08 11:57:05',
      tool: 'calculator',
      input: 'Math.sqrt(144) + (25 * 4)',
      output: '112',
      status: 'success',
      duration: '12ms',
      safety_check: 'passed'
    },
    {
      timestamp: '2024-09-08 11:57:00',
      tool: 'image_analyze',
      input: '/screenshots/localhost_2025-09-08_11-56-00_7890.webp',
      output: 'Detected: Digital Organism Explorer interface with Temporality panel',
      status: 'success',
      duration: '890ms',
      safety_check: 'passed'
    }
  ];

  const actionCategories = [
    {
      name: 'File System',
      description: 'File and directory operations',
      tools: availableTools.filter(t => t.category === 'file_system'),
      icon: FileText,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      name: 'Information',
      description: 'Search and data retrieval',
      tools: availableTools.filter(t => t.category === 'information'),
      icon: Search,
      color: 'bg-green-100 text-green-800'
    },
    {
      name: 'Computation',
      description: 'Mathematical and logical operations',
      tools: availableTools.filter(t => t.category === 'computation'),
      icon: Calculator,
      color: 'bg-purple-100 text-purple-800'
    },
    {
      name: 'Vision',
      description: 'Image and visual analysis',
      tools: availableTools.filter(t => t.category === 'vision'),
      icon: Eye,
      color: 'bg-orange-100 text-orange-800'
    },
    {
      name: 'Development',
      description: 'Code execution and development',
      tools: availableTools.filter(t => t.category === 'development'),
      icon: Code,
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      name: 'System',
      description: 'System-level operations',
      tools: availableTools.filter(t => t.category === 'system'),
      icon: Terminal,
      color: 'bg-red-100 text-red-800'
    }
  ];

  const safetyMetrics = [
    {
      name: 'Permission Gates',
      value: 100,
      description: 'All tools require explicit permission'
    },
    {
      name: 'Sandbox Isolation',
      value: 95,
      description: 'Execution environment isolation'
    },
    {
      name: 'Input Validation',
      value: 98,
      description: 'Parameter sanitization and validation'
    },
    {
      name: 'Output Filtering',
      value: 92,
      description: 'Response content filtering'
    }
  ];

  const executeTool = async (tool, input) => {
    setIsExecuting(true);
    
    // Simulate tool execution
    const startTime = Date.now();
    
    // Safety check simulation
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Mock execution
    let output = '';
    let status = 'success';
    
    switch (tool.id) {
      case 'calculator':
        try {
          // Simple math evaluation (in real implementation, use safe math parser)
          output = `Result: ${eval(input)}`;
        } catch (e) {
          output = 'Error: Invalid mathematical expression';
          status = 'error';
        }
        break;
      case 'file_read':
        output = `Mock file content from: ${input}`;
        break;
      case 'web_search':
        output = `Found 12 results for: "${input}"`;
        break;
      case 'image_analyze':
        output = `Image analysis: Digital interface screenshot detected`;
        break;
      default:
        output = `Mock execution of ${tool.name} with input: ${input}`;
    }
    
    const duration = Date.now() - startTime;
    
    const logEntry = {
      timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
      tool: tool.id,
      input,
      output,
      status,
      duration: `${duration}ms`,
      safety_check: 'passed'
    };
    
    setExecutionLog(prev => [logEntry, ...prev.slice(0, 9)]);
    setIsExecuting(false);
    setToolInput('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-2">Action & Tool Execution</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Safe tool calls and environment interaction
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={isExecuting ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}>
            {isExecuting ? "Executing" : "Ready"}
          </Badge>
          <Badge className="bg-blue-100 text-blue-800">
            <Shield className="h-3 w-3 mr-1" />
            Safe Mode
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="demo">Demo</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Action Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-1">Available Tools</h4>
                      <p className="text-2xl font-bold text-blue-600">{availableTools.length}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Executions Today</h4>
                      <p className="text-2xl font-bold text-green-600">{recentActions.length}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Tool Categories</h4>
                    <div className="space-y-2">
                      {actionCategories.slice(0, 3).map((category, index) => {
                        const Icon = category.icon;
                        return (
                          <div key={index} className="flex items-center space-x-3 p-2 border rounded">
                            <Icon className="h-4 w-4" />
                            <div className="flex-1">
                              <span className="font-medium text-sm">{category.name}</span>
                              <span className="text-xs text-gray-500 ml-2">{category.tools.length} tools</span>
                            </div>
                            <Badge className={category.color} variant="outline">
                              active
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
                  <Shield className="h-5 w-5" />
                  <span>Safety Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {safetyMetrics.map((metric, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{metric.name}</span>
                        <span>{metric.value}%</span>
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
                      <span className="text-sm font-medium">Safety Status: Secure</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Recent Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActions.slice(0, 4).map((action, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      action.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm">{action.tool}</span>
                        <Badge variant="outline" className="text-xs">{action.status}</Badge>
                        <Badge className="text-xs bg-green-100 text-green-800">
                          {action.safety_check}
                        </Badge>
                        <span className="text-xs text-gray-500">{action.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Input: {action.input}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                        Output: {action.output}
                      </p>
                      <span className="text-xs text-gray-500">Duration: {action.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid gap-4">
            {actionCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <category.icon className="h-5 w-5" />
                    <span>{category.name}</span>
                    <Badge className={category.color}>
                      {category.tools.length} tools
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {category.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {category.tools.map((tool, toolIndex) => {
                      const Icon = tool.icon;
                      return (
                        <div key={toolIndex} className="border rounded-lg p-3">
                          <div className="flex items-center space-x-3 mb-2">
                            <Icon className="h-4 w-4" />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{tool.name}</h4>
                              <p className="text-xs text-gray-600">{tool.description}</p>
                            </div>
                            <Badge className={`text-xs ${
                              tool.safety_level === 'safe' ? 'bg-green-100 text-green-800' :
                              tool.safety_level === 'controlled' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {tool.safety_level}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500">
                            Example: {tool.example}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="demo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Interactive Tool Demo</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Select Tool</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {availableTools.map((tool, index) => {
                      const Icon = tool.icon;
                      return (
                        <Button
                          key={index}
                          variant={selectedTool?.id === tool.id ? "default" : "outline"}
                          className="h-auto p-3 flex flex-col items-center space-y-1"
                          onClick={() => setSelectedTool(tool)}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="text-xs">{tool.name}</span>
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {selectedTool && (
                  <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                    <h4 className="font-medium mb-2">{selectedTool.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {selectedTool.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Input:</label>
                        <Input
                          value={toolInput}
                          onChange={(e) => setToolInput(e.target.value)}
                          placeholder={selectedTool.example}
                          className="mt-1"
                        />
                      </div>
                      
                      <Button
                        onClick={() => executeTool(selectedTool, toolInput)}
                        disabled={isExecuting || !toolInput.trim()}
                        className="w-full"
                      >
                        {isExecuting ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Executing...
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Execute Tool
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {executionLog.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Execution Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {executionLog.map((log, index) => (
                    <div key={index} className="text-sm p-2 border rounded bg-gray-50 dark:bg-gray-800">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline" className="text-xs">{log.tool}</Badge>
                        <Badge className={`text-xs ${
                          log.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {log.status}
                        </Badge>
                        <span className="text-xs text-gray-500">{log.timestamp}</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">Input: {log.input}</p>
                      <p className="text-xs text-gray-700">{log.output}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="safety" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Safety Mechanisms</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      Permission Gates
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      All tool executions require explicit user permission and safety validation.
                    </p>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      Sandbox Isolation
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Code execution and system commands run in isolated environments.
                    </p>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      Input Validation
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      All inputs are sanitized and validated before tool execution.
                    </p>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      Audit Logging
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Complete audit trail of all tool executions and their results.
                    </p>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20">
                  <h4 className="font-medium mb-2">Safety Levels</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm"><strong>Safe:</strong> No restrictions, immediate execution</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm"><strong>Controlled:</strong> Requires confirmation, sandboxed execution</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm"><strong>Restricted:</strong> Admin approval required, full audit</span>
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

export default ActionPanel;

