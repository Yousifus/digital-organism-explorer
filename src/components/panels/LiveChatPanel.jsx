import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Bot, User, Zap, Activity, Wifi, WifiOff, Loader2, Brain, Database } from 'lucide-react';
import lmStudioService from '../../services/LMStudioClient';
import memoryService from '../../services/MemoryService';

const LiveChatPanel = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [currentModel, setCurrentModel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [availableModels, setAvailableModels] = useState({ loaded: [], available: [] });
  const [selectedModel, setSelectedModel] = useState('');
  const [metrics, setMetrics] = useState({});
  const [memoryStats, setMemoryStats] = useState({});
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Subscribe to LM Studio service updates
    const unsubscribe = lmStudioService.addListener((status) => {
      setIsConnected(status.isConnected);
      setConnectionStatus(status.connectionStatus);
      setCurrentModel(status.currentModel);
    });

    // Subscribe to memory service updates
    const unsubscribeMemory = memoryService.addListener((stats) => {
      setMemoryStats(stats);
    });

    // Load conversation history from memory
    const loadConversationHistory = () => {
      const history = memoryService.conversationHistory;
      const formattedMessages = [];
      
      history.forEach(turn => {
        formattedMessages.push({
          id: `user_${turn.id}`,
          type: 'user',
          content: turn.userMessage,
          timestamp: turn.timestamp
        });
        
        formattedMessages.push({
          id: `ai_${turn.id}`,
          type: 'ai',
          content: turn.aiResponse,
          timestamp: turn.timestamp,
          metadata: turn.metadata
        });
      });
      
      setMessages(formattedMessages);
    };

    // Initial setup
    loadConversationHistory();
    handleConnect();

    // Metrics update interval
    const metricsInterval = setInterval(updateMetrics, 2000);

    return () => {
      unsubscribe();
      unsubscribeMemory();
      clearInterval(metricsInterval);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      const result = await lmStudioService.connect();
      if (result.success) {
        await loadAvailableModels();
        addSystemMessage('✅ Connected to LM Studio successfully!');
      } else {
        addSystemMessage(`❌ Failed to connect: ${result.error}`);
      }
    } catch (error) {
      addSystemMessage(`❌ Connection error: ${error.message}`);
    }
    setIsLoading(false);
  };

  const handleDisconnect = async () => {
    await lmStudioService.disconnect();
    setAvailableModels({ loaded: [], available: [] });
    setSelectedModel('');
    addSystemMessage('🔌 Disconnected from LM Studio');
  };

  const loadAvailableModels = async () => {
    try {
      const models = await lmStudioService.getAvailableModels();
      setAvailableModels(models);
      
      // Auto-select first loaded model
      if (models.loaded.length > 0 && !selectedModel) {
        setSelectedModel(models.loaded[0].id);
      }
    } catch (error) {
      console.error('Failed to load models:', error);
    }
  };

  const handleModelSelect = async (modelId) => {
    if (!modelId) return;
    
    setIsLoading(true);
    try {
      await lmStudioService.loadModel(modelId);
      setSelectedModel(modelId);
      addSystemMessage(`🤖 Loaded model: ${modelId}`);
    } catch (error) {
      addSystemMessage(`❌ Failed to load model: ${error.message}`);
    }
    setIsLoading(false);
  };

  const addSystemMessage = (content) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'system',
      content,
      timestamp: new Date()
    }]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !currentModel || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await lmStudioService.sendMessage(userMessage.content);
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: response.content,
        timestamp: response.timestamp,
        metadata: {
          tokens: response.tokens,
          duration: response.duration
        }
      };

      setMessages(prev => [...prev, aiMessage]);

      // Store in memory service
      memoryService.addConversationTurn(
        userMessage.content,
        response.content,
        {
          tokens: response.tokens,
          duration: response.duration,
          model: currentModel.id
        }
      );

    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: 'error',
        content: `Error: ${error.message}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
    
    setIsLoading(false);
  };

  const updateMetrics = async () => {
    if (isConnected) {
      try {
        const newMetrics = await lmStudioService.getMetrics();
        setMetrics(newMetrics);
      } catch (error) {
        console.error('Failed to update metrics:', error);
      }
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-green-500';
      case 'connecting': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = () => {
    if (connectionStatus === 'connecting') return <Loader2 className="w-4 h-4 animate-spin" />;
    return isConnected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MessageCircle className="w-6 h-6 text-blue-500" />
          <div>
            <h2 className="text-xl font-semibold">Live AI Chat</h2>
            <p className="text-sm text-gray-600">Real conversations with your digital organism</p>
          </div>
        </div>
        <div className={`flex items-center space-x-2 ${getStatusColor()}`}>
          {getStatusIcon()}
          <span className="text-sm font-medium capitalize">{connectionStatus}</span>
        </div>
      </div>

      {/* Connection Controls */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">LM Studio Connection</h3>
          <div className="flex space-x-2">
            {!isConnected ? (
              <button
                onClick={handleConnect}
                disabled={isLoading}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50 flex items-center space-x-1"
              >
                {isLoading && <Loader2 className="w-3 h-3 animate-spin" />}
                <span>Connect</span>
              </button>
            ) : (
              <button
                onClick={handleDisconnect}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                Disconnect
              </button>
            )}
          </div>
        </div>

        {/* Model Selection */}
        {isConnected && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Model:</label>
            <select
              value={selectedModel}
              onChange={(e) => handleModelSelect(e.target.value)}
              className="w-full p-2 border rounded text-sm"
              disabled={isLoading}
            >
              <option value="">Choose a model...</option>
              {availableModels.loaded.map(model => (
                <option key={model.id} value={model.id}>
                  🟢 {model.name} (Loaded)
                </option>
              ))}
              {availableModels.available.map(model => (
                <option key={model.id} value={model.id}>
                  ⚪ {model.name} (Available)
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Live Metrics */}
        {isConnected && currentModel && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>{metrics.tokenRate || 0} tok/s</span>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-blue-500" />
                <span>{metrics.cpuUsage || 0}% CPU</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span>{metrics.memoryUsage || 0}% RAM</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>{metrics.temperature || 0}°C</span>
              </div>
            </div>
            
            {/* Memory Stats */}
            <div className="border-t pt-3">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium">Memory System</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div className="flex items-center space-x-1">
                  <Database className="w-3 h-3 text-blue-500" />
                  <span>{memoryStats.conversationTurns || 0} conversations</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>{memoryStats.episodicMemories || 0} episodes</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span>{memoryStats.semanticConcepts || 0} concepts</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-pink-500 rounded"></div>
                  <span>{memoryStats.totalMemorySize || 0}KB stored</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Messages */}
      <div className="bg-white border rounded-lg h-96 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <Bot className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Start a conversation with your digital organism!</p>
              <p className="text-sm">Connect to LM Studio and select a model to begin.</p>
            </div>
          ) : (
            messages.map(message => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : message.type === 'ai'
                    ? 'bg-gray-100 text-gray-800'
                    : message.type === 'system'
                    ? 'bg-yellow-100 text-yellow-800 text-sm'
                    : 'bg-red-100 text-red-800'
                }`}>
                  <div className="flex items-start space-x-2">
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    ) : message.type === 'ai' ? (
                      <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    ) : null}
                    <div className="flex-1">
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      {message.metadata && (
                        <div className="text-xs opacity-75 mt-1">
                          {message.metadata.tokens} tokens • {message.metadata.duration}ms
                        </div>
                      )}
                      <div className="text-xs opacity-75 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg flex items-center space-x-2">
                <Bot className="w-4 h-4" />
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={currentModel ? "Type your message..." : "Connect and select a model first..."}
              disabled={!currentModel || isLoading}
              className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || !currentModel || isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Current Model Info */}
      {currentModel && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-medium text-green-800 mb-2">Active Model</h3>
          <div className="text-sm text-green-700">
            <p><strong>Model:</strong> {currentModel.id}</p>
            <p><strong>Loaded:</strong> {currentModel.loadedAt?.toLocaleString()}</p>
            <p><strong>Status:</strong> Ready for conversation</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChatPanel;

