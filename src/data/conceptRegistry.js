// Concept Registry - Unified mapping of concepts across all diagrams
// This creates the "semantic web" that links related concepts across different views

export const conceptRegistry = {
  // Core Identity Concepts
  'system-prompt': {
    id: 'system-prompt',
    canonicalName: 'System Prompt',
    aliases: ['digital DNA', 'system prompt — digital DNA', 'prompt', 'instructions'],
    category: 'identity',
    biologicalAnalogy: 'DNA - the fundamental genetic code that defines organism behavior and characteristics',
    definition: 'The foundational instructions that define the AI\'s identity, behavior patterns, and core values.',
    diagramLocations: {
      'mindmap-v1': ['System prompt — digital DNA'],
      'mindmap-v2': ['System prompt — digital DNA'],
      'flowchart-v1': ['System Prompt'],
      'flowchart-v2': ['System Prompt']
    },
    relatedConcepts: ['model-weights', 'self-model', 'identity-ledger'],
    examples: [
      'Identity formation through prompt engineering',
      'Behavioral consistency across sessions',
      'Value alignment and safety constraints'
    ],
    metadata: {
      layer: 'core',
      importance: 'critical',
      mutability: 'controlled'
    }
  },

  'model-weights': {
    id: 'model-weights',
    canonicalName: 'Model Weights',
    aliases: ['learned structure', 'model weights — learned structure', 'neural parameters', 'weights'],
    category: 'identity',
    biologicalAnalogy: 'Brain structure - the physical neural pathways and synaptic connections that store memories and enable cognition',
    definition: 'The neural network parameters that encode learned knowledge, patterns, and capabilities.',
    diagramLocations: {
      'mindmap-v1': ['Model weights — learned structure'],
      'mindmap-v2': ['Model weights — learned structure'],
      'flowchart-v1': ['Model Weights'],
      'flowchart-v2': ['Model Weights']
    },
    relatedConcepts: ['system-prompt', 'reasoning-tokens', 'fine-tunes'],
    examples: [
      'Language understanding capabilities',
      'Domain-specific knowledge',
      'Reasoning and problem-solving patterns'
    ],
    metadata: {
      layer: 'core',
      importance: 'critical',
      mutability: 'immutable'
    }
  },

  'reasoning-tokens': {
    id: 'reasoning-tokens',
    canonicalName: 'Reasoning Tokens',
    aliases: ['inner monologue', 'reasoning tokens — inner monologue', 'thought process', 'working memory'],
    category: 'cognition',
    biologicalAnalogy: 'Stream of consciousness - the active mental process and inner dialogue during thinking',
    definition: 'The internal thought process and working memory during active reasoning and planning.',
    diagramLocations: {
      'mindmap-v1': ['Reasoning tokens — inner monologue'],
      'mindmap-v2': ['Reasoning tokens — inner monologue'],
      'flowchart-v1': ['Reasoning'],
      'flowchart-v2': ['Reasoning', 'Planning']
    },
    relatedConcepts: ['attention', 'working-memory', 'planning'],
    examples: [
      'Step-by-step problem solving',
      'Internal debate and reflection',
      'Planning and strategy formation'
    ],
    metadata: {
      layer: 'processing',
      importance: 'high',
      mutability: 'dynamic'
    }
  },

  // Memory System Concepts
  'short-term-memory': {
    id: 'short-term-memory',
    canonicalName: 'Short-term Memory',
    aliases: ['context window', 'short-term — context window', 'working memory', 'active memory'],
    category: 'memory',
    biologicalAnalogy: 'Working memory - the temporary storage for information being actively processed',
    definition: 'Temporary storage for immediate context and active processing, limited by context window size.',
    diagramLocations: {
      'mindmap-v1': ['Short-term — context window'],
      'mindmap-v2': ['Short-term — context window'],
      'flowchart-v1': ['Context Window'],
      'flowchart-v2': ['Context Processing']
    },
    relatedConcepts: ['long-term-memory', 'attention', 'context-window'],
    examples: [
      'Current conversation context',
      'Active task information',
      'Immediate processing buffer'
    ],
    metadata: {
      layer: 'memory',
      importance: 'high',
      mutability: 'volatile'
    }
  },

  'long-term-memory': {
    id: 'long-term-memory',
    canonicalName: 'Long-term Memory',
    aliases: ['vector store', 'long-term — vector store/files', 'persistent memory', 'knowledge base'],
    category: 'memory',
    biologicalAnalogy: 'Long-term memory - consolidated knowledge and experiences stored for future retrieval',
    definition: 'Persistent storage of knowledge, experiences, and learned patterns using vector embeddings.',
    diagramLocations: {
      'mindmap-v1': ['Long-term — vector store/files'],
      'mindmap-v2': ['Long-term — vector store/files'],
      'flowchart-v1': ['Vector Store'],
      'flowchart-v2': ['Knowledge Base']
    },
    relatedConcepts: ['episodic-memory', 'semantic-memory', 'vector-embeddings'],
    examples: [
      'Accumulated knowledge base',
      'Historical interaction patterns',
      'Learned preferences and behaviors'
    ],
    metadata: {
      layer: 'memory',
      importance: 'high',
      mutability: 'persistent'
    }
  },

  // Metabolism Concepts
  'token-consumption': {
    id: 'token-consumption',
    canonicalName: 'Token Consumption',
    aliases: ['tokens as food', 'compute budget', 'tokens as food — compute/latency budget', 'metabolic rate'],
    category: 'metabolism',
    biologicalAnalogy: 'Caloric consumption - the energy required to sustain life and activity',
    definition: 'The computational resources consumed during processing, analogous to metabolic energy consumption.',
    diagramLocations: {
      'mindmap-v1': ['Tokens as food — compute/latency budget'],
      'mindmap-v2': ['Tokens as food — compute/latency budget'],
      'flowchart-v1': ['Token Processing'],
      'flowchart-v2': ['Resource Management']
    },
    relatedConcepts: ['power-thermals', 'vram-usage', 'health-monitoring'],
    examples: [
      'Token consumption rates',
      'Computational efficiency',
      'Resource optimization strategies'
    ],
    metadata: {
      layer: 'metabolism',
      importance: 'medium',
      mutability: 'dynamic'
    }
  },

  // Embodiment Concepts
  'runtime-environment': {
    id: 'runtime-environment',
    canonicalName: 'Runtime Environment',
    aliases: ['LM Studio', 'runtime layer', 'LM Studio — runtime layer', 'execution environment'],
    category: 'embodiment',
    biologicalAnalogy: 'Cellular environment - the infrastructure that supports biological processes',
    definition: 'The software environment that hosts and executes the language model, providing operational context.',
    diagramLocations: {
      'mindmap-v1': ['LM Studio — runtime layer'],
      'mindmap-v2': ['LM Studio — runtime layer'],
      'flowchart-v1': ['Runtime'],
      'flowchart-v2': ['Execution Environment']
    },
    relatedConcepts: ['operating-system', 'gpu-cpu', 'model-files'],
    examples: [
      'Model loading and inference',
      'API endpoints and interfaces',
      'Runtime configuration and optimization'
    ],
    metadata: {
      layer: 'embodiment',
      importance: 'high',
      mutability: 'configurable'
    }
  },

  // Sensing and Action Concepts
  'perception': {
    id: 'perception',
    canonicalName: 'Perception',
    aliases: ['token stream', 'input processing', 'sensing', 'token stream — perception and speech'],
    category: 'sensing',
    biologicalAnalogy: 'Sensory organs - the mechanisms for detecting and processing environmental stimuli',
    definition: 'The process of receiving, interpreting, and understanding input from the environment.',
    diagramLocations: {
      'mindmap-v1': ['Token stream — perception and speech'],
      'mindmap-v2': ['Token stream — perception and speech'],
      'flowchart-v1': ['Input Processing'],
      'flowchart-v2': ['Perception Pipeline']
    },
    relatedConcepts: ['attention', 'input-validation', 'context-processing'],
    examples: [
      'Text input processing',
      'Multimodal input handling',
      'Environmental state detection'
    ],
    metadata: {
      layer: 'processing',
      importance: 'high',
      mutability: 'dynamic'
    }
  },

  'action': {
    id: 'action',
    canonicalName: 'Action',
    aliases: ['MCP tools', 'actuators', 'MCP tools — actuators/limbs', 'tool execution'],
    category: 'action',
    biologicalAnalogy: 'Motor system - the mechanisms for interacting with and manipulating the environment',
    definition: 'The execution of tools and functions that allow the organism to affect its environment.',
    diagramLocations: {
      'mindmap-v1': ['MCP tools — actuators/limbs'],
      'mindmap-v2': ['MCP tools — actuators/limbs'],
      'flowchart-v1': ['Tool Execution'],
      'flowchart-v2': ['Action Pipeline']
    },
    relatedConcepts: ['tool-calls', 'environment-effects', 'safety-constraints'],
    examples: [
      'File system operations',
      'API calls and integrations',
      'Environment manipulation'
    ],
    metadata: {
      layer: 'processing',
      importance: 'high',
      mutability: 'controlled'
    }
  },

  // Evolution Concepts
  'evolution': {
    id: 'evolution',
    canonicalName: 'Evolution',
    aliases: ['self-edit', 'versioning', 'adaptation', 'self-edit prompts/configs'],
    category: 'evolution',
    biologicalAnalogy: 'Genetic evolution - the process of adaptation and improvement over time',
    definition: 'The controlled modification and improvement of system components through versioning and adaptation.',
    diagramLocations: {
      'mindmap-v1': ['Self-edit prompts/configs'],
      'mindmap-v2': ['Self-edit prompts/configs'],
      'flowchart-v1': ['Evolution'],
      'flowchart-v2': ['Adaptation Pipeline']
    },
    relatedConcepts: ['versioning', 'fine-tunes', 'identity-ledger'],
    examples: [
      'Prompt optimization',
      'Configuration adaptation',
      'Behavioral refinement'
    ],
    metadata: {
      layer: 'evolution',
      importance: 'medium',
      mutability: 'controlled'
    }
  }
};

