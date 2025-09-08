import React, { useState, useEffect } from 'react';
import { 
  Brain,
  Download,
  Upload,
  Trash2,
  Settings,
  Zap,
  Clock,
  Target,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  Cpu,
  Activity,
  BarChart3,
  Layers,
  Gauge,
  RefreshCw,
  Star,
  Award,
  Lightbulb
} from 'lucide-react';
import modelManagementService from '../../services/ModelManagementService';

const ModelManagementPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [models, setModels] = useState({});
  const [selectedModel, setSelectedModel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [taskType, setTaskType] = useState('conversation');

  useEffect(() => {
    // Subscribe to model management updates
    const unsubscribe = modelManagementService.addListener((newModels) => {
      setModels(newModels);
      if (!selectedModel && newModels.current) {
        setSelectedModel(newModels.current);
      }
    });

    // Initial models load
    const initialModels = modelManagementService.getModels();
    setModels(initialModels);
    if (initialModels.current) {
      setSelectedModel(initialModels.current);
    }

    return unsubscribe;
  }, [selectedModel]);

  const handleLoadModel = async (modelId) => {
    setIsLoading(true);
    try {
      await modelManagementService.loadModel(modelId);
    } catch (error) {
      console.error('Failed to load model:', error);
    }
    setIsLoading(false);
  };

  const handleUnloadModel = async (modelId) => {
    setIsLoading(true);
    try {
      await modelManagementService.unloadModel(modelId);
    } catch (error) {
      console.error('Failed to unload model:', error);
    }
    setIsLoading(false);
  };

  const handleSwitchModel = async (modelId) => {
    setIsLoading(true);
    try {
      await modelManagementService.switchModel(modelId, true);
    } catch (error) {
      console.error('Failed to switch model:', error);
    }
    setIsLoading(false);
  };

  const handleOptimizeForTask = async () => {
    setIsLoading(true);
    try {
      await modelManagementService.optimizeForTask(taskType);
    } catch (error) {
      console.error('Failed to optimize for task:', error);
    }
    setIsLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'loaded': return 'text-green-500';
      case 'loading': return 'text-blue-500';
      case 'available': return 'text-gray-500';
      case 'failed': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      loaded: { color: 'bg-green-500', text: 'Loaded' },
      loading: { color: 'bg-blue-500', text: 'Loading' },
      available: { color: 'bg-gray-500', text: 'Available' },
      failed: { color: 'bg-red-500', text: 'Failed' }
    };
    
    const badge = badges[status] || badges.available;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded text-white text-xs ${badge.color}`}>
        {badge.text}
      </span>
    );
  };

  const getPerformanceScore = (performance) => {
    if (!performance) return 0;
    
    // Calculate overall score based on metrics
    const tokenScore = Math.min(100, (performance.tokenRate / 50) * 25);
    const latencyScore = Math.max(0, 25 - (performance.latency / 40));
    const accuracyScore = (performance.accuracy || 0) * 25;
    const efficiencyScore = (performance.efficiency || 0) * 25;
    
    return Math.round(tokenScore + latencyScore + accuracyScore + efficiencyScore);
  };

  const formatUptime = (loadedAt) => {
    if (!loadedAt) return 'N/A';
    
    const now = new Date();
    const loaded = new Date(loadedAt);
    const diffMs = now - loaded;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    
    if (diffHours > 0) return `${diffHours}h ${diffMins % 60}m`;
    return `${diffMins}m`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Brain className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Model Management</h2>
            <p className="text-sm text-gray-600">Dynamic AI model loading, switching, and optimization</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-sm font-medium">
              {models.current ? models.current.name : 'No Model Selected'}
            </div>
            <div className="text-xs text-gray-500">
              {models.loaded?.length || 0} loaded • {models.available?.length || 0} available
            </div>
          </div>
          
          <button
            onClick={() => modelManagementService.refreshModelList()}
            className="flex items-center space-x-2 px-3 py-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: Gauge },
            { id: 'loaded', label: 'Loaded Models', icon: CheckCircle },
            { id: 'available', label: 'Available Models', icon: Download },
            { id: 'performance', label: 'Performance', icon: BarChart3 },
            { id: 'optimization', label: 'Optimization', icon: Target }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Current Model */}
          {models.current && (
            <div className="bg-white rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Current Active Model</h3>
                {getStatusBadge('loaded')}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-2xl font-bold text-purple-600 mb-1">
                        {models.current.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {models.current.size} • {models.current.type} model
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>Uptime: {formatUptime(models.current.loadedAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Activity className="w-4 h-4 text-gray-400" />
                        <span>Score: {getPerformanceScore(models.current.performance)}/100</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-gray-700 mb-2">Performance Metrics</div>
                    
                    {models.current.performance && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Token Rate</span>
                          <span className="font-medium">{Math.round(models.current.performance.tokenRate)} tok/s</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Latency</span>
                          <span className="font-medium">{Math.round(models.current.performance.latency)}ms</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Accuracy</span>
                          <span className="font-medium">{Math.round(models.current.performance.accuracy * 100)}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Efficiency</span>
                          <span className="font-medium">{Math.round(models.current.performance.efficiency * 100)}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">Task Optimization</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Automatically select and configure the best model for your task
                </p>
                <div className="flex space-x-2">
                  <select
                    value={taskType}
                    onChange={(e) => setTaskType(e.target.value)}
                    className="flex-1 px-2 py-1 border rounded text-sm"
                  >
                    <option value="conversation">Conversation</option>
                    <option value="coding">Coding</option>
                    <option value="reasoning">Reasoning</option>
                    <option value="creative">Creative</option>
                    <option value="analysis">Analysis</option>
                    <option value="math">Math</option>
                  </select>
                  <button
                    onClick={handleOptimizeForTask}
                    disabled={isLoading}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50"
                  >
                    Optimize
                  </button>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <RefreshCw className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Model Discovery</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Scan for new models and update availability
                </p>
                <button
                  onClick={() => modelManagementService.refreshModelList()}
                  className="w-full px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                >
                  Refresh Models
                </button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-purple-500" />
                  <span className="font-medium">Performance Analysis</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Compare model performance and efficiency
                </p>
                <button
                  onClick={() => setActiveTab('performance')}
                  className="w-full px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
                >
                  View Analysis
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          {models.history && models.history.length > 0 && (
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              
              <div className="space-y-3">
                {models.history.slice(-5).reverse().map((event, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                    <div className={`w-2 h-2 rounded-full ${event.success ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        {event.action === 'load' && `Loaded ${event.modelId}`}
                        {event.action === 'unload' && `Unloaded ${event.modelId}`}
                        {event.action === 'switch' && `Switched to ${event.toModelId}`}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(event.timestamp).toLocaleTimeString()}
                        {event.seamless && ' • Seamless transition'}
                      </div>
                    </div>
                    {event.success ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'loaded' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Loaded Models</h3>
            
            {models.loaded && models.loaded.length > 0 ? (
              <div className="space-y-4">
                {models.loaded.map((model) => (
                  <div key={model.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          models.current?.id === model.id ? 'bg-green-500' : 'bg-gray-300'
                        }`}></div>
                        <div>
                          <div className="font-medium">{model.name}</div>
                          <div className="text-sm text-gray-500">
                            {model.size} • {model.type} • Loaded {formatUptime(model.loadedAt)} ago
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="text-right text-sm">
                          <div className="font-medium">Score: {getPerformanceScore(model.performance)}/100</div>
                          <div className="text-gray-500">
                            {Math.round(model.performance?.tokenRate || 0)} tok/s
                          </div>
                        </div>
                        
                        {models.current?.id !== model.id && (
                          <button
                            onClick={() => handleSwitchModel(model.id)}
                            disabled={isLoading}
                            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50"
                          >
                            Switch
                          </button>
                        )}
                        
                        <button
                          onClick={() => handleUnloadModel(model.id)}
                          disabled={isLoading || models.current?.id === model.id}
                          className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 disabled:opacity-50"
                        >
                          Unload
                        </button>
                      </div>
                    </div>
                    
                    {model.performance && (
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Token Rate</div>
                          <div className="font-medium">{Math.round(model.performance.tokenRate)} tok/s</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Latency</div>
                          <div className="font-medium">{Math.round(model.performance.latency)}ms</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Accuracy</div>
                          <div className="font-medium">{Math.round(model.performance.accuracy * 100)}%</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Efficiency</div>
                          <div className="font-medium">{Math.round(model.performance.efficiency * 100)}%</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Brain className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No models currently loaded</p>
                <p className="text-sm">Load models from the Available Models tab</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'available' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Available Models</h3>
            
            {models.available && models.available.length > 0 ? (
              <div className="space-y-4">
                {models.available.map((model) => (
                  <div key={model.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-medium">{model.name}</div>
                        <div className="text-sm text-gray-500">
                          {model.size} • {model.type} model
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="text-right text-sm">
                          <div className="font-medium">{model.downloadSize}</div>
                          <div className="text-gray-500">{model.estimatedLoadTime}</div>
                        </div>
                        
                        <button
                          onClick={() => handleLoadModel(model.id)}
                          disabled={isLoading}
                          className="flex items-center space-x-2 px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 disabled:opacity-50"
                        >
                          <Download className="w-4 h-4" />
                          <span>Load</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <div className="mb-2">
                        <span className="font-medium">Best for:</span> {model.type} tasks
                      </div>
                      <div>
                        <span className="font-medium">Estimated performance:</span> 
                        {model.size.includes('3') && ' Fast, efficient for basic tasks'}
                        {model.size.includes('7') && ' Balanced performance and quality'}
                        {model.size.includes('13') && ' High quality, slower inference'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Download className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No additional models available</p>
                <p className="text-sm">Check LM Studio for more models</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Performance Comparison</h3>
            
            {models.loaded && models.loaded.length > 0 ? (
              <div className="space-y-6">
                {/* Performance Rankings */}
                <div>
                  <h4 className="font-medium mb-3">Model Rankings</h4>
                  <div className="space-y-2">
                    {models.loaded
                      .sort((a, b) => getPerformanceScore(b.performance) - getPerformanceScore(a.performance))
                      .map((model, index) => (
                        <div key={model.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <div className="flex items-center space-x-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                              index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-medium">{model.name}</div>
                              <div className="text-sm text-gray-500">{model.size}</div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-bold text-lg">{getPerformanceScore(model.performance)}</div>
                            <div className="text-sm text-gray-500">Overall Score</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Detailed Metrics */}
                <div>
                  <h4 className="font-medium mb-3">Detailed Metrics</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Model</th>
                          <th className="text-right py-2">Token Rate</th>
                          <th className="text-right py-2">Latency</th>
                          <th className="text-right py-2">Accuracy</th>
                          <th className="text-right py-2">Efficiency</th>
                          <th className="text-right py-2">Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {models.loaded.map((model) => (
                          <tr key={model.id} className="border-b">
                            <td className="py-2">
                              <div className="font-medium">{model.name}</div>
                              <div className="text-gray-500">{model.size}</div>
                            </td>
                            <td className="text-right py-2">
                              {Math.round(model.performance?.tokenRate || 0)} tok/s
                            </td>
                            <td className="text-right py-2">
                              {Math.round(model.performance?.latency || 0)}ms
                            </td>
                            <td className="text-right py-2">
                              {Math.round((model.performance?.accuracy || 0) * 100)}%
                            </td>
                            <td className="text-right py-2">
                              {Math.round((model.performance?.efficiency || 0) * 100)}%
                            </td>
                            <td className="text-right py-2 font-bold">
                              {getPerformanceScore(model.performance)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <BarChart3 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No performance data available</p>
                <p className="text-sm">Load models to see performance metrics</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'optimization' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Task Optimization</h3>
            
            <div className="space-y-6">
              {/* Task-Based Recommendations */}
              <div>
                <h4 className="font-medium mb-3">Recommended Models by Task</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { task: 'conversation', icon: '💬', models: ['Llama 3.2', 'Mistral 7B'] },
                    { task: 'coding', icon: '💻', models: ['DeepSeek Coder', 'CodeLlama'] },
                    { task: 'reasoning', icon: '🧠', models: ['Qwen 2.5', 'DeepSeek'] },
                    { task: 'creative', icon: '🎨', models: ['Llama 3.2', 'Mistral'] },
                    { task: 'analysis', icon: '📊', models: ['Qwen 2.5', 'DeepSeek'] },
                    { task: 'math', icon: '🔢', models: ['DeepSeek', 'Qwen 2.5'] }
                  ].map((category) => (
                    <div key={category.task} className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg">{category.icon}</span>
                        <span className="font-medium capitalize">{category.task}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        Best models: {category.models.join(', ')}
                      </div>
                      <button
                        onClick={() => {
                          setTaskType(category.task);
                          handleOptimizeForTask();
                        }}
                        disabled={isLoading}
                        className="w-full px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50"
                      >
                        Optimize for {category.task}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optimization Tips */}
              <div>
                <h4 className="font-medium mb-3">Optimization Tips</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded">
                    <Lightbulb className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-blue-900">Model Size vs Speed</div>
                      <div className="text-sm text-blue-700">
                        Smaller models (3B) are faster but less capable. Larger models (13B+) are more capable but slower.
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded">
                    <Target className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-green-900">Task-Specific Models</div>
                      <div className="text-sm text-green-700">
                        Use specialized models like CodeLlama for coding or DeepSeek for reasoning tasks.
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded">
                    <Settings className="w-5 h-5 text-purple-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-purple-900">Configuration Tuning</div>
                      <div className="text-sm text-purple-700">
                        Adjust temperature, top-p, and other parameters based on your specific use case.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelManagementPanel;

