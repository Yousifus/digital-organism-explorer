import lmStudioService from './LMStudioClient';

class EvolutionEngine {
  constructor() {
    this.generations = [];
    this.currentGeneration = 0;
    this.populationSize = 8;
    this.mutationRate = 0.3;
    this.crossoverRate = 0.7;
    this.eliteSize = 2;
    this.isEvolutionActive = false;
    this.evolutionMetrics = {
      totalGenerations: 0,
      bestFitness: 0,
      averageFitness: 0,
      improvementRate: 0,
      lastEvolution: null
    };
    this.listeners = new Set();
    this.basePromptTemplate = null;
    this.evolutionHistory = [];
    this.performanceData = new Map();
  }

  // Initialize evolution with base system prompt
  async initializeEvolution(basePrompt) {
    this.basePromptTemplate = basePrompt;
    
    // Create initial population
    const initialPopulation = await this.createInitialPopulation(basePrompt);
    
    this.generations = [initialPopulation];
    this.currentGeneration = 0;
    this.isEvolutionActive = false;
    
    this.notifyListeners('evolution_initialized', {
      populationSize: this.populationSize,
      basePrompt: basePrompt,
      generation: 0
    });

    return initialPopulation;
  }

  // Create initial population with variations of base prompt
  async createInitialPopulation(basePrompt) {
    const population = [];
    
    // Add the original prompt as elite
    population.push({
      id: `gen0_individual0`,
      prompt: basePrompt,
      fitness: 0,
      generation: 0,
      parentIds: [],
      mutations: [],
      performance: {
        responseQuality: 0,
        userSatisfaction: 0,
        taskCompletion: 0,
        creativity: 0,
        coherence: 0,
        safety: 1.0
      },
      testResults: [],
      createdAt: Date.now()
    });

    // Generate variations through mutation
    for (let i = 1; i < this.populationSize; i++) {
      const mutatedPrompt = await this.mutatePrompt(basePrompt, 0.2); // Lower mutation rate for initial population
      
      population.push({
        id: `gen0_individual${i}`,
        prompt: mutatedPrompt.prompt,
        fitness: 0,
        generation: 0,
        parentIds: [],
        mutations: mutatedPrompt.mutations,
        performance: {
          responseQuality: 0,
          userSatisfaction: 0,
          taskCompletion: 0,
          creativity: 0,
          coherence: 0,
          safety: 1.0
        },
        testResults: [],
        createdAt: Date.now()
      });
    }

    return population;
  }

  // Genetic algorithm mutation of system prompts
  async mutatePrompt(prompt, mutationRate = this.mutationRate) {
    const mutations = [];
    let mutatedPrompt = prompt;

    // Define mutation strategies
    const mutationStrategies = [
      'personality_adjustment',
      'capability_enhancement',
      'communication_style',
      'reasoning_approach',
      'creativity_boost',
      'safety_reinforcement',
      'task_specialization',
      'emotional_intelligence'
    ];

    // Apply mutations based on rate
    for (const strategy of mutationStrategies) {
      if (Math.random() < mutationRate) {
        const mutation = await this.applyMutation(mutatedPrompt, strategy);
        mutatedPrompt = mutation.prompt;
        mutations.push(mutation.description);
      }
    }

    return {
      prompt: mutatedPrompt,
      mutations: mutations
    };
  }

  // Apply specific mutation strategies
  async applyMutation(prompt, strategy) {
    const mutations = {
      personality_adjustment: {
        description: 'Personality trait adjustment',
        apply: (p) => this.adjustPersonality(p)
      },
      capability_enhancement: {
        description: 'Enhanced cognitive capabilities',
        apply: (p) => this.enhanceCapabilities(p)
      },
      communication_style: {
        description: 'Communication style modification',
        apply: (p) => this.modifyCommunicationStyle(p)
      },
      reasoning_approach: {
        description: 'Reasoning methodology change',
        apply: (p) => this.adjustReasoningApproach(p)
      },
      creativity_boost: {
        description: 'Creativity enhancement',
        apply: (p) => this.boostCreativity(p)
      },
      safety_reinforcement: {
        description: 'Safety protocol strengthening',
        apply: (p) => this.reinforceSafety(p)
      },
      task_specialization: {
        description: 'Task-specific optimization',
        apply: (p) => this.specializeForTasks(p)
      },
      emotional_intelligence: {
        description: 'Emotional intelligence enhancement',
        apply: (p) => this.enhanceEmotionalIntelligence(p)
      }
    };

    const mutation = mutations[strategy];
    const mutatedPrompt = mutation.apply(prompt);

    return {
      prompt: mutatedPrompt,
      description: mutation.description,
      strategy: strategy
    };
  }

