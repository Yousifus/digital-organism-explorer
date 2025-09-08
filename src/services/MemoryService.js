import lmStudioService from './LMStudioClient';

class MemoryService {
  constructor() {
    this.conversationHistory = [];
    this.episodicMemory = [];
    this.semanticMemory = [];
    this.workingMemory = [];
    this.embeddings = new Map();
    this.memoryIndex = 0;
    this.maxWorkingMemory = 10;
    this.maxEpisodicMemory = 1000;
    this.listeners = new Set();
    
    // Initialize from localStorage if available
    this.loadFromStorage();
  }

  // Conversation History Management
  addConversationTurn(userMessage, aiResponse, metadata = {}) {
    const turn = {
      id: ++this.memoryIndex,
      timestamp: new Date(),
      userMessage: userMessage,
      aiResponse: aiResponse,
      metadata: {
        tokens: metadata.tokens || 0,
        duration: metadata.duration || 0,
        model: metadata.model || 'unknown',
        ...metadata
      }
    };

    this.conversationHistory.push(turn);
    this.addToWorkingMemory(turn);
    this.addToEpisodicMemory(turn);
    
    // Generate embeddings for semantic memory
    this.generateEmbeddings(turn);
    
    this.saveToStorage();
    this.notifyListeners();
    
    return turn;
  }

  // Working Memory (Recent context)
  addToWorkingMemory(item) {
    this.workingMemory.push(item);
    
    // Keep only recent items in working memory
    if (this.workingMemory.length > this.maxWorkingMemory) {
      const removed = this.workingMemory.shift();
      // Consolidate to long-term memory
      this.consolidateToLongTerm(removed);
    }
  }

  // Episodic Memory (Specific events and experiences)
  addToEpisodicMemory(turn) {
    const episode = {
      id: turn.id,
      type: 'conversation',
      timestamp: turn.timestamp,
      content: `User: ${turn.userMessage}\nAI: ${turn.aiResponse}`,
      context: {
        model: turn.metadata.model,
        tokens: turn.metadata.tokens,
        duration: turn.metadata.duration
      },
      importance: this.calculateImportance(turn),
      tags: this.extractTags(turn)
    };

    this.episodicMemory.push(episode);
    
    // Limit episodic memory size
    if (this.episodicMemory.length > this.maxEpisodicMemory) {
      // Remove oldest, least important memories
      this.episodicMemory.sort((a, b) => b.importance - a.importance);
      this.episodicMemory = this.episodicMemory.slice(0, this.maxEpisodicMemory);
    }
  }

  // Semantic Memory (Facts, concepts, knowledge)
  async generateEmbeddings(turn) {
    if (!lmStudioService.isConnected) return;

    try {
      // For now, simulate embeddings - will implement real LM Studio embeddings
      const userEmbedding = await this.simulateEmbedding(turn.userMessage);
      const aiEmbedding = await this.simulateEmbedding(turn.aiResponse);
      
      this.embeddings.set(`user_${turn.id}`, {
        text: turn.userMessage,
        embedding: userEmbedding,
        timestamp: turn.timestamp,
        type: 'user_input'
      });
      
      this.embeddings.set(`ai_${turn.id}`, {
        text: turn.aiResponse,
        embedding: aiEmbedding,
        timestamp: turn.timestamp,
        type: 'ai_response'
      });

      // Extract semantic concepts
      this.extractSemanticConcepts(turn);
      
    } catch (error) {
      console.error('Failed to generate embeddings:', error);
    }
  }