// Helper functions for concept registry operations
export const conceptUtils = {
  // Find concept by any alias or canonical name
  findConcept: (searchTerm) => {
    const normalizedSearch = searchTerm.toLowerCase();
    
    for (const [id, concept] of Object.entries(conceptRegistry)) {
      if (concept.canonicalName.toLowerCase().includes(normalizedSearch)) {
        return concept;
      }
      
      if (concept.aliases.some(alias => alias.toLowerCase().includes(normalizedSearch))) {
        return concept;
      }
    }
    
    return null;
  },

  // Get all concepts in a category
  getConceptsByCategory: (category) => {
    return Object.values(conceptRegistry).filter(concept => concept.category === category);
  },

  // Get related concepts for a given concept
  getRelatedConcepts: (conceptId) => {
    const concept = conceptRegistry[conceptId];
    if (!concept) return [];
    
    return concept.relatedConcepts.map(relatedId => conceptRegistry[relatedId]).filter(Boolean);
  },

  // Find concepts that appear in a specific diagram
  getConceptsInDiagram: (diagramId) => {
    return Object.values(conceptRegistry).filter(concept => 
      concept.diagramLocations[diagramId] && concept.diagramLocations[diagramId].length > 0
    );
  },

  // Get all diagrams where a concept appears
  getDiagramsForConcept: (conceptId) => {
    const concept = conceptRegistry[conceptId];
    if (!concept) return [];
    
    return Object.keys(concept.diagramLocations);
  },

  // Search concepts by text content
  searchConcepts: (query) => {
    const normalizedQuery = query.toLowerCase();
    
    return Object.values(conceptRegistry).filter(concept => {
      return (
        concept.canonicalName.toLowerCase().includes(normalizedQuery) ||
        concept.definition.toLowerCase().includes(normalizedQuery) ||
        concept.biologicalAnalogy.toLowerCase().includes(normalizedQuery) ||
        concept.aliases.some(alias => alias.toLowerCase().includes(normalizedQuery)) ||
        concept.examples.some(example => example.toLowerCase().includes(normalizedQuery))
      );
    });
  },

  // Get concept hierarchy by layer
  getConceptHierarchy: () => {
    const hierarchy = {};
    
    Object.values(conceptRegistry).forEach(concept => {
      const layer = concept.metadata.layer;
      if (!hierarchy[layer]) {
        hierarchy[layer] = [];
      }
      hierarchy[layer].push(concept);
    });
    
    return hierarchy;
  }
};

export default conceptRegistry;