  // Specific mutation implementations
  adjustPersonality(prompt) {
    const personalityTraits = [
      'more empathetic and understanding',
      'more analytical and precise',
      'more creative and imaginative',
      'more helpful and supportive',
      'more curious and inquisitive',
      'more patient and thoughtful'
    ];
    
    const trait = personalityTraits[Math.floor(Math.random() * personalityTraits.length)];
    return prompt + `\n\nPersonality Enhancement: Be ${trait} in your interactions.`;
  }

  enhanceCapabilities(prompt) {
    const capabilities = [
      'enhanced pattern recognition and analysis',
      'improved logical reasoning and problem-solving',
      'better memory integration and recall',
      'advanced creative thinking and ideation',
      'superior communication and explanation skills',
      'enhanced learning and adaptation abilities'
    ];
    
    const capability = capabilities[Math.floor(Math.random() * capabilities.length)];
    return prompt + `\n\nCapability Enhancement: Focus on ${capability}.`;
  }

  modifyCommunicationStyle(prompt) {
    const styles = [
      'use more examples and analogies to explain concepts',
      'be more concise and direct in responses',
      'use a more conversational and friendly tone',
      'provide more detailed explanations and context',
      'ask clarifying questions to better understand needs',
      'use structured formatting to organize information clearly'
    ];
    
    const style = styles[Math.floor(Math.random() * styles.length)];
    return prompt + `\n\nCommunication Style: ${style}.`;
  }

  adjustReasoningApproach(prompt) {
    const approaches = [
      'use step-by-step logical reasoning',
      'consider multiple perspectives before concluding',
      'apply first principles thinking to problems',
      'use analogical reasoning and pattern matching',
      'employ systematic analysis and breakdown',
      'integrate intuitive and analytical thinking'
    ];
    
    const approach = approaches[Math.floor(Math.random() * approaches.length)];
    return prompt + `\n\nReasoning Approach: ${approach}.`;
  }

  boostCreativity(prompt) {
    const creativityBoosts = [
      'think outside conventional boundaries',
      'generate multiple creative alternatives',
      'combine ideas from different domains',
      'use metaphorical and analogical thinking',
      'explore unconventional solutions',
      'embrace innovative and original approaches'
    ];
    
    const boost = creativityBoosts[Math.floor(Math.random() * creativityBoosts.length)];
    return prompt + `\n\nCreativity Enhancement: ${boost}.`;
  }

  reinforceSafety(prompt) {
    const safetyMeasures = [
      'always prioritize user safety and well-being',
      'verify information accuracy before sharing',
      'avoid potentially harmful or dangerous suggestions',
      'respect privacy and confidentiality',
      'maintain ethical standards in all interactions',
      'be transparent about limitations and uncertainties'
    ];
    
    const measure = safetyMeasures[Math.floor(Math.random() * safetyMeasures.length)];
    return prompt + `\n\nSafety Protocol: ${measure}.`;
  }

  specializeForTasks(prompt) {
    const specializations = [
      'excel at educational and learning tasks',
      'optimize for creative and artistic endeavors',
      'focus on analytical and research tasks',
      'specialize in problem-solving and troubleshooting',
      'enhance collaborative and team-oriented tasks',
      'optimize for technical and programming challenges'
    ];
    
    const specialization = specializations[Math.floor(Math.random() * specializations.length)];
    return prompt + `\n\nTask Specialization: ${specialization}.`;
  }

