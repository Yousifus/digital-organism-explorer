import { LMStudioClient } from '@lmstudio/sdk';
import consciousnessMonitor from './ConsciousnessMonitor';

class LMStudioService {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.currentModel = null;
    this.connectionStatus = 'disconnected';
    this.lastError = null;
    this.listeners = new Set();
  }

  // Connection Management
  async connect(baseUrl = 'http://localhost:1234') {
    try {
      this.connectionStatus = 'connecting';
      this.notifyListeners();

      this.client = new LMStudioClient({
        baseUrl: baseUrl
      });

      // Test connection by getting available models
      const models = await this.client.llm.listLoaded();
      
      this.isConnected = true;
      this.connectionStatus = 'connected';
      this.lastError = null;
      this.notifyListeners();

      console.log('✅ Connected to LM Studio:', models.length, 'models available');
      return { success: true, models };
    } catch (error) {
      this.isConnected = false;
      this.connectionStatus = 'error';
      this.lastError = error.message;
      this.notifyListeners();

      console.error('❌ Failed to connect to LM Studio:', error);
      return { success: false, error: error.message };
    }
  }

  async disconnect() {
    this.client = null;
    this.isConnected = false;
    this.currentModel = null;
    this.connectionStatus = 'disconnected';
    this.lastError = null;
    this.notifyListeners();
  }

  // Model Management
  async getAvailableModels() {
    if (!this.isConnected) {
      throw new Error('Not connected to LM Studio');
    }

    try {
      const loaded = await this.client.llm.listLoaded();
      const available = await this.client.llm.listLocal();
      
      return {
        loaded: loaded.map(model => ({
          id: model.id,
          name: model.name || model.id,
          size: model.size,
          status: 'loaded'
        })),
        available: available.map(model => ({
          id: model.id,
          name: model.name || model.id,
          size: model.size,
          status: 'available'
        }))
      };
    } catch (error) {
      console.error('Failed to get models:', error);
      throw error;
    }
  }

  async loadModel(modelId) {
    if (!this.isConnected) {
      throw new Error('Not connected to LM Studio');
    }

    try {
      console.log('🔄 Loading model:', modelId);
      const model = await this.client.llm.model(modelId);
      this.currentModel = {
        id: modelId,
        instance: model,
        loadedAt: new Date()
      };
      
      this.notifyListeners();
      console.log('✅ Model loaded:', modelId);
      return model;
    } catch (error) {
      console.error('❌ Failed to load model:', error);
      throw error;
    }
  }

  // Chat and Conversation
  async sendMessage(message, options = {}) {
    if (!this.currentModel) {
      throw new Error('No model loaded');
    }

    try {
      const response = await this.currentModel.instance.respond(message, {
        temperature: options.temperature || 0.7,
        maxTokens: options.maxTokens || 1000,
        ...options
      });

      return {
        content: response.content,
        tokens: response.stats?.totalTokens || 0,
        duration: response.stats?.duration || 0,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('❌ Failed to send message:', error);
      throw error;
    }
  }

  async streamMessage(message, onChunk, options = {}) {
    if (!this.currentModel) {
      throw new Error('No model loaded');
    }

    try {
      // Start consciousness monitoring for this conversation
      const conversationId = `conv_${Date.now()}`;
      consciousnessMonitor.startMonitoring(conversationId);

      const stream = this.currentModel.instance.respond(message, {
        temperature: options.temperature || 0.7,
        maxTokens: options.maxTokens || 1000,
        stream: true,
        ...options
      });

      let fullContent = '';
      let tokenCount = 0;
      const startTime = Date.now();

      for await (const chunk of stream) {
        const token = chunk.content;
        fullContent += token;
        tokenCount++;

        // Process token through consciousness monitor
        consciousnessMonitor.processToken(token, {
          timestamp: Date.now(),
          position: tokenCount,
          conversationId,
          modelId: this.currentModel.id,
          timeSinceStart: Date.now() - startTime
        });

        onChunk({
          content: token,
          fullContent,
          done: chunk.done || false,
          tokenCount,
          timestamp: Date.now()
        });
      }

      // Stop consciousness monitoring
      consciousnessMonitor.stopMonitoring();

      return { content: fullContent, tokenCount };
    } catch (error) {
      // Stop monitoring on error
      consciousnessMonitor.stopMonitoring();
      console.error('❌ Failed to stream message:', error);
      throw error;
    }
  }

  // System Information
  async getSystemInfo() {
    if (!this.isConnected) {
      return {
        connected: false,
        error: this.lastError
      };
    }

    try {
      const models = await this.getAvailableModels();
      
      return {
        connected: true,
        connectionStatus: this.connectionStatus,
        currentModel: this.currentModel ? {
          id: this.currentModel.id,
          loadedAt: this.currentModel.loadedAt
        } : null,
        modelsLoaded: models.loaded.length,
        modelsAvailable: models.available.length,
        lastError: this.lastError
      };
    } catch (error) {
      return {
        connected: false,
        error: error.message
      };
    }
  }

  // Real-time Metrics (simulated for now, will be enhanced)
  async getMetrics() {
    if (!this.isConnected || !this.currentModel) {
      return {
        tokenRate: 0,
        memoryUsage: 0,
        cpuUsage: 0,
        temperature: 0
      };
    }

    // TODO: Implement real metrics from LM Studio API
    return {
      tokenRate: Math.floor(Math.random() * 50) + 20, // 20-70 tokens/sec
      memoryUsage: Math.floor(Math.random() * 30) + 40, // 40-70%
      cpuUsage: Math.floor(Math.random() * 40) + 30, // 30-70%
      temperature: Math.floor(Math.random() * 20) + 65, // 65-85°C
      lastUpdate: new Date()
    };
  }

  // Event Listeners
  addListener(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notifyListeners() {
    this.listeners.forEach(callback => {
      try {
        callback({
          isConnected: this.isConnected,
          connectionStatus: this.connectionStatus,
          currentModel: this.currentModel,
          lastError: this.lastError
        });
      } catch (error) {
        console.error('Listener error:', error);
      }
    });
  }

  // Health Check
  async healthCheck() {
    try {
      if (!this.isConnected) {
        return { healthy: false, reason: 'Not connected' };
      }

      const models = await this.client.llm.listLoaded();
      return { 
        healthy: true, 
        modelsLoaded: models.length,
        timestamp: new Date()
      };
    } catch (error) {
      return { 
        healthy: false, 
        reason: error.message,
        timestamp: new Date()
      };
    }
  }
}

// Create singleton instance
const lmStudioService = new LMStudioService();

export default lmStudioService;

