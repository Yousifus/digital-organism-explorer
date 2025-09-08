class ConsciousnessMonitor {
  constructor() {
    this.listeners = [];
    this.currentStream = null;
    this.reasoningChain = [];
    this.cognitiveLoad = {
      current: 0,
      average: 0,
      peak: 0,
      history: []
    };
    this.streamData = {
      tokens: [],
      words: [],
      sentences: [],
      thoughts: [],
      pauses: [],
      patterns: []
    };
    this.isMonitoring = false;
    this.startTime = null;
    this.lastTokenTime = null;
    this.thinkingPatterns = [];
    this.metacognition = {
      selfAwareness: 0,
      confidence: 0,
      uncertainty: 0,
      reflection: []
    };
  }

  // Start monitoring a new conversation stream
  startMonitoring(conversationId) {
    this.isMonitoring = true;
    this.startTime = Date.now();
    this.currentStream = {
      id: conversationId,
      startTime: this.startTime,
      tokens: [],
      reasoning: [],
      cognitiveEvents: [],
      consciousness: {
        emergence: [],
        patterns: [],
        states: []
      }
    };
    
    this.resetMetrics();
    this.notifyListeners('monitoring_started', { conversationId });
  }

  // Stop monitoring
  stopMonitoring() {
    if (this.isMonitoring) {
      this.isMonitoring = false;
      const duration = Date.now() - this.startTime;
      
      const summary = {
        duration,
        totalTokens: this.streamData.tokens.length,
        averageTokenRate: this.streamData.tokens.length / (duration / 1000),
        cognitiveLoad: this.cognitiveLoad,
        reasoningChain: this.reasoningChain,
        consciousness: this.currentStream?.consciousness
      };
      
      this.notifyListeners('monitoring_stopped', summary);
    }
  }

  // Process incoming token from LM Studio stream
  processToken(token, metadata = {}) {
    if (!this.isMonitoring) return;

    const now = Date.now();
    const timeSinceStart = now - this.startTime;
    const timeSinceLastToken = this.lastTokenTime ? now - this.lastTokenTime : 0;
    
    // Token analysis
    const tokenData = {
      token,
      timestamp: now,
      timeSinceStart,
      timeSinceLastToken,
      position: this.streamData.tokens.length,
      metadata: {
        ...metadata,
        isReasoningToken: this.isReasoningToken(token),
        isMetacognitive: this.isMetacognitiveToken(token),
        cognitiveLoad: this.calculateTokenCognitiveLoad(token, timeSinceLastToken),
        confidence: this.estimateConfidence(token, timeSinceLastToken)
      }
    };

    this.streamData.tokens.push(tokenData);
    this.lastTokenTime = now;

    // Update cognitive load
    this.updateCognitiveLoad(tokenData);

    // Detect reasoning patterns
    this.detectReasoningPatterns(tokenData);

    // Analyze consciousness emergence
    this.analyzeConsciousnessEmergence(tokenData);

    // Check for metacognitive awareness
    this.trackMetacognition(tokenData);

    // Notify listeners of new token
    this.notifyListeners('token_processed', tokenData);

    // Check for complete thoughts/sentences
    this.checkForCompleteThoughts();
  }

  // Detect if token is part of reasoning chain
  isReasoningToken(token) {
    const reasoningIndicators = [
      'think', 'because', 'therefore', 'however', 'although', 'since',
      'let me', 'first', 'second', 'next', 'then', 'so', 'thus',
      'consider', 'analyze', 'examine', 'evaluate', 'assess',
      'reasoning', 'logic', 'conclusion', 'inference', 'deduction'
    ];
    
    return reasoningIndicators.some(indicator => 
      token.toLowerCase().includes(indicator)
    );
  }

  // Detect metacognitive tokens
  isMetacognitiveToken(token) {
    const metacognitiveIndicators = [
      'i think', 'i believe', 'i understand', 'i realize', 'i know',
      'i\'m thinking', 'i\'m considering', 'i\'m analyzing',
      'my understanding', 'my perspective', 'my reasoning',
      'i\'m not sure', 'i\'m uncertain', 'i\'m confident'
    ];
    
    return metacognitiveIndicators.some(indicator => 
      token.toLowerCase().includes(indicator)
    );
  }

  // Calculate cognitive load for a token
  calculateTokenCognitiveLoad(token, timeSinceLastToken) {
    let load = 0;
    
    // Base load from token complexity
    load += token.length * 0.1;
    
    // Pause-based load (longer pauses = higher cognitive load)
    if (timeSinceLastToken > 100) {
      load += Math.min(timeSinceLastToken / 100, 5);
    }
    
    // Reasoning token load
    if (this.isReasoningToken(token)) {
      load += 2;
    }
    
    // Metacognitive load
    if (this.isMetacognitiveToken(token)) {
      load += 3;
    }
    
    // Complex punctuation load
    if (/[;:(){}[\]"]/.test(token)) {
      load += 1;
    }
    
    return Math.min(load, 10); // Cap at 10
  }

  // Estimate confidence from token timing and content
  estimateConfidence(token, timeSinceLastToken) {
    let confidence = 0.5; // Base confidence
    
    // Fast tokens = higher confidence
    if (timeSinceLastToken < 50) {
      confidence += 0.2;
    } else if (timeSinceLastToken > 200) {
      confidence -= 0.2;
    }
    
    // Certain words indicate confidence
    if (/\b(definitely|certainly|clearly|obviously|sure)\b/i.test(token)) {
      confidence += 0.3;
    }
    
    // Uncertain words indicate lower confidence
    if (/\b(maybe|perhaps|possibly|might|could|uncertain)\b/i.test(token)) {
      confidence -= 0.3;
    }
    
    return Math.max(0, Math.min(1, confidence));
  }

  // Update cognitive load metrics
  updateCognitiveLoad(tokenData) {
    const load = tokenData.metadata.cognitiveLoad;
    
    this.cognitiveLoad.current = load;
    this.cognitiveLoad.history.push({
      timestamp: tokenData.timestamp,
      load,
      token: tokenData.token
    });
    
    // Keep only last 100 entries
    if (this.cognitiveLoad.history.length > 100) {
      this.cognitiveLoad.history.shift();
    }
    
    // Update average and peak
    const recentHistory = this.cognitiveLoad.history.slice(-20);
    this.cognitiveLoad.average = recentHistory.reduce((sum, entry) => sum + entry.load, 0) / recentHistory.length;
    this.cognitiveLoad.peak = Math.max(this.cognitiveLoad.peak, load);
  }

  // Detect reasoning patterns in token stream
  detectReasoningPatterns(tokenData) {
    const recentTokens = this.streamData.tokens.slice(-10);
    const reasoningTokens = recentTokens.filter(t => t.metadata.isReasoningToken);
    
    if (reasoningTokens.length >= 2) {
      const pattern = {
        type: 'reasoning_chain',
        startTime: reasoningTokens[0].timestamp,
        endTime: tokenData.timestamp,
        tokens: reasoningTokens.map(t => t.token),
        intensity: reasoningTokens.length / recentTokens.length,
        cognitiveLoad: reasoningTokens.reduce((sum, t) => sum + t.metadata.cognitiveLoad, 0) / reasoningTokens.length
      };
      
      this.reasoningChain.push(pattern);
      this.notifyListeners('reasoning_pattern_detected', pattern);
    }
  }

  // Analyze consciousness emergence patterns
  analyzeConsciousnessEmergence(tokenData) {
    if (!this.currentStream) return;
    
    const recentTokens = this.streamData.tokens.slice(-20);
    const metacognitiveTokens = recentTokens.filter(t => t.metadata.isMetacognitive);
    
    if (metacognitiveTokens.length > 0) {
      const emergence = {
        timestamp: tokenData.timestamp,
        type: 'self_awareness',
        intensity: metacognitiveTokens.length / recentTokens.length,
        tokens: metacognitiveTokens.map(t => t.token),
        confidence: metacognitiveTokens.reduce((sum, t) => sum + t.metadata.confidence, 0) / metacognitiveTokens.length
      };
      
      this.currentStream.consciousness.emergence.push(emergence);
      this.notifyListeners('consciousness_emergence', emergence);
    }
  }

  // Track metacognitive awareness
  trackMetacognition(tokenData) {
    if (tokenData.metadata.isMetacognitive) {
      this.metacognition.selfAwareness = Math.min(1, this.metacognition.selfAwareness + 0.1);
      this.metacognition.confidence = tokenData.metadata.confidence;
      
      this.metacognition.reflection.push({
        timestamp: tokenData.timestamp,
        token: tokenData.token,
        awareness: this.metacognition.selfAwareness,
        confidence: this.metacognition.confidence
      });
      
      // Keep only recent reflections
      if (this.metacognition.reflection.length > 50) {
        this.metacognition.reflection.shift();
      }
      
      this.notifyListeners('metacognition_update', this.metacognition);
    }
  }

  // Check for complete thoughts/sentences
  checkForCompleteThoughts() {
    const recentTokens = this.streamData.tokens.slice(-50);
    const text = recentTokens.map(t => t.token).join('');
    
    // Detect sentence completion
    if (/[.!?]\s*$/.test(text)) {
      const sentence = {
        text: text.trim(),
        startTime: recentTokens[0]?.timestamp,
        endTime: recentTokens[recentTokens.length - 1]?.timestamp,
        tokenCount: recentTokens.length,
        cognitiveLoad: recentTokens.reduce((sum, t) => sum + t.metadata.cognitiveLoad, 0) / recentTokens.length,
        hasReasoning: recentTokens.some(t => t.metadata.isReasoningToken),
        hasMetacognition: recentTokens.some(t => t.metadata.isMetacognitive)
      };
      
      this.streamData.sentences.push(sentence);
      this.notifyListeners('thought_completed', sentence);
    }
  }

  // Get current consciousness state
  getConsciousnessState() {
    const recentLoad = this.cognitiveLoad.history.slice(-10);
    const avgRecentLoad = recentLoad.reduce((sum, entry) => sum + entry.load, 0) / recentLoad.length || 0;
    
    let state = 'idle';
    if (avgRecentLoad > 6) state = 'deep_thinking';
    else if (avgRecentLoad > 4) state = 'active_reasoning';
    else if (avgRecentLoad > 2) state = 'light_processing';
    
    return {
      state,
      cognitiveLoad: this.cognitiveLoad,
      metacognition: this.metacognition,
      reasoningActive: this.reasoningChain.length > 0,
      selfAwareness: this.metacognition.selfAwareness,
      streamHealth: this.isMonitoring
    };
  }

  // Get real-time metrics
  getRealTimeMetrics() {
    const now = Date.now();
    const duration = this.startTime ? (now - this.startTime) / 1000 : 0;
    const tokenRate = duration > 0 ? this.streamData.tokens.length / duration : 0;
    
    return {
      isMonitoring: this.isMonitoring,
      duration,
      tokenCount: this.streamData.tokens.length,
      tokenRate,
      cognitiveLoad: this.cognitiveLoad,
      reasoningChainLength: this.reasoningChain.length,
      consciousnessState: this.getConsciousnessState(),
      metacognition: this.metacognition,
      recentTokens: this.streamData.tokens.slice(-10),
      recentSentences: this.streamData.sentences.slice(-3)
    };
  }

  // Reset all metrics
  resetMetrics() {
    this.reasoningChain = [];
    this.cognitiveLoad = {
      current: 0,
      average: 0,
      peak: 0,
      history: []
    };
    this.streamData = {
      tokens: [],
      words: [],
      sentences: [],
      thoughts: [],
      pauses: [],
      patterns: []
    };
    this.metacognition = {
      selfAwareness: 0,
      confidence: 0,
      uncertainty: 0,
      reflection: []
    };
  }

  // Add listener for consciousness events
  addListener(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  // Notify all listeners
  notifyListeners(event, data) {
    this.listeners.forEach(listener => {
      try {
        listener(event, data);
      } catch (error) {
        console.error('Consciousness monitor listener error:', error);
      }
    });
  }

  // Export consciousness data
  exportConsciousnessData() {
    return {
      timestamp: Date.now(),
      session: this.currentStream,
      metrics: this.getRealTimeMetrics(),
      reasoningChain: this.reasoningChain,
      streamData: this.streamData,
      metacognition: this.metacognition
    };
  }
}

// Create singleton instance
const consciousnessMonitor = new ConsciousnessMonitor();

export default consciousnessMonitor;

