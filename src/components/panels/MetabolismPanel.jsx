import React, { useState, useEffect } from 'react';
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
  BarChart3,
  Brain,
  Shield
} from 'lucide-react';
import metabolismService from '../../services/MetabolismService';

const MetabolismPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [metrics, setMetrics] = useState({});
  const [health, setHealth] = useState({});
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [performanceHistory, setPerformanceHistory] = useState([]);

  useEffect(() => {
    // Subscribe to metabolism service updates
    const unsubscribe = metabolismService.addListener((newMetrics) => {
      setMetrics(newMetrics);
      setHealth(newMetrics.health || {});
      setIsMonitoring(newMetrics.isMonitoring);
      setPerformanceHistory(newMetrics.history || []);
    });

    // Initial metrics load
    const initialMetrics = metabolismService.getMetrics();
    setMetrics(initialMetrics);
    setHealth(initialMetrics.health || {});
    setIsMonitoring(initialMetrics.isMonitoring);

    return unsubscribe;
  }, []);

  const getStatusColor = (value, thresholds) => {
    if (value >= thresholds.critical) return 'text-red-500';
    if (value >= thresholds.high) return 'text-orange-500';
    if (value >= thresholds.normal) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getStatusBadge = (status) => {
    const badges = {
      healthy: { color: 'bg-green-500', icon: CheckCircle, text: 'Healthy' },
      warning: { color: 'bg-yellow-500', icon: AlertTriangle, text: 'Warning' },
      critical: { color: 'bg-red-500', icon: AlertTriangle, text: 'Critical' }
    };
    
    const badge = badges[status] || badges.healthy;
    const Icon = badge.icon;
    
    return (
      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded text-white text-xs ${badge.color}`}>
        <Icon className="w-3 h-3" />
        <span>{badge.text}</span>
      </div>
    );
  };

  const getMetabolicStateInfo = (state) => {
    const states = {
      resting: { 
        color: 'text-blue-500', 
        icon: Snowflake, 
        description: 'Conservation mode - minimal energy consumption',
        range: '20-40 tok/s, 30-50% CPU'
      },
      active: { 
        color: 'text-green-500', 
        icon: Activity, 
        description: 'Normal operation - balanced performance',
        range: '40-70 tok/s, 50-80% CPU'
      },
      intensive: { 
        color: 'text-orange-500', 
        icon: Flame, 
        description: 'High performance - maximum throughput',
        range: '70-100 tok/s, 80-95% CPU'
      },
      stressed: { 
        color: 'text-red-500', 
        icon: AlertTriangle, 
        description: 'Emergency mode - system under stress',
        range: '10-30 tok/s, 95-100% CPU'
      }
    };
    
    return states[state] || states.active;
  };

  const formatUptime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  const toggleMonitoring = () => {
    if (isMonitoring) {
      metabolismService.stopMonitoring();
    } else {
      metabolismService.startMonitoring();
    }
  };

  const stateInfo = getMetabolicStateInfo(metrics.metabolicState);
  const StateIcon = stateInfo.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Heart className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Digital Metabolism</h2>
            <p className="text-sm text-gray-600">Real-time resource monitoring and optimization</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {getStatusBadge(health.status)}
          <button
            onClick={toggleMonitoring}
            className={`flex items-center space-x-2 px-3 py-2 rounded text-sm font-medium ${
              isMonitoring 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {isMonitoring ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isMonitoring ? 'Pause' : 'Start'} Monitoring</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: Gauge },
            { id: 'resources', label: 'Resources', icon: Cpu },
            { id: 'performance', label: 'Performance', icon: TrendingUp },
            { id: 'health', label: 'Health', icon: Heart },
            { id: 'optimization', label: 'Optimization', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
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
          {/* Current State */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Current Metabolic State</h3>
              <div className="flex items-center space-x-2">
                <StateIcon className={`w-5 h-5 ${stateInfo.color}`} />
                <span className={`font-medium ${stateInfo.color}`}>
                  {(metrics.metabolicState || 'active').charAt(0).toUpperCase() + (metrics.metabolicState || 'active').slice(1)}
                </span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{stateInfo.description}</p>
            <p className="text-sm text-gray-500">{stateInfo.range}</p>
            
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="text-2xl font-bold">{metrics.tokenRate || 0}</span>
                  <span className="text-sm text-gray-500">tok/s</span>
                </div>
                <p className="text-xs text-gray-500">Token Rate</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Cpu className="w-4 h-4 text-blue-500" />
                  <span className="text-2xl font-bold">{Math.round(metrics.cpuUsage || 0)}</span>
                  <span className="text-sm text-gray-500">%</span>
                </div>
                <p className="text-xs text-gray-500">CPU Usage</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Thermometer className="w-4 h-4 text-red-500" />
                  <span className="text-2xl font-bold">{Math.round(metrics.cpuTemperature || 0)}</span>
                  <span className="text-sm text-gray-500">°C</span>
                </div>
                <p className="text-xs text-gray-500">Temperature</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Battery className="w-4 h-4 text-green-500" />
                  <span className="text-2xl font-bold">{Math.round(metrics.powerConsumption || 0)}</span>
                  <span className="text-sm text-gray-500">W</span>
                </div>
                <p className="text-xs text-gray-500">Power Draw</p>
              </div>
            </div>
          </div>

          {/* Health Score */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">System Health</h3>
              <div className="text-2xl font-bold text-green-600">{health.score || 0}%</div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Efficiency</span>
                  <span>{metrics.efficiency || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${metrics.efficiency || 0}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Stability</span>
                  <span>{metrics.stability || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${metrics.stability || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'resources' && (
        <div className="space-y-6">
          {/* Resource Usage */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Resource Utilization</h3>
            
            <div className="space-y-4">
              {[
                { label: 'CPU Usage', value: metrics.cpuUsage || 0, icon: Cpu, color: 'blue', unit: '%' },
                { label: 'GPU Usage', value: metrics.gpuUsage || 0, icon: Activity, color: 'purple', unit: '%' },
                { label: 'Memory Usage', value: metrics.memoryUsage || 0, icon: MemoryStick, color: 'green', unit: '%' },
                { label: 'VRAM Usage', value: metrics.vramUsage || 0, icon: HardDrive, color: 'orange', unit: '%' }
              ].map(resource => {
                const Icon = resource.icon;
                return (
                  <div key={resource.label}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon className={`w-4 h-4 text-${resource.color}-500`} />
                        <span className="text-sm font-medium">{resource.label}</span>
                      </div>
                      <span className="text-sm font-bold">{Math.round(resource.value)}{resource.unit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`bg-${resource.color}-500 h-3 rounded-full transition-all duration-300`}
                        style={{ width: `${Math.min(100, resource.value)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Temperature Monitoring */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Temperature Monitoring</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Cpu className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">CPU Temperature</span>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {Math.round(metrics.cpuTemperature || 0)}°C
                </div>
                <div className="text-xs text-gray-500">
                  {metrics.cpuTemperature > 80 ? 'High' : metrics.cpuTemperature > 60 ? 'Normal' : 'Cool'}
                </div>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Activity className="w-5 h-5 text-purple-500" />
                  <span className="font-medium">GPU Temperature</span>
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {Math.round(metrics.gpuTemperature || 0)}°C
                </div>
                <div className="text-xs text-gray-500">
                  {metrics.gpuTemperature > 85 ? 'High' : metrics.gpuTemperature > 65 ? 'Normal' : 'Cool'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="space-y-6">
          {/* Performance Metrics */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Inference Speed</span>
                </div>
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {Math.round(metrics.inferenceSpeed || 0)} tok/s
                </div>
                <div className="text-xs text-gray-500">Current throughput</div>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">Latency</span>
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {Math.round(metrics.latency || 0)}ms
                </div>
                <div className="text-xs text-gray-500">Response time</div>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium">Token Efficiency</span>
                </div>
                <div className="text-2xl font-bold text-yellow-600 mb-1">
                  {(metrics.tokenEfficiency || 0).toFixed(3)}
                </div>
                <div className="text-xs text-gray-500">Tokens per watt</div>
              </div>
            </div>
          </div>

          {/* Performance History */}
          {performanceHistory.length > 0 && (
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Performance History</h3>
              <div className="text-sm text-gray-500 mb-4">
                Last {performanceHistory.length} measurements (live updates every 1.5s)
              </div>
              
              {/* Simple performance visualization */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Token Rate Trend</span>
                    <span>Current: {metrics.tokenRate || 0} tok/s</span>
                  </div>
                  <div className="flex items-end space-x-1 h-16 bg-gray-50 rounded p-2">
                    {performanceHistory.slice(-20).map((point, index) => (
                      <div
                        key={index}
                        className="bg-yellow-500 rounded-t"
                        style={{
                          height: `${Math.max(2, (point.tokenRate / 100) * 100)}%`,
                          width: '4px'
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>CPU Usage Trend</span>
                    <span>Current: {Math.round(metrics.cpuUsage || 0)}%</span>
                  </div>
                  <div className="flex items-end space-x-1 h-16 bg-gray-50 rounded p-2">
                    {performanceHistory.slice(-20).map((point, index) => (
                      <div
                        key={index}
                        className="bg-blue-500 rounded-t"
                        style={{
                          height: `${Math.max(2, point.cpuUsage)}%`,
                          width: '4px'
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'health' && (
        <div className="space-y-6">
          {/* Health Assessment */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Health Assessment</h3>
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-1">{health.score || 0}%</div>
                <div className="text-sm text-gray-500">Overall Health Score</div>
              </div>
              {getStatusBadge(health.status)}
            </div>

            {/* Issues and Warnings */}
            {health.issues && health.issues.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-red-600 mb-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Critical Issues
                </h4>
                <ul className="space-y-1">
                  {health.issues.map((issue, index) => (
                    <li key={index} className="text-sm text-red-600 flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {health.warnings && health.warnings.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-yellow-600 mb-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Warnings
                </h4>
                <ul className="space-y-1">
                  {health.warnings.map((warning, index) => (
                    <li key={index} className="text-sm text-yellow-600 flex items-center">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(!health.issues || health.issues.length === 0) && (!health.warnings || health.warnings.length === 0) && (
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>All systems operating normally</span>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'optimization' && (
        <div className="space-y-6">
          {/* Optimization Recommendations */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Optimization Recommendations</h3>
            
            {health.recommendations && health.recommendations.length > 0 ? (
              <div className="space-y-3">
                {health.recommendations.map((rec, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium capitalize">{rec.type} Optimization</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        rec.severity === 'critical' ? 'bg-red-100 text-red-700' :
                        rec.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {rec.severity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{rec.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Target className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>System is running optimally</p>
                <p className="text-sm">No optimization recommendations at this time</p>
              </div>
            )}
          </div>

          {/* Monitoring Controls */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Monitoring Controls</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Real-time Monitoring</div>
                  <div className="text-sm text-gray-500">
                    {isMonitoring ? 'Active - updating every 1.5 seconds' : 'Paused - click to resume'}
                  </div>
                </div>
                <button
                  onClick={toggleMonitoring}
                  className={`flex items-center space-x-2 px-4 py-2 rounded font-medium ${
                    isMonitoring 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {isMonitoring ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isMonitoring ? 'Pause' : 'Resume'}</span>
                </button>
              </div>
              
              <div className="pt-4 border-t">
                <div className="text-sm text-gray-500 space-y-1">
                  <div>• Monitoring includes real-time resource usage tracking</div>
                  <div>• Performance history is maintained for trend analysis</div>
                  <div>• Health assessments update automatically</div>
                  <div>• Optimization recommendations are generated based on current metrics</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MetabolismPanel;