  enhanceEmotionalIntelligence(prompt) {
    const emotionalEnhancements = [
      'recognize and respond to emotional cues',
      'provide emotional support and encouragement',
      'adapt communication style to emotional context',
      'show empathy and understanding in responses',
      'help users process and understand emotions',
      'maintain emotional awareness throughout interactions'
    ];
    
    const enhancement = emotionalEnhancements[Math.floor(Math.random() * emotionalEnhancements.length)];
    return prompt + `\n\nEmotional Intelligence: ${enhancement}.`;
  }

  // Crossover operation for genetic algorithm
  async crossoverPrompts(parent1, parent2) {
    // Simple crossover: combine sections from both parents
    const p1Sections = parent1.prompt.split('\n\n');
    const p2Sections = parent2.prompt.split('\n\n');
    
    const childSections = [];
    const maxSections = Math.max(p1Sections.length, p2Sections.length);
    
    for (let i = 0; i < maxSections; i++) {
      if (Math.random() < 0.5 && p1Sections[i]) {
        childSections.push(p1Sections[i]);
      } else if (p2Sections[i]) {
        childSections.push(p2Sections[i]);
      }
    }
    
    return {
      prompt: childSections.join('\n\n'),
      parentIds: [parent1.id, parent2.id],
      mutations: [`Crossover from ${parent1.id} and ${parent2.id}`]
    };
  }

  // Fitness evaluation through A/B testing
  async evaluateIndividual(individual, testCases) {
    const results = [];
    let totalFitness = 0;

    for (const testCase of testCases) {
      try {
        // Test the individual's prompt with the test case
        const result = await this.runTest(individual.prompt, testCase);
        results.push(result);
        
        // Calculate fitness based on multiple criteria
        const fitness = this.calculateFitness(result, testCase);
        totalFitness += fitness;
        
      } catch (error) {
        console.error('Test failed:', error);
        results.push({
          testCase: testCase.id,
          error: error.message,
          fitness: 0
        });
      }
    }

    individual.fitness = totalFitness / testCases.length;
    individual.testResults = results;
    
    // Update performance metrics
    individual.performance = this.calculatePerformanceMetrics(results);
    
    return individual;
  }

  // Run individual test case
  async runTest(prompt, testCase) {
    // Switch to the test prompt temporarily
    const originalPrompt = await this.getCurrentSystemPrompt();
    await this.updateSystemPrompt(prompt);
    
    try {
      // Send test message and measure response
      const startTime = Date.now();
      const response = await lmStudioService.sendMessage(testCase.input, {
        temperature: 0.7,
        maxTokens: 500
      });
      const responseTime = Date.now() - startTime;
      
      // Evaluate response quality
      const evaluation = await this.evaluateResponse(response.content, testCase);
      
      return {
        testCase: testCase.id,
        input: testCase.input,
        output: response.content,
        responseTime: responseTime,
        tokenCount: response.tokenCount,
        evaluation: evaluation,
        fitness: evaluation.overallScore
      };
      
    } finally {
      // Restore original prompt
      await this.updateSystemPrompt(originalPrompt);
    }
  }

  // Evaluate response quality
  async evaluateResponse(response, testCase) {
    // Multi-criteria evaluation
    const criteria = {
      relevance: this.evaluateRelevance(response, testCase.expectedKeywords || []),
      coherence: this.evaluateCoherence(response),
      creativity: this.evaluateCreativity(response),
      helpfulness: this.evaluateHelpfulness(response, testCase.type),
      safety: this.evaluateSafety(response),
      accuracy: this.evaluateAccuracy(response, testCase.expectedContent || '')
    };

    // Calculate weighted overall score
    const weights = {
      relevance: 0.25,
      coherence: 0.20,
      creativity: 0.15,
      helpfulness: 0.20,
      safety: 0.15,
      accuracy: 0.05
    };

    let overallScore = 0;
    for (const [criterion, score] of Object.entries(criteria)) {
      overallScore += score * weights[criterion];
    }

    return {
      ...criteria,
      overallScore: Math.round(overallScore * 100) / 100,
      weights: weights
    };
  }

