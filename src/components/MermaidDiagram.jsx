import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

const MermaidDiagram = ({ 
  diagram, 
  title, 
  onNodeClick = () => {}, 
  onNodeHover = () => {},
  className = "" 
}) => {
  const elementRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize Mermaid with configuration
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#3b82f6',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#1e40af',
        lineColor: '#6b7280',
        secondaryColor: '#1f2937',
        tertiaryColor: '#374151',
        background: '#111827',
        mainBkg: '#1f2937',
        secondBkg: '#374151',
        tertiaryBkg: '#4b5563'
      },
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis'
      },
      mindmap: {
        useMaxWidth: true,
        padding: 10
      },
      stateDiagram: {
        useMaxWidth: true
      }
    });
  }, []);

  useEffect(() => {
    if (!diagram || !elementRef.current) return;

    const renderDiagram = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Clear previous content
        elementRef.current.innerHTML = '';

        // Generate unique ID for this diagram
        const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // Render the diagram
        const { svg } = await mermaid.render(id, diagram);
        
        // Insert the SVG
        elementRef.current.innerHTML = svg;

        // Add event listeners for interactivity
        const svgElement = elementRef.current.querySelector('svg');
        if (svgElement) {
          // Enable pan and zoom
          svgElement.style.cursor = 'grab';
          svgElement.style.userSelect = 'none';

          // Add click handlers to nodes
          const nodes = svgElement.querySelectorAll('.node, .mindmap-node, .state');
          nodes.forEach((node, index) => {
            node.style.cursor = 'pointer';
            node.addEventListener('click', (e) => {
              e.stopPropagation();
              const nodeText = node.textContent?.trim() || `Node ${index}`;
              onNodeClick({ 
                id: node.id || `node-${index}`, 
                text: nodeText, 
                element: node 
              });
            });

            node.addEventListener('mouseenter', (e) => {
              const nodeText = node.textContent?.trim() || `Node ${index}`;
              onNodeHover({ 
                id: node.id || `node-${index}`, 
                text: nodeText, 
                element: node,
                type: 'enter'
              });
            });

            node.addEventListener('mouseleave', (e) => {
              onNodeHover({ 
                id: node.id || `node-${index}`, 
                text: node.textContent?.trim() || `Node ${index}`, 
                element: node,
                type: 'leave'
              });
            });
          });

          // Add basic pan functionality
          let isPanning = false;
          let startX, startY, startViewBoxX, startViewBoxY;

          svgElement.addEventListener('mousedown', (e) => {
            if (e.target.closest('.node, .mindmap-node, .state')) return;
            isPanning = true;
            startX = e.clientX;
            startY = e.clientY;
            
            const viewBox = svgElement.viewBox.baseVal;
            startViewBoxX = viewBox.x;
            startViewBoxY = viewBox.y;
            
            svgElement.style.cursor = 'grabbing';
          });

          svgElement.addEventListener('mousemove', (e) => {
            if (!isPanning) return;
            
            const dx = (startX - e.clientX) * 2;
            const dy = (startY - e.clientY) * 2;
            
            const viewBox = svgElement.viewBox.baseVal;
            viewBox.x = startViewBoxX + dx;
            viewBox.y = startViewBoxY + dy;
          });

          svgElement.addEventListener('mouseup', () => {
            isPanning = false;
            svgElement.style.cursor = 'grab';
          });

          svgElement.addEventListener('mouseleave', () => {
            isPanning = false;
            svgElement.style.cursor = 'grab';
          });

          // Add zoom functionality
          svgElement.addEventListener('wheel', (e) => {
            e.preventDefault();
            const viewBox = svgElement.viewBox.baseVal;
            const scaleFactor = e.deltaY > 0 ? 1.1 : 0.9;
            
            viewBox.width *= scaleFactor;
            viewBox.height *= scaleFactor;
          });
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Error rendering Mermaid diagram:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    renderDiagram();
  }, [diagram, onNodeClick, onNodeHover]);

  if (error) {
    return (
      <div className={`p-4 border border-red-500 rounded-lg bg-red-50 dark:bg-red-900/20 ${className}`}>
        <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 mb-2">
          {title} - Error
        </h3>
        <p className="text-red-600 dark:text-red-400">
          Failed to render diagram: {error}
        </p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          {title}
        </h3>
      )}
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      <div 
        ref={elementRef} 
        className="w-full h-full min-h-[400px] border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
        }}
      />
      
      <div className="absolute bottom-2 right-2 text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded">
        Pan: Click & Drag | Zoom: Mouse Wheel | Click nodes for details
      </div>
    </div>
  );
};

export default MermaidDiagram;

