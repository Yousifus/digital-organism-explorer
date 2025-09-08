import { useEffect, useState } from 'react';
import { conceptUtils } from '../data/conceptRegistry';

const ConceptHighlighter = ({ 
  diagramId, 
  selectedConcept, 
  onConceptHover,
  onConceptClick 
}) => {
  const [highlightedElements, setHighlightedElements] = useState([]);

  useEffect(() => {
    if (!diagramId || !selectedConcept) {
      clearHighlights();
      return;
    }

    highlightConceptInDiagram(selectedConcept, diagramId);
  }, [selectedConcept, diagramId]);

  const clearHighlights = () => {
    // Remove existing highlights
    highlightedElements.forEach(element => {
      element.style.stroke = '';
      element.style.strokeWidth = '';
      element.style.filter = '';
      element.classList.remove('concept-highlighted');
    });
    setHighlightedElements([]);
  };

  const highlightConceptInDiagram = (concept, currentDiagramId) => {
    clearHighlights();

    if (!concept.diagramLocations[currentDiagramId]) {
      return;
    }

    const diagramContainer = document.querySelector(`[data-diagram-id="${currentDiagramId}"]`);
    if (!diagramContainer) return;

    const newHighlights = [];
    const conceptTexts = concept.diagramLocations[currentDiagramId];

    conceptTexts.forEach(conceptText => {
      // Find SVG text elements that match the concept text
      const textElements = diagramContainer.querySelectorAll('text, tspan');
      
      textElements.forEach(textElement => {
        const elementText = textElement.textContent?.trim();
        
        if (elementText && (
          elementText.includes(conceptText) ||
          conceptText.includes(elementText) ||
          concept.aliases.some(alias => 
            elementText.includes(alias) || alias.includes(elementText)
          )
        )) {
          // Highlight the parent node/shape
          const parentNode = findParentNode(textElement);
          if (parentNode) {
            highlightElement(parentNode);
            newHighlights.push(parentNode);
          }
        }
      });
    });

    setHighlightedElements(newHighlights);
  };

  const findParentNode = (textElement) => {
    let current = textElement.parentElement;
    
    // Look for common SVG grouping elements that represent nodes
    while (current && current !== document.body) {
      const tagName = current.tagName?.toLowerCase();
      
      if (tagName === 'g' && (
        current.classList.contains('node') ||
        current.classList.contains('cluster') ||
        current.querySelector('rect, circle, ellipse, polygon, path')
      )) {
        return current;
      }
      
      // If we find a shape element directly, use it
      if (['rect', 'circle', 'ellipse', 'polygon', 'path'].includes(tagName)) {
        return current;
      }
      
      current = current.parentElement;
    }
    
    return null;
  };

  const highlightElement = (element) => {
    // Add visual highlighting
    element.style.stroke = '#3b82f6';
    element.style.strokeWidth = '3px';
    element.style.filter = 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))';
    element.classList.add('concept-highlighted');

    // Add interaction handlers
    const handleMouseEnter = () => {
      onConceptHover?.({ type: 'enter', element, concept: selectedConcept });
    };

    const handleMouseLeave = () => {
      onConceptHover?.({ type: 'leave', element, concept: selectedConcept });
    };

    const handleClick = () => {
      onConceptClick?.(selectedConcept);
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('click', handleClick);

    // Store cleanup functions
    element._conceptCleanup = () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('click', handleClick);
    };
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      highlightedElements.forEach(element => {
        if (element._conceptCleanup) {
          element._conceptCleanup();
        }
      });
      clearHighlights();
    };
  }, []);

  return null; // This component doesn't render anything visible
};

// Hook for concept linking functionality
export const useConceptLinking = () => {
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);

  const selectConcept = (concept) => {
    setSelectedConcept(concept);
  };

  const clearSelection = () => {
    setSelectedConcept(null);
  };

  const findConceptFromNode = (nodeText) => {
    return conceptUtils.findConcept(nodeText);
  };

  const getRelatedConcepts = (conceptId) => {
    return conceptUtils.getRelatedConcepts(conceptId);
  };

  const searchConcepts = (query) => {
    return conceptUtils.searchConcepts(query);
  };

  return {
    selectedConcept,
    hoveredConcept,
    selectConcept,
    clearSelection,
    findConceptFromNode,
    getRelatedConcepts,
    searchConcepts,
    setHoveredConcept
  };
};

export default ConceptHighlighter;

