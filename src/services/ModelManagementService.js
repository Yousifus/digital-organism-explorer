import lmStudioService from './LMStudioClient';

class ModelManagementService {
  constructor() {
    this.models = {
      loaded: [],
      available: [],
      downloading: [],
      failed: []
    };
    
    this.currentModel = null;
    this.modelHistory = [];
    this.performanceMetrics = new Map();
    this.modelConfigurations = new Map();
    this.taskOptimizations = new Map();
    
    this.listeners = new Set();
    this.isManaging = false;
    this.refreshInterval = null;
    
    // Model categories for task optimization
    this.modelCategories = {
      'conversation': ['llama', 'mistral', 'qwen', 'phi'],
      'coding': ['codellama', 'deepseek', 'starcoder', 'codegemma'],
      'reasoning': ['llama', 'qwen', 'deepseek', 'mistral'],
      'creative': ['llama', 'mistral', 'yi', 'solar'],
      'analysis': ['qwen', 'deepseek', 'llama', 'mistral'],
      'math': ['deepseek', 'qwen', 'llama', 'mathstral']
    };
    
    // Performance thresholds for model evaluation
    this.performanceThresholds = {
      tokenRate: { excellent: 50, good: 30, poor: 15 },
      latency: { excellent: 100, good: 300, poor: 1000 },
      accuracy: { excellent: 0.9, good: 0.7, poor: 0.5 },
      efficiency: { excellent: 0.8, good: 0.6, poor: 0.4 }
    };
    
    this.startManagement();
  }

  // Core management functions
  async startManagement() {
    if (this.isManaging) return;
    
    this.isManaging = true;
    
    // Initial model discovery
    await this.refreshModelList();
    
    // Set up periodic refresh
    this.refreshInterval = setInterval(() => {
      this.refreshModelList();
    }, 10000); // Refresh every 10 seconds
    
    console.log('🧠 Model management started');
  }

  stopManagement() {
    if (!this.isManaging) return;
    
    this.isManaging = false;
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
    
    console.log('💤 Model management stopped');
  }

  // Model discovery and listing
  async refreshModelList() {
    try {
      if (!lmStudioService.isConnected) {
        await lmStudioService.connect();
      }
      
      // Get loaded models
      const loadedModels = await this.getLoadedModels();
      
      // Get available models
      const availableModels = await this.getAvailableModels();
      
      // Update model lists
      this.models.loaded = loadedModels;
      this.models.available = availableModels;
      
      // Update current model if needed
      await this.updateCurrentModel();
      
      this.notifyListeners();
      
    } catch (error) {
      console.error('Failed to refresh model list:', error);
    }
  }

  async getLoadedModels() {
    try {
      // Use LM Studio API to get loaded models
      const response = await fetch('http://localhost:1234/v1/models');
      if (!response.ok) throw new Error('Failed to fetch loaded models');
      
      const data = await response.json();
      return data.data.map(model => ({
        id: model.id,
        name: this.formatModelName(model.id),
        size: this.estimateModelSize(model.id),
        type: this.detectModelType(model.id),
        status: 'loaded',
        loadedAt: new Date(),
        performance: this.getModelPerformance(model.id)
      }));
      
    } catch (error) {
      console.error('Error fetching loaded models:', error);
      return this.getSimulatedLoadedModels();
    }
  }

  async getAvailableModels() {
    try {
      // In a real implementation, this would call LM Studio's model discovery API
      // For now, simulate with common models
      return this.getSimulatedAvailableModels();
      
    } catch (error) {
      console.error('Error fetching available models:', error);
      return [];
    }
  }

  getSimulatedLoadedModels() {
    return [
      {
        id: 'llama-3.2-3b-instruct',
        name: 'Llama 3.2 3B Instruct',
        size: '3.2B',
        type: 'conversation',
        status: 'loaded',
        loadedAt: new Date(Date.now() - 3600000), // 1 hour ago
        performance: { tokenRate: 45, latency: 150, accuracy: 0.85, efficiency: 0.78 }
      },
      {
        id: 'mistral-7b-instruct',
        name: 'Mistral 7B Instruct',
        size: '7B',
        type: 'conversation',
        status: 'loaded',
        loadedAt: new Date(Date.now() - 1800000), // 30 minutes ago
        performance: { tokenRate: 32, latency: 220, accuracy: 0.88, efficiency: 0.72 }
      }
    ];
  }

