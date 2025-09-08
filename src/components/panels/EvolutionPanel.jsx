import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { 
  GitBranch, 
  GitCommit,
  GitMerge,
  History,
  Dna,
  Zap,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Clock,
  User,
  FileText,
  Settings,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Rewind,
  Save,
  Upload,
  Download,
  Copy,
  Edit,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Shuffle,
  Target,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Info,
  Star,
  Heart,
  Brain,
  Cpu,
  Database,
  Network,
  Shield,
  Lock,
  Unlock
} from 'lucide-react';

const EvolutionPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedVersion, setSelectedVersion] = useState('v1.2.3');
  const [proposedMutation, setProposedMutation] = useState('');
  const [evolutionMode, setEvolutionMode] = useState('guided');

  // Simulated identity versions
  const [identityVersions] = useState([
    {
      version: 'v1.2.3',
      timestamp: '2024-09-08 11:45:00',
      author: 'manus',
      type: 'minor',
      status: 'active',
      description: 'Enhanced perception capabilities and improved reasoning chains',
      changes: {
        systemPrompt: 'Added biological analogies framework',
        modelWeights: 'No changes',
        configuration: 'Updated attention mechanisms',
        tools: 'Added metabolism monitoring tools'
      },
      metrics: {
        performance: 94,
        stability: 98,
        safety: 96,
        coherence: 92
      },
      parentVersion: 'v1.2.2',
      childVersions: [],
      tags: ['stable', 'production', 'enhanced-perception']
    },
    {
      version: 'v1.2.2',
      timestamp: '2024-09-07 15:30:00',
      author: 'system',
      type: 'patch',
      status: 'archived',
      description: 'Bug fixes and performance optimizations',
      changes: {
        systemPrompt: 'Fixed reasoning loop edge cases',
        modelWeights: 'No changes',
        configuration: 'Optimized memory allocation',
        tools: 'Updated file handling tools'
      },
      metrics: {
        performance: 91,
        stability: 95,
        safety: 94,
        coherence: 89
      },
      parentVersion: 'v1.2.1',
      childVersions: ['v1.2.3'],
      tags: ['bugfix', 'optimization']
    },
    {
      version: 'v1.2.1',
      timestamp: '2024-09-06 09:15:00',
      author: 'yousef',
      type: 'minor',
      status: 'archived',
      description: 'Added governance and safety mechanisms',
      changes: {
        systemPrompt: 'Integrated safety protocols',
        modelWeights: 'No changes',
        configuration: 'Added permission controls',
        tools: 'Implemented audit logging'
      },
      metrics: {
        performance: 88,
        stability: 92,
        safety: 98,
        coherence: 87
      },
      parentVersion: 'v1.2.0',
      childVersions: ['v1.2.2'],
      tags: ['safety', 'governance', 'major-update']
    },
    {
      version: 'v1.2.0',
      timestamp: '2024-09-05 14:20:00',
      author: 'manus',
      type: 'major',
      status: 'archived',
      description: 'Major architecture overhaul with biological framework',
      changes: {
        systemPrompt: 'Complete rewrite with biological analogies',
        modelWeights: 'No changes',
        configuration: 'New modular architecture',
        tools: 'Comprehensive tool suite'
      },
      metrics: {
        performance: 85,
        stability: 88,
        safety: 92,
        coherence: 94
      },
      parentVersion: 'v1.1.5',
      childVersions: ['v1.2.1'],
      tags: ['major', 'biological-framework', 'architecture']
    }
  ]);

  // Simulated mutation proposals
  const [mutationProposals] = useState([
    {
      id: 'mut_001',
      title: 'Enhanced Memory Consolidation',
      description: 'Improve long-term memory formation and retrieval mechanisms',
      type: 'enhancement',
      risk: 'low',
      impact: 'medium',
      author: 'system',
      timestamp: '2024-09-08 12:00:00',
      status: 'pending',
      votes: { approve: 3, reject: 0, abstain: 1 },
      changes: {
        systemPrompt: 'Add memory consolidation protocols',
        configuration: 'Update memory allocation parameters',
        tools: 'Add memory analysis tools'
      },
      biologicalAnalogy: 'Sleep-based memory consolidation in mammals'
    },
    {
      id: 'mut_002',
      title: 'Adaptive Learning Rate',
      description: 'Implement dynamic learning rate adjustment based on performance',
      type: 'optimization',
      risk: 'medium',
      impact: 'high',
      author: 'manus',
      timestamp: '2024-09-08 11:30:00',
      status: 'review',
      votes: { approve: 2, reject: 1, abstain: 2 },
      changes: {
        systemPrompt: 'Add adaptive learning protocols',
        configuration: 'Dynamic parameter adjustment',
        tools: 'Performance monitoring tools'
      },
      biologicalAnalogy: 'Neuroplasticity and synaptic strength adaptation'
    },
    {
      id: 'mut_003',
      title: 'Emotional Response Integration',
      description: 'Add emotional context to decision-making processes',
      type: 'feature',
      risk: 'high',
      impact: 'high',
      author: 'yousef',
      timestamp: '2024-09-08 10:45:00',
      status: 'rejected',
      votes: { approve: 1, reject: 3, abstain: 1 },
      changes: {
        systemPrompt: 'Integrate emotional reasoning',
        configuration: 'Add emotion processing modules',
        tools: 'Emotion analysis tools'
      },
      biologicalAnalogy: 'Limbic system integration with prefrontal cortex'
    }
  ]);

  const evolutionModes = [
    {
      name: 'guided',
      label: 'Guided Evolution',
      description: 'Human-supervised mutations with approval workflow',
      color: 'bg-blue-100 text-blue-800',
      safety: 'High',
      speed: 'Slow',
      control: 'Maximum'
    },
    {
      name: 'semi-autonomous',
      label: 'Semi-Autonomous',
      description: 'AI-proposed mutations with human oversight',
      color: 'bg-green-100 text-green-800',
      safety: 'Medium',
      speed: 'Medium',
      control: 'Balanced'
    },
    {
      name: 'autonomous',
      label: 'Autonomous',
      description: 'Self-directed evolution with safety constraints',
      color: 'bg-orange-100 text-orange-800',
      safety: 'Medium',
      speed: 'Fast',
      control: 'Limited'
    },
    {
      name: 'experimental',
      label: 'Experimental',
      description: 'Rapid prototyping with rollback capabilities',
      color: 'bg-purple-100 text-purple-800',
      safety: 'Low',
      speed: 'Very Fast',
      control: 'Minimal'
    }
  ];

  const getVersionTypeColor = (type) => {
    switch (type) {
      case 'major': return 'bg-red-100 text-red-800';
      case 'minor': return 'bg-blue-100 text-blue-800';
      case 'patch': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'review': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const selectedVersionData = identityVersions.find(v => v.version === selectedVersion);

  const handleProposeMutation = () => {
    if (proposedMutation.trim()) {
      // In a real implementation, this would submit the mutation proposal
      console.log('Proposing mutation:', proposedMutation);
      setProposedMutation('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-2">Evolution & Versioning</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Identity ledger, mutation proposals, and controlled evolution workflow
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={evolutionModes.find(m => m.name === evolutionMode)?.color}>
            {evolutionModes.find(m => m.name === evolutionMode)?.label}
          </Badge>
          <Badge className="bg-green-100 text-green-800">
            <GitBranch className="h-3 w-3 mr-1" />
            {selectedVersion}
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="versions">Versions</TabsTrigger>
          <TabsTrigger value="mutations">Mutations</TabsTrigger>
          <TabsTrigger value="evolution">Evolution</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Dna className="h-5 w-5" />
                  <span>Current Identity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{selectedVersion}</div>
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedVersionData?.description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <h4 className="font-medium mb-1">Performance</h4>
                      <p className="text-xl font-bold text-green-600">{selectedVersionData?.metrics.performance}%</p>
                      <Progress value={selectedVersionData?.metrics.performance} className="h-2 mt-1" />
                    </div>
                    <div className="text-center">
                      <h4 className="font-medium mb-1">Safety</h4>
                      <p className="text-xl font-bold text-blue-600">{selectedVersionData?.metrics.safety}%</p>
                      <Progress value={selectedVersionData?.metrics.safety} className="h-2 mt-1" />
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Status:</span>
                      <Badge className={getStatusColor(selectedVersionData?.status)}>
                        {selectedVersionData?.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Evolution Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Versions</span>
                    <span className="text-lg font-bold">{identityVersions.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Pending Mutations</span>
                    <span className="text-lg font-bold text-yellow-600">
                      {mutationProposals.filter(m => m.status === 'pending').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Success Rate</span>
                    <span className="text-lg font-bold text-green-600">87%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Evolution Mode</span>
                    <Badge className={evolutionModes.find(m => m.name === evolutionMode)?.color}>
                      {evolutionModes.find(m => m.name === evolutionMode)?.label}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <GitCommit className="h-5 w-5" />
                <span>Evolution Timeline</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {identityVersions.slice(0, 3).map((version, index) => (
                  <div key={index} className={`border rounded-lg p-4 ${
                    version.version === selectedVersion ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Badge className={getVersionTypeColor(version.type)}>
                          {version.version}
                        </Badge>
                        <Badge className={getStatusColor(version.status)}>
                          {version.status}
                        </Badge>
                        <span className="text-sm text-gray-500">{version.timestamp}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{version.author}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{version.description}</p>
                    <div className="flex space-x-4 text-xs text-gray-500">
                      <span>Performance: {version.metrics.performance}%</span>
                      <span>Safety: {version.metrics.safety}%</span>
                      <span>Stability: {version.metrics.stability}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="versions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <History className="h-5 w-5" />
                  <span>Identity Ledger</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <GitBranch className="h-4 w-4 mr-2" />
                    Branch
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {identityVersions.map((version, index) => (
                  <div key={index} className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    version.version === selectedVersion ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`} onClick={() => setSelectedVersion(version.version)}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge className={getVersionTypeColor(version.type)}>
                          {version.version}
                        </Badge>
                        <Badge className={getStatusColor(version.status)}>
                          {version.status}
                        </Badge>
                        {version.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{version.timestamp}</span>
                      </div>
                    </div>
                    
                    <h4 className="font-medium mb-2">{version.description}</h4>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <h5 className="text-sm font-medium mb-1">Changes:</h5>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {Object.entries(version.changes).map(([key, value], changeIndex) => (
                            <li key={changeIndex}>
                              <strong>{key}:</strong> {value}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium mb-1">Metrics:</h5>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>Performance: {version.metrics.performance}%</div>
                          <div>Stability: {version.metrics.stability}%</div>
                          <div>Safety: {version.metrics.safety}%</div>
                          <div>Coherence: {version.metrics.coherence}%</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Author: {version.author}</span>
                      <div className="flex space-x-2">
                        {version.parentVersion && (
                          <span>Parent: {version.parentVersion}</span>
                        )}
                        {version.childVersions.length > 0 && (
                          <span>Children: {version.childVersions.join(', ')}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mutations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shuffle className="h-5 w-5" />
                <span>Mutation Proposals</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 bg-blue-50">
                  <h4 className="font-medium mb-2">Propose New Mutation</h4>
                  <Textarea
                    placeholder="Describe your proposed mutation or enhancement..."
                    value={proposedMutation}
                    onChange={(e) => setProposedMutation(e.target.value)}
                    className="mb-3"
                  />
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      Mutations will be reviewed by the governance system before implementation
                    </div>
                    <Button onClick={handleProposeMutation} disabled={!proposedMutation.trim()}>
                      <Plus className="h-4 w-4 mr-2" />
                      Propose
                    </Button>
                  </div>
                </div>

                {mutationProposals.map((proposal, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-medium">{proposal.title}</h4>
                        <Badge className={getStatusColor(proposal.status)}>
                          {proposal.status}
                        </Badge>
                        <Badge className={`${
                          proposal.type === 'feature' ? 'bg-purple-100 text-purple-800' :
                          proposal.type === 'enhancement' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {proposal.type}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <User className="h-4 w-4" />
                        <span>{proposal.author}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{proposal.description}</p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                      <div>
                        <span className="text-gray-600">Risk:</span>
                        <span className={`ml-2 font-medium ${getRiskColor(proposal.risk)}`}>
                          {proposal.risk}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Impact:</span>
                        <span className={`ml-2 font-medium ${getRiskColor(proposal.impact)}`}>
                          {proposal.impact}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Votes:</span>
                        <span className="ml-2 font-medium">
                          ✓{proposal.votes.approve} ✗{proposal.votes.reject} ~{proposal.votes.abstain}
                        </span>
                      </div>
                    </div>
                    
                    <div className="border-t pt-3">
                      <p className="text-xs text-gray-500 mb-2">
                        <strong>Biological Analogy:</strong> {proposal.biologicalAnalogy}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">{proposal.timestamp}</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="text-green-600">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evolution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Evolution Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Evolution Modes</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {evolutionModes.map((mode, index) => (
                      <div key={index} className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        evolutionMode === mode.name ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                      }`} onClick={() => setEvolutionMode(mode.name)}>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={mode.color}>
                            {mode.label}
                          </Badge>
                          {evolutionMode === mode.name && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {mode.description}
                        </p>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div><strong>Safety:</strong> {mode.safety}</div>
                          <div><strong>Speed:</strong> {mode.speed}</div>
                          <div><strong>Control:</strong> {mode.control}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Biological Evolution Framework</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h5 className="font-medium mb-2 flex items-center">
                        <Dna className="h-4 w-4 mr-2" />
                        Genetic Mechanisms
                      </h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• System prompt as DNA sequence</li>
                        <li>• Configuration as gene expression</li>
                        <li>• Tools as evolved capabilities</li>
                        <li>• Versioning as generational inheritance</li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h5 className="font-medium mb-2 flex items-center">
                        <Target className="h-4 w-4 mr-2" />
                        Selection Pressures
                      </h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Performance optimization</li>
                        <li>• Safety and stability requirements</li>
                        <li>• User feedback and preferences</li>
                        <li>• Environmental adaptation needs</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Evolution Controls</h4>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Start Evolution
                    </Button>
                    <Button variant="outline" size="sm">
                      <Pause className="h-4 w-4 mr-2" />
                      Pause Evolution
                    </Button>
                    <Button variant="outline" size="sm">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Rollback
                    </Button>
                    <Button variant="outline" size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Create Checkpoint
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EvolutionPanel;