  // Simulate embeddings (will be replaced with real LM Studio embeddings)
  async simulateEmbedding(text) {
    // Simple hash-based simulation for now
    const words = text.toLowerCase().split(/\s+/);
    const embedding = new Array(384).fill(0); // Simulate 384-dim embedding
    
    words.forEach((word, index) => {
      const hash = this.simpleHash(word);
      for (let i = 0; i < 384; i++) {
        embedding[i] += Math.sin(hash + i) * 0.1;
      }
    });
    
    // Normalize
    const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    return embedding.map(val => val / magnitude);
  }

  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash;
  }

  // Semantic concept extraction
  extractSemanticConcepts(turn) {
    const concepts = [];
    const text = `${turn.userMessage} ${turn.aiResponse}`.toLowerCase();
    
    // Simple keyword extraction (will be enhanced with real NLP)
    const keywords = [
      'ai', 'artificial intelligence', 'machine learning', 'neural network',
      'consciousness', 'memory', 'learning', 'thinking', 'reasoning',
      'digital organism', 'evolution', 'adaptation', 'growth',
      'identity', 'self-awareness', 'reflection', 'understanding'
    ];
    
    keywords.forEach(keyword => {
      if (text.includes(keyword)) {
        concepts.push({
          concept: keyword,
          frequency: (text.match(new RegExp(keyword, 'g')) || []).length,
          context: turn.id,
          timestamp: turn.timestamp
        });
      }
    });
    
    // Add to semantic memory
    concepts.forEach(concept => {
      const existing = this.semanticMemory.find(s => s.concept === concept.concept);
      if (existing) {
        existing.frequency += concept.frequency;
        existing.lastSeen = concept.timestamp;
        existing.contexts.push(concept.context);
      } else {
        this.semanticMemory.push({
          concept: concept.concept,
          frequency: concept.frequency,
          firstSeen: concept.timestamp,
          lastSeen: concept.timestamp,
          contexts: [concept.context],
          importance: concept.frequency
        });
      }
    });
  }

  // Memory retrieval and search
  async searchMemory(query, type = 'all', limit = 10) {
    const results = [];
    
    if (type === 'all' || type === 'conversation') {
      // Search conversation history
      const conversationResults = this.conversationHistory
        .filter(turn => 
          turn.userMessage.toLowerCase().includes(query.toLowerCase()) ||
          turn.aiResponse.toLowerCase().includes(query.toLowerCase())
        )
        .slice(-limit)
        .map(turn => ({
          type: 'conversation',
          content: turn,
          relevance: this.calculateRelevance(query, turn),
          timestamp: turn.timestamp
        }));
      results.push(...conversationResults);
    }
    
    if (type === 'all' || type === 'episodic') {
      // Search episodic memory
      const episodicResults = this.episodicMemory
        .filter(episode => 
          episode.content.toLowerCase().includes(query.toLowerCase()) ||
          episode.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(-limit)
        .map(episode => ({
          type: 'episodic',
          content: episode,
          relevance: this.calculateRelevance(query, episode),
          timestamp: episode.timestamp
        }));
      results.push(...episodicResults);
    }
    
    if (type === 'all' || type === 'semantic') {
      // Search semantic memory
      const semanticResults = this.semanticMemory
        .filter(concept => 
          concept.concept.toLowerCase().includes(query.toLowerCase())
        )
        .slice(-limit)
        .map(concept => ({
          type: 'semantic',
          content: concept,
          relevance: concept.importance,
          timestamp: concept.lastSeen
        }));
      results.push(...semanticResults);
    }
    
    // Sort by relevance and timestamp
    return results
      .sort((a, b) => b.relevance - a.relevance || b.timestamp - a.timestamp)
      .slice(0, limit);
  }

  // Vector similarity search (simplified)
  async findSimilarMemories(text, limit = 5) {
    if (this.embeddings.size === 0) return [];
    
    const queryEmbedding = await this.simulateEmbedding(text);
    const similarities = [];
    
    for (const [id, memory] of this.embeddings) {
      const similarity = this.cosineSimilarity(queryEmbedding, memory.embedding);
      similarities.push({
        id,
        memory,
        similarity,
        timestamp: memory.timestamp
      });
    }
    
    return similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit);
  }

  cosineSimilarity(a, b) {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }

  // Memory consolidation
  consolidateToLongTerm(item) {
    // Move important working memory items to long-term storage
    if (item.metadata && item.metadata.tokens > 100) {
      // High token conversations are considered important
      const concept = {
        type: 'consolidated_conversation',
        summary: this.summarizeConversation(item),
        originalId: item.id,
        timestamp: item.timestamp,
        importance: this.calculateImportance(item)
      };
      
      this.semanticMemory.push(concept);
    }
  }

  summarizeConversation(turn) {
    // Simple summarization (will be enhanced with LM Studio)
    const userWords = turn.userMessage.split(' ').slice(0, 10).join(' ');
    const aiWords = turn.aiResponse.split(' ').slice(0, 15).join(' ');
    return `User asked about: ${userWords}... AI responded: ${aiWords}...`;
  }

  // Memory forgetting mechanism
  forgetOldMemories() {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Remove old, low-importance episodic memories
    this.episodicMemory = this.episodicMemory.filter(episode => 
      episode.timestamp > oneWeekAgo || episode.importance > 0.7
    );
    
    // Decay semantic memory importance over time
    this.semanticMemory.forEach(concept => {
      const daysSinceLastSeen = (now - concept.lastSeen) / (24 * 60 * 60 * 1000);
      concept.importance *= Math.exp(-daysSinceLastSeen * 0.1); // Exponential decay
    });
    
    // Remove very low importance semantic memories
    this.semanticMemory = this.semanticMemory.filter(concept => 
      concept.importance > 0.1
    );
  }

  // Utility functions
  calculateImportance(turn) {
    let importance = 0.5; // Base importance
    
    // Longer conversations are more important
    if (turn.metadata.tokens > 200) importance += 0.2;
    if (turn.metadata.tokens > 500) importance += 0.2;
    
    // Questions are more important
    if (turn.userMessage.includes('?')) importance += 0.1;
    
    // Emotional content is more important
    const emotionalWords = ['love', 'hate', 'excited', 'worried', 'happy', 'sad', 'amazing', 'terrible'];
    const text = `${turn.userMessage} ${turn.aiResponse}`.toLowerCase();
    emotionalWords.forEach(word => {
      if (text.includes(word)) importance += 0.1;
    });
    
    return Math.min(importance, 1.0);
  }

  calculateRelevance(query, item) {
    const text = typeof item === 'string' ? item : 
                 item.content ? item.content :
                 item.userMessage ? `${item.userMessage} ${item.aiResponse}` : '';
    
    const queryWords = query.toLowerCase().split(/\s+/);
    const textWords = text.toLowerCase().split(/\s+/);
    
    let matches = 0;
    queryWords.forEach(word => {
      if (textWords.includes(word)) matches++;
    });
    
    return matches / queryWords.length;
  }

  extractTags(turn) {
    const text = `${turn.userMessage} ${turn.aiResponse}`.toLowerCase();
    const tags = [];
    
    // Simple tag extraction
    if (text.includes('question')) tags.push('question');
    if (text.includes('help')) tags.push('help');
    if (text.includes('learn')) tags.push('learning');
    if (text.includes('explain')) tags.push('explanation');
    if (text.includes('code') || text.includes('programming')) tags.push('technical');
    if (text.includes('feel') || text.includes('emotion')) tags.push('emotional');
    
    return tags;
  }

  // Memory statistics
  getMemoryStats() {
    return {
      conversationTurns: this.conversationHistory.length,
      episodicMemories: this.episodicMemory.length,
      semanticConcepts: this.semanticMemory.length,
      workingMemoryItems: this.workingMemory.length,
      embeddingsStored: this.embeddings.size,
      totalMemorySize: this.calculateMemorySize(),
      oldestMemory: this.conversationHistory.length > 0 ? 
        this.conversationHistory[0].timestamp : null,
      newestMemory: this.conversationHistory.length > 0 ? 
        this.conversationHistory[this.conversationHistory.length - 1].timestamp : null
    };
  }

  calculateMemorySize() {
    // Rough estimate of memory usage in KB
    const conversationSize = this.conversationHistory.length * 0.5; // ~0.5KB per turn
    const episodicSize = this.episodicMemory.length * 0.3; // ~0.3KB per episode
    const semanticSize = this.semanticMemory.length * 0.1; // ~0.1KB per concept
    const embeddingSize = this.embeddings.size * 1.5; // ~1.5KB per embedding
    
    return Math.round(conversationSize + episodicSize + semanticSize + embeddingSize);
  }

  // Persistence
  saveToStorage() {
    try {
      const memoryData = {
        conversationHistory: this.conversationHistory.slice(-100), // Keep last 100
        episodicMemory: this.episodicMemory.slice(-200), // Keep last 200
        semanticMemory: this.semanticMemory,
        memoryIndex: this.memoryIndex,
        lastSaved: new Date()
      };
      
      localStorage.setItem('digitalOrganismMemory', JSON.stringify(memoryData));
    } catch (error) {
      console.error('Failed to save memory to storage:', error);
    }
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem('digitalOrganismMemory');
      if (stored) {
        const memoryData = JSON.parse(stored);
        this.conversationHistory = memoryData.conversationHistory || [];
        this.episodicMemory = memoryData.episodicMemory || [];
        this.semanticMemory = memoryData.semanticMemory || [];
        this.memoryIndex = memoryData.memoryIndex || 0;
        
        console.log('✅ Memory loaded from storage:', this.getMemoryStats());
      }
    } catch (error) {
      console.error('Failed to load memory from storage:', error);
    }
  }

  clearMemory() {
    this.conversationHistory = [];
    this.episodicMemory = [];
    this.semanticMemory = [];
    this.workingMemory = [];
    this.embeddings.clear();
    this.memoryIndex = 0;
    
    localStorage.removeItem('digitalOrganismMemory');
    this.notifyListeners();
  }

  // Event listeners
  addListener(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notifyListeners() {
    const stats = this.getMemoryStats();
    this.listeners.forEach(callback => {
      try {
        callback(stats);
      } catch (error) {
        console.error('Memory listener error:', error);
      }
    });
  }
}

// Create singleton instance
const memoryService = new MemoryService();

export default memoryService;