  getSimulatedAvailableModels() {
    return [
      {
        id: 'qwen2.5-7b-instruct',
        name: 'Qwen 2.5 7B Instruct',
        size: '7B',
        type: 'reasoning',
        status: 'available',
        downloadSize: '4.1GB',
        estimatedLoadTime: '2-3 minutes'
      },
      {
        id: 'deepseek-coder-6.7b',
        name: 'DeepSeek Coder 6.7B',
        size: '6.7B',
        type: 'coding',
        status: 'available',
        downloadSize: '3.8GB',
        estimatedLoadTime: '2 minutes'
      },
      {
        id: 'phi-3.5-mini-instruct',
        name: 'Phi 3.5 Mini Instruct',
        size: '3.8B',
        type: 'conversation',
        status: 'available',
        downloadSize: '2.2GB',
        estimatedLoadTime: '1 minute'
      },
      {
        id: 'codellama-13b-instruct',
        name: 'CodeLlama 13B Instruct',
        size: '13B',
        type: 'coding',
        status: 'available',
        downloadSize: '7.3GB',
        estimatedLoadTime: '4-5 minutes'
      }
    ];
  }

  // Model loading and unloading
  async loadModel(modelId, options = {}) {
    try {
      console.log(`🔄 Loading model: ${modelId}`);
      
      // Add to downloading list
      this.models.downloading.push({
        id: modelId,
        startTime: new Date(),
        progress: 0
      });
      this.notifyListeners();
      
      // Simulate loading progress
      await this.simulateModelLoading(modelId);
      
      // Use LM Studio API to load model
      const success = await this.performModelLoad(modelId, options);
      
      if (success) {
        // Remove from downloading, add to loaded
        this.models.downloading = this.models.downloading.filter(m => m.id !== modelId);
        
        const loadedModel = {
          id: modelId,
          name: this.formatModelName(modelId),
          size: this.estimateModelSize(modelId),
          type: this.detectModelType(modelId),
          status: 'loaded',
          loadedAt: new Date(),
          configuration: options,
          performance: this.initializeModelPerformance(modelId)
        };
        
        this.models.loaded.push(loadedModel);
        
        // Update model history
        this.modelHistory.push({
          action: 'load',
          modelId: modelId,
          timestamp: new Date(),
          success: true
        });
        
        console.log(`✅ Model loaded successfully: ${modelId}`);
        this.notifyListeners();
        return true;
        
      } else {
        throw new Error('Model loading failed');
      }
      
    } catch (error) {
      console.error(`❌ Failed to load model ${modelId}:`, error);
      
      // Remove from downloading, add to failed
      this.models.downloading = this.models.downloading.filter(m => m.id !== modelId);
      this.models.failed.push({
        id: modelId,
        error: error.message,
        timestamp: new Date()
      });
      
      this.modelHistory.push({
        action: 'load',
        modelId: modelId,
        timestamp: new Date(),
        success: false,
        error: error.message
      });
      
      this.notifyListeners();
      return false;
    }
  }

  async unloadModel(modelId) {
    try {
      console.log(`🔄 Unloading model: ${modelId}`);
      
      // Use LM Studio API to unload model
      const success = await this.performModelUnload(modelId);
      
      if (success) {
        // Remove from loaded models
        this.models.loaded = this.models.loaded.filter(m => m.id !== modelId);
        
        // Clear current model if it was unloaded
        if (this.currentModel && this.currentModel.id === modelId) {
          this.currentModel = null;
        }
        
        // Update model history
        this.modelHistory.push({
          action: 'unload',
          modelId: modelId,
          timestamp: new Date(),
          success: true
        });
        
        console.log(`✅ Model unloaded successfully: ${modelId}`);
        this.notifyListeners();
        return true;
        
      } else {
        throw new Error('Model unloading failed');
      }
      
    } catch (error) {
      console.error(`❌ Failed to unload model ${modelId}:`, error);
      
      this.modelHistory.push({
        action: 'unload',
        modelId: modelId,
        timestamp: new Date(),
        success: false,
        error: error.message
      });
      
      this.notifyListeners();
      return false;
    }
  }

