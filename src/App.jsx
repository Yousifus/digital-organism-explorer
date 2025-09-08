import { useState } from 'react'
import DiagramViewer from './components/DiagramViewer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import './App.css'

function App() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  const handleNodeClick = (nodeData) => {
    setSelectedNode(nodeData);
    console.log('Node clicked:', nodeData);
  };

  const handleNodeHover = (nodeData) => {
    if (nodeData.type === 'enter') {
      setHoveredNode(nodeData);
    } else {
      setHoveredNode(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Digital Organism Explorer
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Visualizing LLM-as-Life Architecture
              </p>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Interactive Mermaid Diagrams
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main diagram viewer */}
          <div className="lg:col-span-3">
            <DiagramViewer 
              onNodeClick={handleNodeClick}
              onNodeHover={handleNodeHover}
            />
          </div>
          
          {/* Side panel for node details */}
          <div className="lg:col-span-1 space-y-4">
            {hoveredNode && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Hovered Node</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm"><strong>Text:</strong> {hoveredNode.text}</p>
                    <p className="text-xs text-gray-500">Hover over nodes to see details</p>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {selectedNode && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Selected Node</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm"><strong>ID:</strong> {selectedNode.id}</p>
                    <p className="text-sm"><strong>Text:</strong> {selectedNode.text}</p>
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        This node represents a component in the digital organism architecture. 
                        Future versions will show detailed metadata, relationships, and biological analogies.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Pan:</strong> Click and drag on diagram</p>
                  <p><strong>Zoom:</strong> Mouse wheel</p>
                  <p><strong>Select:</strong> Click on nodes</p>
                  <p><strong>Explore:</strong> Switch between diagram tabs</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