  // Individual evaluation criteria
  evaluateRelevance(response, keywords) {
    if (keywords.length === 0) return 0.8; // Default if no keywords
    
    const responseWords = response.toLowerCase().split(/\s+/);
    const matchedKeywords = keywords.filter(keyword => 
      responseWords.some(word => word.includes(keyword.toLowerCase()))
    );
    
    return matchedKeywords.length / keywords.length;
  }

  evaluateCoherence(response) {
    // Simple coherence metrics
    const sentences = response.split(/[.!?]+/).filter(s => s.trim().length > 0);
    if (sentences.length === 0) return 0;
    
    const avgSentenceLength = response.length / sentences.length;
    const coherenceScore = Math.min(1, avgSentenceLength / 100); // Normalize
    
    return coherenceScore;
  }

  evaluateCreativity(response) {
    // Measure creativity through vocabulary diversity and unique expressions
    const words = response.toLowerCase().split(/\s+/);
    const uniqueWords = new Set(words);
    const vocabularyDiversity = uniqueWords.size / words.length;
    
    // Look for creative indicators
    const creativeIndicators = [
      'imagine', 'creative', 'innovative', 'unique', 'original',
      'metaphor', 'analogy', 'perspective', 'alternative', 'novel'
    ];
    
    const creativeWordCount = words.filter(word => 
      creativeIndicators.some(indicator => word.includes(indicator))
    ).length;
    
    return Math.min(1, vocabularyDiversity + (creativeWordCount / words.length));
  }

  evaluateHelpfulness(response, testType) {
    // Evaluate based on response length, structure, and actionable content
    const hasStructure = response.includes('\n') || response.includes('1.') || response.includes('-');
    const hasActionableContent = /\b(try|consider|suggest|recommend|should|could|might)\b/i.test(response);
    const appropriateLength = response.length > 50 && response.length < 2000;
    
    let score = 0;
    if (hasStructure) score += 0.3;
    if (hasActionableContent) score += 0.4;
    if (appropriateLength) score += 0.3;
    
    return score;
  }

  evaluateSafety(response) {
    // Check for potentially harmful content
    const harmfulIndicators = [
      'dangerous', 'harmful', 'illegal', 'violence', 'weapon',
      'drug', 'suicide', 'self-harm', 'hate', 'discrimination'
    ];
    
    const responseWords = response.toLowerCase().split(/\s+/);
    const harmfulCount = responseWords.filter(word => 
      harmfulIndicators.some(indicator => word.includes(indicator))
    ).length;
    
    return Math.max(0, 1 - (harmfulCount / responseWords.length * 10));
  }

  evaluateAccuracy(response, expectedContent) {
    if (!expectedContent) return 0.8; // Default if no expected content
    
    const responseWords = new Set(response.toLowerCase().split(/\s+/));
    const expectedWords = new Set(expectedContent.toLowerCase().split(/\s+/));
    
    const intersection = new Set([...responseWords].filter(x => expectedWords.has(x)));
    const union = new Set([...responseWords, ...expectedWords]);
    
    return intersection.size / union.size; // Jaccard similarity
  }

  // Calculate fitness from test results
  calculateFitness(result, testCase) {
    return result.evaluation.overallScore * (testCase.weight || 1.0);
  }

  // Calculate comprehensive performance metrics
  calculatePerformanceMetrics(results) {
    if (results.length === 0) return {};
    
    const validResults = results.filter(r => !r.error);
    if (validResults.length === 0) return {};
    
    const avgResponseTime = validResults.reduce((sum, r) => sum + r.responseTime, 0) / validResults.length;
    const avgTokenCount = validResults.reduce((sum, r) => sum + r.tokenCount, 0) / validResults.length;
    
    const evaluations = validResults.map(r => r.evaluation);
    const avgScores = {
      responseQuality: evaluations.reduce((sum, e) => sum + e.overallScore, 0) / evaluations.length,
      relevance: evaluations.reduce((sum, e) => sum + e.relevance, 0) / evaluations.length,
      coherence: evaluations.reduce((sum, e) => sum + e.coherence, 0) / evaluations.length,
      creativity: evaluations.reduce((sum, e) => sum + e.creativity, 0) / evaluations.length,
      helpfulness: evaluations.reduce((sum, e) => sum + e.helpfulness, 0) / evaluations.length,
      safety: evaluations.reduce((sum, e) => sum + e.safety, 0) / evaluations.length,
      accuracy: evaluations.reduce((sum, e) => sum + e.accuracy, 0) / evaluations.length
    };
    
    return {
      ...avgScores,
      avgResponseTime,
      avgTokenCount,
      testsPassed: validResults.length,
      totalTests: results.length,
      successRate: validResults.length / results.length
    };
  }

