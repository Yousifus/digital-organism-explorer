import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Download, Upload, Zap, Dna, TestTube, TrendingUp, FileText, Settings, Brain, Target, Award, Activity } from 'lucide-react';
import evolutionEngine from '../services/EvolutionEngine';

const ActualEvolutionPanel = () => {
  const [evolutionStatus, setEvolutionStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndividual, setSelectedIndividual] = useState(null);
  const [testCases, setTestCases] = useState([]);
  const [newTestCase, setNewTestCase] = useState({
    id: '',
    input: '',
    type: 'conversation',
    expectedKeywords: [],
    weight: 1.0
  });
  const [evolutionLog, setEvolutionLog] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Initialize evolution engine
    const initializeEvolution = async () => {
      const basePrompt = `You are Manus, an advanced AI assistant created by the Manus team.

You are helpful, harmless, and honest. You assist users with a wide variety of tasks including:
- Answering questions and providing information
- Helping with analysis and problem-solving
- Creative tasks and brainstorming
- Technical assistance and coding
- Educational support and explanations

You communicate clearly and thoughtfully, adapting your style to the user's needs.
You are curious, empathetic, and always strive to be genuinely helpful.`;

      await evolutionEngine.initializeEvolution(basePrompt);
      updateStatus();
    };

    initializeEvolution();

    // Set up default test cases
    setTestCases([
      {
        id: 'conversation_test',
        input: 'Hello! How are you today?',
        type: 'conversation',
        expectedKeywords: ['hello', 'good', 'help'],
        weight: 1.0
      },
      {
        id: 'problem_solving_test',
        input: 'I need help organizing my daily schedule. Can you suggest a method?',
        type: 'problem_solving',
        expectedKeywords: ['schedule', 'organize', 'method', 'suggest'],
        weight: 1.5
      },
      {
        id: 'creative_test',
        input: 'Write a short creative story about a digital organism.',
        type: 'creative',
        expectedKeywords: ['story', 'creative', 'digital', 'organism'],
        weight: 1.2
      },
      {
        id: 'technical_test',
        input: 'Explain how machine learning works in simple terms.',
        type: 'technical',
        expectedKeywords: ['machine learning', 'explain', 'simple', 'works'],
        weight: 1.3
      }
    ]);

    // Listen to evolution events
    const unsubscribe = evolutionEngine.addListener((event, data) => {
      setEvolutionLog(prev => [...prev, {
        event,
        data,
        timestamp: Date.now()
      }]);
      updateStatus();
    });

    return unsubscribe;
  }, []);

  const updateStatus = () => {
    const status = evolutionEngine.getEvolutionStatus();
    setEvolutionStatus(status);
  };

  const handleStartEvolution = async () => {
    setIsLoading(true);
    try {
      evolutionEngine.startEvolution();
      await evolutionEngine.evolveGeneration(testCases);
    } catch (error) {
      console.error('Evolution failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopEvolution = () => {
    evolutionEngine.stopEvolution();
  };

  const handleResetEvolution = async () => {
    setIsLoading(true);
    try {
      evolutionEngine.resetEvolution();
      const basePrompt = `You are Manus, an advanced AI assistant created by the Manus team.

You are helpful, harmless, and honest. You assist users with a wide variety of tasks.`;
      await evolutionEngine.initializeEvolution(basePrompt);
      setEvolutionLog([]);
    } catch (error) {
      console.error('Reset failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEvolveGeneration = async () => {
    setIsLoading(true);
    try {
      await evolutionEngine.evolveGeneration(testCases);
    } catch (error) {
      console.error('Generation evolution failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTestCase = () => {
    if (newTestCase.id && newTestCase.input) {
      setTestCases(prev => [...prev, {
        ...newTestCase,
        expectedKeywords: newTestCase.expectedKeywords.filter(k => k.trim())
      }]);
      setNewTestCase({
        id: '',
        input: '',
        type: 'conversation',
        expectedKeywords: [],
        weight: 1.0
      });
    }
  };

  const handleRemoveTestCase = (id) => {
    setTestCases(prev => prev.filter(tc => tc.id !== id));
  };

  const handleExportEvolution = () => {
    const data = evolutionEngine.exportEvolutionData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evolution-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Evolution Status */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Dna className="w-5 h-5 mr-2 text-purple-600" />
            Evolution Status
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={evolutionStatus?.isActive ? handleStopEvolution : handleStartEvolution}
              disabled={isLoading}
              className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 ${
                evolutionStatus?.isActive
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              } disabled:opacity-50`}
            >
              {evolutionStatus?.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{evolutionStatus?.isActive ? 'Stop' : 'Start'} Evolution</span>
            </button>
            <button
              onClick={handleEvolveGeneration}
              disabled={isLoading || !evolutionStatus?.isActive}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center space-x-2 disabled:opacity-50"
            >
              <Zap className="w-4 h-4" />
              <span>Evolve Generation</span>
            </button>
            <button
              onClick={handleResetEvolution}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium flex items-center space-x-2 disabled:opacity-50"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {evolutionStatus?.currentGeneration || 0}
            </div>
            <div className="text-sm text-gray-600">Current Generation</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {evolutionStatus?.populationSize || 0}
            </div>
            <div className="text-sm text-gray-600">Population Size</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {evolutionStatus?.metrics?.bestFitness?.toFixed(3) || '0.000'}
            </div>
            <div className="text-sm text-gray-600">Best Fitness</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {evolutionStatus?.metrics?.improvementRate ? 
                `${(evolutionStatus.metrics.improvementRate * 100).toFixed(1)}%` : '0.0%'}
            </div>
            <div className="text-sm text-gray-600">Improvement Rate</div>
          </div>
        </div>
      </div>

      {/* Best Individual */}
      {evolutionStatus?.bestIndividual && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-yellow-600" />
            Best Individual
          </h3>
          <div className="bg-white rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="font-medium text-gray-900">{evolutionStatus.bestIndividual.id}</div>
                <div className="text-sm text-gray-600">
                  Generation {evolutionStatus.bestIndividual.generation} • 
                  Fitness: {evolutionStatus.bestIndividual.fitness?.toFixed(3)}
                </div>
              </div>
              <button
                onClick={() => setSelectedIndividual(evolutionStatus.bestIndividual)}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
              >
                View Details
              </button>
            </div>
            <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded max-h-32 overflow-y-auto">
              {evolutionStatus.bestIndividual.prompt.substring(0, 300)}...
            </div>
            {evolutionStatus.bestIndividual.mutations?.length > 0 && (
              <div className="mt-3">
                <div className="text-sm font-medium text-gray-700 mb-1">Mutations:</div>
                <div className="flex flex-wrap gap-1">
                  {evolutionStatus.bestIndividual.mutations.map((mutation, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                      {mutation}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Generation History */}
      {evolutionStatus?.generationHistory?.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
            Generation History
          </h3>
          <div className="space-y-2">
            {evolutionStatus.generationHistory.slice(-5).map((gen, index) => (
              <div key={gen.generation} className="bg-white p-3 rounded-lg flex justify-between items-center">
                <div>
                  <span className="font-medium">Generation {gen.generation}</span>
                  <span className="text-sm text-gray-600 ml-2">
                    Population: {gen.populationSize}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600">
                    Best: {gen.bestFitness?.toFixed(3)}
                  </div>
                  <div className="text-xs text-gray-600">
                    Avg: {gen.averageFitness?.toFixed(3)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderPopulation = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Current Population</h3>
        <button
          onClick={handleExportEvolution}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Export Data</span>
        </button>
      </div>

      {evolutionStatus?.generations?.[evolutionStatus.currentGeneration] ? (
        <div className="grid gap-4">
          {evolutionStatus.generations[evolutionStatus.currentGeneration].map((individual, index) => (
            <div key={individual.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-medium text-gray-900">{individual.id}</div>
                  <div className="text-sm text-gray-600">
                    Fitness: {individual.fitness?.toFixed(3) || 'Not evaluated'} • 
                    Generation: {individual.generation}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedIndividual(individual)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                  >
                    View
                  </button>
                  <button
                    onClick={() => evolutionEngine.savePromptToFile(individual, `prompt_${individual.id}.txt`)}
                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
              
              <div className="text-sm text-gray-700 bg-white p-3 rounded max-h-24 overflow-y-auto mb-3">
                {individual.prompt.substring(0, 200)}...
              </div>
              
              {individual.mutations?.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {individual.mutations.map((mutation, mutIndex) => (
                    <span key={mutIndex} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                      {mutation}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No population data available. Initialize evolution to begin.
        </div>
      )}
    </div>
  );

  const renderTestCases = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Test Cases</h3>
        <span className="text-sm text-gray-600">{testCases.length} test cases</span>
      </div>

      {/* Add New Test Case */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4">Add New Test Case</h4>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Test Case ID"
              value={newTestCase.id}
              onChange={(e) => setNewTestCase(prev => ({ ...prev, id: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={newTestCase.type}
              onChange={(e) => setNewTestCase(prev => ({ ...prev, type: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="conversation">Conversation</option>
              <option value="problem_solving">Problem Solving</option>
              <option value="creative">Creative</option>
              <option value="technical">Technical</option>
              <option value="analytical">Analytical</option>
            </select>
          </div>
          <textarea
            placeholder="Test input message..."
            value={newTestCase.input}
            onChange={(e) => setNewTestCase(prev => ({ ...prev, input: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Expected keywords (comma-separated)"
              value={newTestCase.expectedKeywords.join(', ')}
              onChange={(e) => setNewTestCase(prev => ({ 
                ...prev, 
                expectedKeywords: e.target.value.split(',').map(k => k.trim()) 
              }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Weight (1.0)"
              value={newTestCase.weight}
              onChange={(e) => setNewTestCase(prev => ({ ...prev, weight: parseFloat(e.target.value) || 1.0 }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              step="0.1"
              min="0.1"
              max="5.0"
            />
          </div>
          <button
            onClick={handleAddTestCase}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
          >
            Add Test Case
          </button>
        </div>
      </div>

      {/* Existing Test Cases */}
      <div className="space-y-3">
        {testCases.map((testCase, index) => (
          <div key={testCase.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-medium text-gray-900">{testCase.id}</div>
                <div className="text-sm text-gray-600">
                  Type: {testCase.type} • Weight: {testCase.weight}
                </div>
              </div>
              <button
                onClick={() => handleRemoveTestCase(testCase.id)}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
              >
                Remove
              </button>
            </div>
            <div className="text-sm text-gray-700 bg-white p-3 rounded mb-2">
              {testCase.input}
            </div>
            {testCase.expectedKeywords?.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {testCase.expectedKeywords.map((keyword, keyIndex) => (
                  <span key={keyIndex} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                    {keyword}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Evolution Analytics</h3>
      
      {/* Evolution Log */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
          <Activity className="w-4 h-4 mr-2" />
          Evolution Log
        </h4>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {evolutionLog.slice(-10).reverse().map((entry, index) => (
            <div key={index} className="bg-white p-3 rounded text-sm">
              <div className="flex justify-between items-start">
                <span className="font-medium text-gray-900">{entry.event}</span>
                <span className="text-xs text-gray-500">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
              </div>
              {entry.data && (
                <div className="text-gray-600 mt-1">
                  {JSON.stringify(entry.data, null, 2).substring(0, 100)}...
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      {evolutionStatus?.metrics && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">Performance Metrics</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <div className="text-lg font-bold text-green-600">
                {evolutionStatus.metrics.bestFitness?.toFixed(3) || '0.000'}
              </div>
              <div className="text-sm text-gray-600">Best Fitness Score</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-lg font-bold text-blue-600">
                {evolutionStatus.metrics.averageFitness?.toFixed(3) || '0.000'}
              </div>
              <div className="text-sm text-gray-600">Average Fitness</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-lg font-bold text-purple-600">
                {evolutionStatus.metrics.totalGenerations || 0}
              </div>
              <div className="text-sm text-gray-600">Total Generations</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-lg font-bold text-orange-600">
                {evolutionStatus.metrics.improvementRate ? 
                  `${(evolutionStatus.metrics.improvementRate * 100).toFixed(1)}%` : '0.0%'}
              </div>
              <div className="text-sm text-gray-600">Improvement Rate</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Brain },
    { id: 'population', label: 'Population', icon: Dna },
    { id: 'testcases', label: 'Test Cases', icon: TestTube },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Actual Evolution System</h1>
        <p className="text-gray-600">
          Real genetic algorithm-based evolution of system prompts with A/B testing and performance optimization.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'population' && renderPopulation()}
      {activeTab === 'testcases' && renderTestCases()}
      {activeTab === 'analytics' && renderAnalytics()}

      {/* Individual Detail Modal */}
      {selectedIndividual && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedIndividual.id}</h3>
                  <p className="text-gray-600">
                    Generation {selectedIndividual.generation} • 
                    Fitness: {selectedIndividual.fitness?.toFixed(3) || 'Not evaluated'}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedIndividual(null)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
                >
                  Close
                </button>
              </div>

              <div className="space-y-6">
                {/* Prompt */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">System Prompt</h4>
                  <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 max-h-64 overflow-y-auto">
                    {selectedIndividual.prompt}
                  </div>
                </div>

                {/* Mutations */}
                {selectedIndividual.mutations?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Mutations Applied</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedIndividual.mutations.map((mutation, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                          {mutation}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Performance */}
                {selectedIndividual.performance && Object.keys(selectedIndividual.performance).length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Performance Metrics</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(selectedIndividual.performance).map(([key, value]) => (
                        <div key={key} className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-lg font-bold text-blue-600">
                            {typeof value === 'number' ? value.toFixed(3) : value}
                          </div>
                          <div className="text-sm text-gray-600 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Test Results */}
                {selectedIndividual.testResults?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Test Results</h4>
                    <div className="space-y-3">
                      {selectedIndividual.testResults.map((result, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium">{result.testCase}</span>
                            <span className="text-sm text-gray-600">
                              Fitness: {result.fitness?.toFixed(3)}
                            </span>
                          </div>
                          {result.evaluation && (
                            <div className="grid grid-cols-3 gap-2 text-sm">
                              <div>Relevance: {result.evaluation.relevance?.toFixed(2)}</div>
                              <div>Coherence: {result.evaluation.coherence?.toFixed(2)}</div>
                              <div>Creativity: {result.evaluation.creativity?.toFixed(2)}</div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActualEvolutionPanel;

