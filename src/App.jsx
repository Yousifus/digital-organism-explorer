import { useState } from 'react'
import Navigation from './components/Navigation'
import MainContent from './components/MainContent'
import Inspector from './components/Inspector'
import { Button } from '@/components/ui/button'
import { Search, Menu, X } from 'lucide-react'
import './App.css'

function App() {
  const [activePanel, setActivePanel] = useState('overview');
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const handlePanelChange = (panelId) => {
    setActivePanel(panelId);
    setSidebarOpen(false); // Close mobile sidebar when panel changes
  };

  const handleSearch = (searchTerm) => {
    console.log('Searching for:', searchTerm);
    // TODO: Implement global search functionality
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 z-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                  Digital Organism Explorer
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                  Visualizing LLM-as-Life Architecture
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <div className="text-xs text-gray-500 dark:text-gray-400 hidden lg:block">
                Interactive Organism Explorer
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Left Navigation */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          fixed lg:static inset-y-0 left-0 z-30 lg:z-0
          w-64 lg:w-64 flex-shrink-0
        `}>
          <Navigation 
            activePanel={activePanel}
            onPanelChange={handlePanelChange}
            className="h-full"
          />
        </div>
        
        {/* Main Content */}
        <MainContent 
          activePanel={activePanel}
          onNodeClick={handleNodeClick}
          onNodeHover={handleNodeHover}
          onPanelChange={handlePanelChange}
        />
        
        {/* Right Inspector - Hidden on mobile, collapsible on tablet */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <Inspector 
            selectedNode={selectedNode}
            hoveredNode={hoveredNode}
            activePanel={activePanel}
            onSearch={handleSearch}
            className="h-full"
          />
        </div>
      </div>
      
      {/* Mobile Inspector - Show as bottom sheet or modal when needed */}
      {(selectedNode || hoveredNode) && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 max-h-64 overflow-y-auto z-40">
          <Inspector 
            selectedNode={selectedNode}
            hoveredNode={hoveredNode}
            activePanel={activePanel}
            onSearch={handleSearch}
            className="h-auto"
          />
        </div>
      )}
    </div>
  )
}

export default App