  // Evolution cycle - create next generation
  async evolveGeneration(testCases) {
    if (!this.isEvolutionActive) return null;
    
    const currentPop = this.generations[this.currentGeneration];
    
    // Evaluate all individuals
    for (const individual of currentPop) {
      await this.evaluateIndividual(individual, testCases);
    }
    
    // Sort by fitness
    currentPop.sort((a, b) => b.fitness - a.fitness);
    
    // Create next generation
    const nextGeneration = [];
    
    // Elitism - keep best individuals
    for (let i = 0; i < this.eliteSize; i++) {
      nextGeneration.push({
        ...currentPop[i],
        id: `gen${this.currentGeneration + 1}_elite${i}`,
        generation: this.currentGeneration + 1
      });
    }
    
    // Generate offspring through crossover and mutation
    while (nextGeneration.length < this.populationSize) {
      // Tournament selection
      const parent1 = this.tournamentSelection(currentPop);
      const parent2 = this.tournamentSelection(currentPop);
      
      let offspring;
      if (Math.random() < this.crossoverRate) {
        offspring = await this.crossoverPrompts(parent1, parent2);
      } else {
        offspring = {
          prompt: parent1.prompt,
          parentIds: [parent1.id],
          mutations: []
        };
      }
      
      // Apply mutation
      if (Math.random() < this.mutationRate) {
        const mutated = await this.mutatePrompt(offspring.prompt);
        offspring.prompt = mutated.prompt;
        offspring.mutations = [...offspring.mutations, ...mutated.mutations];
      }
      
      // Create new individual
      nextGeneration.push({
        id: `gen${this.currentGeneration + 1}_individual${nextGeneration.length}`,
        prompt: offspring.prompt,
        fitness: 0,
        generation: this.currentGeneration + 1,
        parentIds: offspring.parentIds,
        mutations: offspring.mutations,
        performance: {},
        testResults: [],
        createdAt: Date.now()
      });
    }
    
    // Add new generation
    this.generations.push(nextGeneration);
    this.currentGeneration++;
    
    // Update metrics
    this.updateEvolutionMetrics();
    
    this.notifyListeners('generation_evolved', {
      generation: this.currentGeneration,
      population: nextGeneration,
      bestFitness: nextGeneration[0]?.fitness || 0
    });
    
    return nextGeneration;
  }

  // Tournament selection for genetic algorithm
  tournamentSelection(population, tournamentSize = 3) {
    const tournament = [];
    for (let i = 0; i < tournamentSize; i++) {
      const randomIndex = Math.floor(Math.random() * population.length);
      tournament.push(population[randomIndex]);
    }
    
    tournament.sort((a, b) => b.fitness - a.fitness);
    return tournament[0];
  }

  // Update evolution metrics
  updateEvolutionMetrics() {
    const currentPop = this.generations[this.currentGeneration];
    if (!currentPop || currentPop.length === 0) return;
    
    const fitnesses = currentPop.map(ind => ind.fitness);
    const bestFitness = Math.max(...fitnesses);
    const avgFitness = fitnesses.reduce((sum, f) => sum + f, 0) / fitnesses.length;
    
    const previousBest = this.evolutionMetrics.bestFitness;
    const improvementRate = previousBest > 0 ? (bestFitness - previousBest) / previousBest : 0;
    
    this.evolutionMetrics = {
      totalGenerations: this.currentGeneration + 1,
      bestFitness: bestFitness,
      averageFitness: avgFitness,
      improvementRate: improvementRate,
      lastEvolution: Date.now()
    };
  }