  // Model switching
  async switchModel(modelId, seamless = true) {
    try {
      console.log(`🔄 Switching to model: ${modelId}`);
      
      const targetModel = this.models.loaded.find(m => m.id === modelId);
      if (!targetModel) {
        throw new Error(`Model ${modelId} is not loaded`);
      }
      
      const previousModel = this.currentModel;
      
      if (seamless && previousModel) {
        // Seamless transition - keep previous model loaded during switch
        await this.performSeamlessSwitch(previousModel.id, modelId);
      } else {
        // Standard switch
        await this.performModelSwitch(modelId);
      }
      
      // Update current model
      this.currentModel = targetModel;
      
      // Update model history
      this.modelHistory.push({
        action: 'switch',
        fromModelId: previousModel?.id,
        toModelId: modelId,
        timestamp: new Date(),
        success: true,
        seamless: seamless
      });
      
      console.log(`✅ Switched to model: ${modelId}`);
      this.notifyListeners();
      return true;
      
    } catch (error) {
      console.error(`❌ Failed to switch to model ${modelId}:`, error);
      
      this.modelHistory.push({
        action: 'switch',
        toModelId: modelId,
        timestamp: new Date(),
        success: false,
        error: error.message
      });
      
      this.notifyListeners();
      return false;
    }
  }

  // Model configuration and tuning
  async updateModelConfiguration(modelId, configuration) {
    try {
      console.log(`⚙️ Updating configuration for model: ${modelId}`);
      
      // Validate configuration
      const validConfig = this.validateConfiguration(configuration);
      
      // Apply configuration through LM Studio API
      const success = await this.applyModelConfiguration(modelId, validConfig);
      
      if (success) {
        // Store configuration
        this.modelConfigurations.set(modelId, {
          ...validConfig,
          updatedAt: new Date()
        });
        
        // Update model in loaded list
        const model = this.models.loaded.find(m => m.id === modelId);
        if (model) {
          model.configuration = validConfig;
        }
        
        console.log(`✅ Configuration updated for model: ${modelId}`);
        this.notifyListeners();
        return true;
        
      } else {
        throw new Error('Configuration update failed');
      }
      
    } catch (error) {
      console.error(`❌ Failed to update configuration for ${modelId}:`, error);
      return false;
    }
  }

  validateConfiguration(config) {
    const defaults = {
      temperature: 0.7,
      topP: 0.9,
      topK: 40,
      maxTokens: 2048,
      repeatPenalty: 1.1,
      contextLength: 4096
    };
    
    const validated = { ...defaults, ...config };
    
    // Validate ranges
    validated.temperature = Math.max(0.1, Math.min(2.0, validated.temperature));
    validated.topP = Math.max(0.1, Math.min(1.0, validated.topP));
    validated.topK = Math.max(1, Math.min(100, validated.topK));
    validated.maxTokens = Math.max(1, Math.min(8192, validated.maxTokens));
    validated.repeatPenalty = Math.max(0.5, Math.min(2.0, validated.repeatPenalty));
    validated.contextLength = Math.max(512, Math.min(32768, validated.contextLength));
    
    return validated;
  }

  // Task-based model optimization
  async optimizeForTask(taskType, requirements = {}) {
    try {
      console.log(`🎯 Optimizing for task: ${taskType}`);
      
      // Get recommended models for task
      const recommendedModels = this.getRecommendedModels(taskType);
      
      // Find best available model
      const bestModel = this.selectBestModel(recommendedModels, requirements);
      
      if (!bestModel) {
        throw new Error(`No suitable model found for task: ${taskType}`);
      }
      
      // Load model if not already loaded
      if (!this.models.loaded.find(m => m.id === bestModel.id)) {
        await this.loadModel(bestModel.id);
      }
      
      // Switch to optimal model
      await this.switchModel(bestModel.id);
      
      // Apply task-specific configuration
      const taskConfig = this.getTaskConfiguration(taskType);
      await this.updateModelConfiguration(bestModel.id, taskConfig);
      
      // Store optimization
      this.taskOptimizations.set(taskType, {
        modelId: bestModel.id,
        configuration: taskConfig,
        optimizedAt: new Date(),
        requirements: requirements
      });
      
      console.log(`✅ Optimized for task ${taskType} with model: ${bestModel.id}`);
      return bestModel;
      
    } catch (error) {
      console.error(`❌ Failed to optimize for task ${taskType}:`, error);
      return null;
    }
  }

  getRecommendedModels(taskType) {
    const categoryModels = this.modelCategories[taskType] || ['llama', 'mistral'];
    
    // Filter available and loaded models by category
    const allModels = [...this.models.loaded, ...this.models.available];
    return allModels.filter(model => 
      categoryModels.some(category => 
        model.id.toLowerCase().includes(category)
      )
    );
  }

