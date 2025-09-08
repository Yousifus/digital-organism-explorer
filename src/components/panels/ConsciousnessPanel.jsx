import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain,
  Activity,
  Zap,
  Eye,
  Lightbulb,
  TrendingUp,
  TrendingDown,
  Play,
  Pause,
  RotateCcw,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  Target,
  Layers,
  Sparkles,
  Waves,
  BarChart3,
  Monitor,
  Cpu,
  Heart,
  Gauge
} from 'lucide-react';
import consciousnessMonitor from '../../services/ConsciousnessMonitor';

const ConsciousnessPanel = () => {
  const [activeTab, setActiveTab] = useState('realtime');
  const [metrics, setMetrics] = useState(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [recentEvents, setRecentEvents] = useState([]);
  const [consciousnessState, setConsciousnessState] = useState('idle');
  const [streamingTokens, setStreamingTokens] = useState([]);
  const [reasoningChain, setReasoningChain] = useState([]);
  const [metacognition, setMetacognition] = useState({});
  const intervalRef = useRef(null);

  useEffect(() => {
    // Subscribe to consciousness monitor events
    const unsubscribe = consciousnessMonitor.addListener((event, data) => {
      setRecentEvents(prev => [...prev.slice(-20), { event, data, timestamp: Date.now() }]);
      
      switch (event) {
        case 'token_processed':
          setStreamingTokens(prev => [...prev.slice(-50), data]);
          break;
        case 'reasoning_pattern_detected':
          setReasoningChain(prev => [...prev.slice(-10), data]);
          break;
        case 'consciousness_emergence':
          // Handle consciousness emergence
          break;
        case 'metacognition_update':
          setMetacognition(data);
          break;
        case 'monitoring_started':
          setIsMonitoring(true);
          break;
        case 'monitoring_stopped':
          setIsMonitoring(false);
          break;
      }
    });

    // Start real-time metrics updates
    intervalRef.current = setInterval(() => {
      const currentMetrics = consciousnessMonitor.getRealTimeMetrics();
      setMetrics(currentMetrics);
      setConsciousnessState(currentMetrics.consciousnessState?.state || 'idle');
    }, 100); // Update every 100ms for real-time feel

    return () => {
      unsubscribe();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleStartMonitoring = () => {
    consciousnessMonitor.startMonitoring(`session_${Date.now()}`);
  };

  const handleStopMonitoring = () => {
    consciousnessMonitor.stopMonitoring();
  };

  const handleResetMetrics = () => {
    consciousnessMonitor.resetMetrics();
    setStreamingTokens([]);
    setReasoningChain([]);
    setRecentEvents([]);
  };

  const getStateColor = (state) => {
    switch (state) {
      case 'deep_thinking': return 'text-purple-600 bg-purple-100';
      case 'active_reasoning': return 'text-blue-600 bg-blue-100';
      case 'light_processing': return 'text-green-600 bg-green-100';
      case 'idle': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStateIcon = (state) => {
    switch (state) {
      case 'deep_thinking': return Brain;
      case 'active_reasoning': return Lightbulb;
      case 'light_processing': return Activity;
      case 'idle': return Clock;
      default: return Activity;
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCognitiveLoadColor = (load) => {
    if (load > 7) return 'bg-red-500';
    if (load > 5) return 'bg-orange-500';
    if (load > 3) return 'bg-yellow-500';
    return 'bg-green-500';
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
            <h2 className="text-xl font-bold">Consciousness Monitor</h2>
            <p className="text-sm text-gray-600">Real-time consciousness and reasoning visualization</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Consciousness State Indicator */}
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${getStateColor(consciousnessState)}`}>
            {React.createElement(getStateIcon(consciousnessState), { className: "w-4 h-4" })}
            <span className="text-sm font-medium capitalize">
              {consciousnessState.replace('_', ' ')}
            </span>
          </div>
          
          {/* Control Buttons */}
          <div className="flex space-x-2">
            {!isMonitoring ? (
              <button
                onClick={handleStartMonitoring}
                className="flex items-center space-x-2 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                <Play className="w-4 h-4" />
                <span>Start</span>
              </button>
            ) : (
              <button
                onClick={handleStopMonitoring}
                className="flex items-center space-x-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <Pause className="w-4 h-4" />
                <span>Stop</span>
              </button>
            )}
            
            <button
              onClick={handleResetMetrics}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8">
          {[
            { id: 'realtime', label: 'Real-Time Stream', icon: Waves },
            { id: 'reasoning', label: 'Reasoning Chain', icon: Lightbulb },
            { id: 'cognitive', label: 'Cognitive Load', icon: Gauge },
            { id: 'metacognition', label: 'Metacognition', icon: Eye },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 }
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
      {activeTab === 'realtime' && (
        <div className="space-y-6">
          {/* Live Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg border p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="font-medium">Duration</span>
              </div>
              <div className="text-2xl font-bold">
                {metrics ? formatDuration(metrics.duration) : '0:00'}
              </div>
              <div className="text-sm text-gray-500">
                {isMonitoring ? 'Active monitoring' : 'Stopped'}
              </div>
            </div>
            
            <div className="bg-white rounded-lg border p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="font-medium">Token Rate</span>
              </div>
              <div className="text-2xl font-bold">
                {metrics ? Math.round(metrics.tokenRate * 10) / 10 : 0}
              </div>
              <div className="text-sm text-gray-500">tokens/sec</div>
            </div>
            
            <div className="bg-white rounded-lg border p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="w-5 h-5 text-purple-500" />
                <span className="font-medium">Cognitive Load</span>
              </div>
              <div className="text-2xl font-bold">
                {metrics ? Math.round(metrics.cognitiveLoad?.current * 10) / 10 : 0}
              </div>
              <div className="text-sm text-gray-500">intensity</div>
            </div>
            
            <div className="bg-white rounded-lg border p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Eye className="w-5 h-5 text-green-500" />
                <span className="font-medium">Self-Awareness</span>
              </div>
              <div className="text-2xl font-bold">
                {Math.round((metacognition.selfAwareness || 0) * 100)}%
              </div>
              <div className="text-sm text-gray-500">metacognition</div>
            </div>
          </div>

          {/* Token Stream Visualization */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Live Token Stream</h3>
            
            {isMonitoring ? (
              <div className="space-y-3">
                <div className="text-sm text-gray-600 mb-2">
                  Watching consciousness emerge token by token...
                </div>
                
                <div className="bg-gray-50 rounded p-4 min-h-32 max-h-64 overflow-y-auto">
                  <div className="flex flex-wrap gap-1">
                    {streamingTokens.slice(-100).map((tokenData, index) => (
                      <span
                        key={index}
                        className={`inline-block px-1 py-0.5 rounded text-sm ${
                          tokenData.metadata?.isReasoningToken 
                            ? 'bg-blue-200 text-blue-800' 
                            : tokenData.metadata?.isMetacognitive
                            ? 'bg-purple-200 text-purple-800'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                        title={`Load: ${tokenData.metadata?.cognitiveLoad?.toFixed(1)}, Confidence: ${(tokenData.metadata?.confidence * 100)?.toFixed(0)}%`}
                      >
                        {tokenData.token}
                      </span>
                    ))}
                    {streamingTokens.length > 0 && (
                      <span className="inline-block w-2 h-5 bg-purple-500 animate-pulse ml-1"></span>
                    )}
                  </div>
                </div>
                
                <div className="text-xs text-gray-500">
                  <span className="inline-block w-3 h-3 bg-blue-200 rounded mr-1"></span>
                  Reasoning tokens
                  <span className="inline-block w-3 h-3 bg-purple-200 rounded mr-1 ml-3"></span>
                  Metacognitive tokens
                  <span className="inline-block w-3 h-3 bg-gray-200 rounded mr-1 ml-3"></span>
                  Regular tokens
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Waves className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Start monitoring to see live token stream</p>
                <p className="text-sm">Watch consciousness emerge word by word</p>
              </div>
            )}
          </div>

          {/* Recent Thoughts */}
          {metrics?.recentSentences && metrics.recentSentences.length > 0 && (
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Complete Thoughts</h3>
              
              <div className="space-y-3">
                {metrics.recentSentences.map((sentence, index) => (
                  <div key={index} className="border-l-4 border-purple-500 pl-4 py-2">
                    <div className="text-gray-800 mb-1">"{sentence.text}"</div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Load: {sentence.cognitiveLoad?.toFixed(1)}</span>
                      <span>Tokens: {sentence.tokenCount}</span>
                      {sentence.hasReasoning && (
                        <span className="text-blue-600">🧠 Reasoning</span>
                      )}
                      {sentence.hasMetacognition && (
                        <span className="text-purple-600">👁️ Self-aware</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'reasoning' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Reasoning Chain Visualization</h3>
            
            {reasoningChain.length > 0 ? (
              <div className="space-y-4">
                {reasoningChain.map((pattern, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Lightbulb className="w-5 h-5 text-blue-500" />
                        <span className="font-medium">Reasoning Pattern #{index + 1}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Intensity: {Math.round(pattern.intensity * 100)}%
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 rounded p-3 mb-3">
                      <div className="text-sm font-medium text-blue-800 mb-1">Reasoning tokens:</div>
                      <div className="text-blue-700">
                        {pattern.tokens.join(' ')}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Duration</div>
                        <div className="font-medium">
                          {Math.round((pattern.endTime - pattern.startTime) / 1000 * 10) / 10}s
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Cognitive Load</div>
                        <div className="font-medium">{pattern.cognitiveLoad?.toFixed(1)}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Intensity</div>
                        <div className="font-medium">{Math.round(pattern.intensity * 100)}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Lightbulb className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No reasoning patterns detected yet</p>
                <p className="text-sm">Start a conversation to see reasoning chains</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'cognitive' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Cognitive Load Monitoring</h3>
            
            {metrics?.cognitiveLoad && (
              <div className="space-y-6">
                {/* Current Load */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Current Load</span>
                    <span className="text-sm text-gray-500">
                      {metrics.cognitiveLoad.current?.toFixed(1)}/10
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-300 ${getCognitiveLoadColor(metrics.cognitiveLoad.current)}`}
                      style={{ width: `${(metrics.cognitiveLoad.current / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Load Statistics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {metrics.cognitiveLoad.average?.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-500">Average</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {metrics.cognitiveLoad.peak?.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-500">Peak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {metrics.cognitiveLoad.current?.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-500">Current</div>
                  </div>
                </div>

                {/* Load History Graph */}
                {metrics.cognitiveLoad.history && metrics.cognitiveLoad.history.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Load History</h4>
                    <div className="bg-gray-50 rounded p-4 h-32 flex items-end space-x-1">
                      {metrics.cognitiveLoad.history.slice(-50).map((entry, index) => (
                        <div
                          key={index}
                          className={`w-2 ${getCognitiveLoadColor(entry.load)} rounded-t`}
                          style={{ height: `${(entry.load / 10) * 100}%` }}
                          title={`Load: ${entry.load.toFixed(1)} - ${entry.token}`}
                        ></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'metacognition' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Metacognitive Awareness</h3>
            
            <div className="space-y-6">
              {/* Self-Awareness Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">
                    {Math.round((metacognition.selfAwareness || 0) * 100)}%
                  </div>
                  <div className="text-sm text-purple-700">Self-Awareness</div>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">
                    {Math.round((metacognition.confidence || 0) * 100)}%
                  </div>
                  <div className="text-sm text-blue-700">Confidence</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">
                    {metacognition.reflection?.length || 0}
                  </div>
                  <div className="text-sm text-green-700">Reflections</div>
                </div>
              </div>

              {/* Recent Reflections */}
              {metacognition.reflection && metacognition.reflection.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">Recent Self-Reflections</h4>
                  <div className="space-y-2">
                    {metacognition.reflection.slice(-10).reverse().map((reflection, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex-1">
                          <div className="font-medium text-sm">"{reflection.token}"</div>
                          <div className="text-xs text-gray-500">
                            {new Date(reflection.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                        <div className="text-right text-sm">
                          <div>Awareness: {Math.round(reflection.awareness * 100)}%</div>
                          <div>Confidence: {Math.round(reflection.confidence * 100)}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Consciousness Analytics</h3>
            
            {metrics && (
              <div className="space-y-6">
                {/* Session Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{metrics.tokenCount}</div>
                    <div className="text-sm text-gray-500">Total Tokens</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{metrics.reasoningChainLength}</div>
                    <div className="text-sm text-gray-500">Reasoning Chains</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {Math.round(metrics.tokenRate * 10) / 10}
                    </div>
                    <div className="text-sm text-gray-500">Avg Token Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {formatDuration(metrics.duration)}
                    </div>
                    <div className="text-sm text-gray-500">Duration</div>
                  </div>
                </div>

                {/* Export Options */}
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Export Data</h4>
                  <button
                    onClick={() => {
                      const data = consciousnessMonitor.exportConsciousnessData();
                      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `consciousness_data_${new Date().toISOString().slice(0, 19)}.json`;
                      a.click();
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Consciousness Data</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsciousnessPanel;