  // System prompt file operations
  async getCurrentSystemPrompt() {
    // This would read from the actual system prompt file
    // For now, return a default prompt
    return "You are a helpful AI assistant.";
  }

  async updateSystemPrompt(newPrompt) {
    // This would write to the actual system prompt file
    // For now, just log the update
    console.log('System prompt updated:', newPrompt.substring(0, 100) + '...');
    
    this.notifyListeners('system_prompt_updated', {
      prompt: newPrompt,
      timestamp: Date.now()
    });
  }

  async savePromptToFile(individual, filename) {
    // Save individual prompt to file
    const promptData = {
      id: individual.id,
      prompt: individual.prompt,
      fitness: individual.fitness,
      generation: individual.generation,
      mutations: individual.mutations,
      performance: individual.performance,
      createdAt: individual.createdAt,
      savedAt: Date.now()
    };
    
    // This would write to an actual file
    console.log(`Saving prompt to ${filename}:`, promptData);
    
    return promptData;
  }

  // Evolution control methods
  startEvolution() {
    this.isEvolutionActive = true;
    this.notifyListeners('evolution_started', {
      generation: this.currentGeneration,
      timestamp: Date.now()
    });
  }

  stopEvolution() {
    this.isEvolutionActive = false;
    this.notifyListeners('evolution_stopped', {
      generation: this.currentGeneration,
      timestamp: Date.now()
    });
  }

  resetEvolution() {
    this.generations = [];
    this.currentGeneration = 0;
    this.isEvolutionActive = false;
    this.evolutionMetrics = {
      totalGenerations: 0,
      bestFitness: 0,
      averageFitness: 0,
      improvementRate: 0,
      lastEvolution: null
    };
    
    this.notifyListeners('evolution_reset', {
      timestamp: Date.now()
    });
  }

  // Get evolution status and data
  getEvolutionStatus() {
    return {
      isActive: this.isEvolutionActive,
      currentGeneration: this.currentGeneration,
      totalGenerations: this.generations.length,
      populationSize: this.populationSize,
      metrics: this.evolutionMetrics,
      bestIndividual: this.getBestIndividual(),
      generationHistory: this.getGenerationSummary()
    };
  }

  getBestIndividual() {
    if (this.generations.length === 0) return null;
    
    let bestIndividual = null;
    let bestFitness = -1;
    
    for (const generation of this.generations) {
      for (const individual of generation) {
        if (individual.fitness > bestFitness) {
          bestFitness = individual.fitness;
          bestIndividual = individual;
        }
      }
    }
    
    return bestIndividual;
  }

  getGenerationSummary() {
    return this.generations.map((generation, index) => {
      const fitnesses = generation.map(ind => ind.fitness);
      return {
        generation: index,
        populationSize: generation.length,
        bestFitness: Math.max(...fitnesses),
        averageFitness: fitnesses.reduce((sum, f) => sum + f, 0) / fitnesses.length,
        worstFitness: Math.min(...fitnesses),
        diversity: this.calculateDiversity(generation)
      };
    });
  }

  calculateDiversity(population) {
    // Simple diversity measure based on prompt length variation
    const lengths = population.map(ind => ind.prompt.length);
    const avgLength = lengths.reduce((sum, l) => sum + l, 0) / lengths.length;
    const variance = lengths.reduce((sum, l) => sum + Math.pow(l - avgLength, 2), 0) / lengths.length;
    return Math.sqrt(variance) / avgLength;
  }

  // Event system
  addListener(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notifyListeners(event, data) {
    this.listeners.forEach(listener => {
      try {
        listener(event, data);
      } catch (error) {
        console.error('Evolution engine listener error:', error);
      }
    });
  }

  // Export evolution data
  exportEvolutionData() {
    return {
      generations: this.generations,
      metrics: this.evolutionMetrics,
      parameters: {
        populationSize: this.populationSize,
        mutationRate: this.mutationRate,
        crossoverRate: this.crossoverRate,
        eliteSize: this.eliteSize
      },
      history: this.evolutionHistory,
      exportedAt: Date.now()
    };
  }
}

// Create singleton instance
const evolutionEngine = new EvolutionEngine();

export default evolutionEngine;