  selectBestModel(models, requirements) {
    if (models.length === 0) return null;
    
    // Score models based on requirements
    const scoredModels = models.map(model => {
      let score = 0;
      
      // Performance scoring
      if (model.performance) {
        score += this.scorePerformance(model.performance);
      }
      
      // Size preference
      if (requirements.preferSmaller) {
        const size = this.parseModelSize(model.size);
        score += Math.max(0, 10 - size); // Prefer smaller models
      }
      
      // Speed preference
      if (requirements.preferFaster) {
        const tokenRate = model.performance?.tokenRate || 30;
        score += Math.min(10, tokenRate / 5);
      }
      
      // Already loaded bonus
      if (model.status === 'loaded') {
        score += 5;
      }
      
      return { model, score };
    });
    
    // Return highest scoring model
    scoredModels.sort((a, b) => b.score - a.score);
    return scoredModels[0]?.model;
  }

  getTaskConfiguration(taskType) {
    const configurations = {
      conversation: {
        temperature: 0.8,
        topP: 0.9,
        maxTokens: 2048,
        repeatPenalty: 1.05
      },
      coding: {
        temperature: 0.3,
        topP: 0.95,
        maxTokens: 4096,
        repeatPenalty: 1.1
      },
      reasoning: {
        temperature: 0.5,
        topP: 0.9,
        maxTokens: 3072,
        repeatPenalty: 1.1
      },
      creative: {
        temperature: 1.0,
        topP: 0.85,
        maxTokens: 2048,
        repeatPenalty: 1.0
      },
      analysis: {
        temperature: 0.4,
        topP: 0.95,
        maxTokens: 3072,
        repeatPenalty: 1.15
      }
    };
    
    return configurations[taskType] || configurations.conversation;
  }

  // Performance tracking and comparison
  trackModelPerformance(modelId, metrics) {
    const existing = this.performanceMetrics.get(modelId) || {
      samples: [],
      averages: {},
      trends: {}
    };
    
    // Add new sample
    existing.samples.push({
      ...metrics,
      timestamp: new Date()
    });
    
    // Keep only recent samples (last 50)
    if (existing.samples.length > 50) {
      existing.samples = existing.samples.slice(-50);
    }
    
    // Calculate averages
    existing.averages = this.calculateAverages(existing.samples);
    
    // Calculate trends
    existing.trends = this.calculateTrends(existing.samples);
    
    this.performanceMetrics.set(modelId, existing);
  }

  calculateAverages(samples) {
    if (samples.length === 0) return {};
    
    const sums = samples.reduce((acc, sample) => {
      Object.keys(sample).forEach(key => {
        if (typeof sample[key] === 'number') {
          acc[key] = (acc[key] || 0) + sample[key];
        }
      });
      return acc;
    }, {});
    
    const averages = {};
    Object.keys(sums).forEach(key => {
      averages[key] = sums[key] / samples.length;
    });
    
    return averages;
  }

  calculateTrends(samples) {
    if (samples.length < 2) return {};
    
    const recent = samples.slice(-10); // Last 10 samples
    const older = samples.slice(-20, -10); // Previous 10 samples
    
    if (older.length === 0) return {};
    
    const recentAvg = this.calculateAverages(recent);
    const olderAvg = this.calculateAverages(older);
    
    const trends = {};
    Object.keys(recentAvg).forEach(key => {
      if (olderAvg[key]) {
        const change = ((recentAvg[key] - olderAvg[key]) / olderAvg[key]) * 100;
        trends[key] = {
          direction: change > 5 ? 'improving' : change < -5 ? 'declining' : 'stable',
          change: change
        };
      }
    });
    
    return trends;
  }

  compareModels(modelIds) {
    const comparison = {
      models: [],
      winner: null,
      criteria: ['tokenRate', 'latency', 'accuracy', 'efficiency']
    };
    
    modelIds.forEach(modelId => {
      const model = this.models.loaded.find(m => m.id === modelId);
      const performance = this.performanceMetrics.get(modelId);
      
      if (model && performance) {
        comparison.models.push({
          id: modelId,
          name: model.name,
          performance: performance.averages,
          score: this.scorePerformance(performance.averages)
        });
      }
    });
    
    // Determine winner
    if (comparison.models.length > 0) {
      comparison.models.sort((a, b) => b.score - a.score);
      comparison.winner = comparison.models[0];
    }
    
    return comparison;
  }

