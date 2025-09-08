import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MermaidDiagram from './MermaidDiagram';

const DiagramViewer = ({ onNodeClick, onNodeHover }) => {
  const [diagrams, setDiagrams] = useState({});
  const [selectedNode, setSelectedNode] = useState(null);
  const [loading, setLoading] = useState(true);

  // Diagram metadata
  const diagramInfo = {
    'mindmap-v1': {
      title: 'Digital Organism Core',
      description: 'Core identity, embodiment, memory, and ecosystem components',
      category: 'Architecture'
    },
    'mindmap-v2': {
      title: 'Extended Organism Taxonomy',
      description: 'Expanded taxonomy with governance, temporality, and detailed memory systems',
      category: 'Architecture'
    },
    'flowchart-v1': {
      title: 'Basic Processing Pipeline',
      description: 'Minimal Inputs→Reasoning→Action→Memory pipeline with runtime',
      category: 'Process Flow'
    },
    'flowchart-v2': {
      title: 'Complete Processing Pipeline',
      description: 'Full Perception→Cognition→Action pipeline with governance and homeostasis',
      category: 'Process Flow'
    },
    'lifecycle-state-machine': {
      title: 'Organism Lifecycle',
      description: 'Complete lifecycle state machine from Init to Shutdown',
      category: 'State Machine'
    }
  };

  useEffect(() => {
    // Load diagram files
    const loadDiagrams = async () => {
      try {
        setLoading(true);
        const diagramFiles = [
          'mindmap-v1.mmd',
          'mindmap-v2.mmd', 
          'flowchart-v1.mmd',
          'flowchart-v2.mmd',
          'lifecycle-state-machine.mmd'
        ];

        const loadedDiagrams = {};
        
        for (const file of diagramFiles) {
          try {
            // In a real app, you'd fetch from /data/diagrams/
            // For now, we'll use placeholder content
            const response = await fetch(`/data/diagrams/${file}`);
            if (response.ok) {
              const content = await response.text();
              const key = file.replace('.mmd', '');
              loadedDiagrams[key] = content;
            } else {
              // Fallback to demo content if files aren't accessible
              loadedDiagrams[file.replace('.mmd', '')] = getDemoContent(file);
            }
          } catch (error) {
            console.warn(`Failed to load ${file}, using demo content`);
            loadedDiagrams[file.replace('.mmd', '')] = getDemoContent(file);
          }
        }

        setDiagrams(loadedDiagrams);
        setLoading(false);
      } catch (error) {
        console.error('Error loading diagrams:', error);
        setLoading(false);
      }
    };

    loadDiagrams();
  }, []);

  // Demo content for when files aren't accessible
  const getDemoContent = (filename) => {
    const demoContent = {
      'mindmap-v1.mmd': `mindmap
  root((Digital Organism))
    Core Identity
      System Prompt
      Model Weights
      Reasoning Tokens
    Embodiment
      Model File
      Working Directory
      Config Files
    Memory
      Short-term
      Long-term
      Episodic
    Sensing & Action
      Token Stream
      MCP Tools
      File System
      APIs
    Computation
      LM Studio
      Operating System
      GPU/CPU
    Metabolism
      Tokens as Food
      Power/Thermals
    Evolution
      Self-edit
      Versioning
      Fine-tunes
    Ecosystem
      User/Operator
      Other Agents
      Data Sources`,
      
      'mindmap-v2.mmd': `mindmap
  root((Digital Organism))
    Core Identity
      System Prompt
      Model Weights
      Reasoning Tokens
      Self-model
      Values/Goals
      Signature/Keys
    Embodiment
      Model File
      Working Directory
      Config Files
      Process/Ports
    Memory
      Short-term
      Long-term
      Episodic
      Semantic
      Procedural
      Affective
      Social
      Identity Ledger
    Sensing & Action
      Token Stream
      MCP Tools
      File System
      APIs/Network
      Event Listeners
      Affordances Registry
    Computation
      LM Studio
      Operating System
      GPU/CPU
      Machine
      Scheduler
    Metabolism
      Tokens as Food
      Power/Thermals
      VRAM/Disk
      Health
    Evolution
      Self-edit
      Versioning
      Fine-tunes
      Canary/Sandbox
      Human-in-the-loop
    Ecosystem
      User/Operator
      Other Agents
      Data Sources
      Governance
      Network/Locality
    Temporality
      Clock/Time Sense
      Session Continuity
      Lifecycle Markers`,
      
      'flowchart-v1.mmd': `flowchart TD
    A[Inputs: tokens, files, sensors] --> B{Reasoning tokens and planning}
    B --> C[Tool call via MCP]
    B --> D[Output tokens]
    C --> E[Environment effects: files and APIs]
    E --> F[Memory update: short, long, episodic]
    F --> B
    D --> G[Human feedback]
    G --> B
    F --> H{System or config edits}
    H --> I[Version and backup]`,
    
      'flowchart-v2.mmd': `flowchart TD
    subgraph Perception
        A[Inputs: tokens, files, sensors, events]
        TIN[Token stream]
        FIN[File changes]
        APIIN[APIs/webhooks]
    end
    subgraph Cognition
        B{Reasoning tokens + planning}
        ATTN[Attention/working memory]
        WM[World model]
        GOALS[Goal store/values]
        SELF[Self-model/identity]
        CRIT[Critic/reflection]
        POL[Policy/selection]
    end
    subgraph Action
        C[Tool call via MCP]
        D[Output tokens]
        EFFECTS[Environment effects]
    end
    subgraph Memory
        F[Memory update]
        VEC[Vector store/files]
        EPI[Journals/timelines]
    end
    A --> B
    B --> C
    B --> D
    C --> EFFECTS
    EFFECTS --> F
    F --> B
    D --> G[Human feedback]
    G --> B`,
    
      'lifecycle-state-machine.mmd': `stateDiagram-v2
    [*] --> Init
    Init --> Boot: load model + system prompt + configs
    Boot --> Idle: health OK
    Idle --> Perceive: input tokens/events
    Perceive --> Plan: reasoning tokens
    Plan --> Act: choose tools/output
    Act --> Learn: write memories
    Learn --> Reflect: self-eval/critique
    Reflect --> Idle
    Reflect --> Evolve: propose edits/updates
    Evolve --> Review: sandbox + HITL
    Review --> Deploy: approved
    Deploy --> Idle
    Review --> Rollback: rejected
    Rollback --> Idle
    Perceive --> Error: tool failure
    Error --> Recover: retry/fallback
    Recover --> Idle
    Idle --> Sleep: low budget/thermals
    Sleep --> Idle: resume
    Idle --> Shutdown: save state + exit
    Shutdown --> [*]`
    };
    
    return demoContent[filename] || 'graph TD\n    A[Demo Content] --> B[Loading...]';
  };

  const handleNodeClick = (nodeData) => {
    setSelectedNode(nodeData);
    onNodeClick?.(nodeData);
  };

  const handleNodeHover = (nodeData) => {
    onNodeHover?.(nodeData);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Tabs defaultValue="mindmap-v1" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          {Object.keys(diagramInfo).map((key) => (
            <TabsTrigger key={key} value={key} className="text-xs">
              {diagramInfo[key].title.split(' ')[0]}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {Object.entries(diagrams).map(([key, content]) => (
          <TabsContent key={key} value={key} className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    {diagramInfo[key]?.title || key}
                  </CardTitle>
                  <Badge variant="secondary">
                    {diagramInfo[key]?.category || 'Diagram'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {diagramInfo[key]?.description || 'Digital organism diagram'}
                </p>
              </CardHeader>
              <CardContent>
                <MermaidDiagram
                  diagram={content}
                  title=""
                  onNodeClick={handleNodeClick}
                  onNodeHover={handleNodeHover}
                  className="h-[600px]"
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      
      {selectedNode && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-lg">Selected Node</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>ID:</strong> {selectedNode.id}</p>
              <p><strong>Text:</strong> {selectedNode.text}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Click on diagram nodes to explore their details and relationships.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DiagramViewer;