  scorePerformance(performance) {
    let score = 0;
    
    // Token rate scoring (0-25 points)
    const tokenRate = performance.tokenRate || 0;
    if (tokenRate >= this.performanceThresholds.tokenRate.excellent) score += 25;
    else if (tokenRate >= this.performanceThresholds.tokenRate.good) score += 15;
    else if (tokenRate >= this.performanceThresholds.tokenRate.poor) score += 5;
    
    // Latency scoring (0-25 points, lower is better)
    const latency = performance.latency || 1000;
    if (latency <= this.performanceThresholds.latency.excellent) score += 25;
    else if (latency <= this.performanceThresholds.latency.good) score += 15;
    else if (latency <= this.performanceThresholds.latency.poor) score += 5;
    
    // Accuracy scoring (0-25 points)
    const accuracy = performance.accuracy || 0;
    if (accuracy >= this.performanceThresholds.accuracy.excellent) score += 25;
    else if (accuracy >= this.performanceThresholds.accuracy.good) score += 15;
    else if (accuracy >= this.performanceThresholds.accuracy.poor) score += 5;
    
    // Efficiency scoring (0-25 points)
    const efficiency = performance.efficiency || 0;
    if (efficiency >= this.performanceThresholds.efficiency.excellent) score += 25;
    else if (efficiency >= this.performanceThresholds.efficiency.good) score += 15;
    else if (efficiency >= this.performanceThresholds.efficiency.poor) score += 5;
    
    return score;
  }

  // Utility functions
  formatModelName(modelId) {
    return modelId
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }

  estimateModelSize(modelId) {
    // Extract size from model ID
    const sizeMatch = modelId.match(/(\d+\.?\d*)b/i);
    return sizeMatch ? `${sizeMatch[1]}B` : 'Unknown';
  }

  parseModelSize(sizeStr) {
    const match = sizeStr.match(/(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 7; // Default to 7B
  }

  detectModelType(modelId) {
    const id = modelId.toLowerCase();
    
    if (id.includes('code') || id.includes('coder')) return 'coding';
    if (id.includes('math')) return 'math';
    if (id.includes('instruct') || id.includes('chat')) return 'conversation';
    if (id.includes('reasoning')) return 'reasoning';
    
    return 'conversation'; // Default
  }

  initializeModelPerformance(modelId) {
    return {
      tokenRate: 30 + Math.random() * 20,
      latency: 150 + Math.random() * 100,
      accuracy: 0.7 + Math.random() * 0.2,
      efficiency: 0.6 + Math.random() * 0.3
    };
  }

  getModelPerformance(modelId) {
    const metrics = this.performanceMetrics.get(modelId);
    return metrics?.averages || this.initializeModelPerformance(modelId);
  }

  // API simulation functions
  async simulateModelLoading(modelId) {
    // Simulate loading progress
    for (let progress = 0; progress <= 100; progress += 10) {
      const downloading = this.models.downloading.find(m => m.id === modelId);
      if (downloading) {
        downloading.progress = progress;
        this.notifyListeners();
      }
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  async performModelLoad(modelId, options) {
    // In real implementation, this would call LM Studio API
    // For now, simulate success
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  }

  async performModelUnload(modelId) {
    // In real implementation, this would call LM Studio API
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  }

  async performModelSwitch(modelId) {
    // In real implementation, this would call LM Studio API
    await new Promise(resolve => setTimeout(resolve, 300));
    return true;
  }

  async performSeamlessSwitch(fromModelId, toModelId) {
    // In real implementation, this would handle seamless transition
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  }

  async applyModelConfiguration(modelId, config) {
    // In real implementation, this would call LM Studio API
    await new Promise(resolve => setTimeout(resolve, 200));
    return true;
  }

  async updateCurrentModel() {
    if (this.models.loaded.length > 0 && !this.currentModel) {
      this.currentModel = this.models.loaded[0];
    }
  }

  // Public API
  getModels() {
    return {
      ...this.models,
      current: this.currentModel,
      history: this.modelHistory.slice(-20),
      isManaging: this.isManaging
    };
  }

  getModelMetrics(modelId) {
    return this.performanceMetrics.get(modelId);
  }

  getTaskOptimizations() {
    return Object.fromEntries(this.taskOptimizations);
  }

  // Event listeners
  addListener(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notifyListeners() {
    const data = this.getModels();
    this.listeners.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error('Model management listener error:', error);
      }
    });
  }

  // Lifecycle management
  destroy() {
    this.stopManagement();
    this.listeners.clear();
    this.performanceMetrics.clear();
    this.modelConfigurations.clear();
    this.taskOptimizations.clear();
  }
}

// Create singleton instance
const modelManagementService = new ModelManagementService();

export default modelManagementService;

