import { useState, useRef, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import parse from 'html-react-parser';

interface ReleaseDescriptionProps {
  description: string;
}

export function ReleaseDescription({ description }: ReleaseDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lineCount, setLineCount] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseInt(window.getComputedStyle(textRef.current).lineHeight);
      const height = textRef.current.scrollHeight;
      const lines = Math.round(height / lineHeight);
      setLineCount(lines);
    }
  }, [description]);

  const shouldShowToggle = lineCount > 5;

  return (
    <div className="release-description">
      <div 
        ref={textRef}
        className={`description-text ${!isExpanded && shouldShowToggle ? 'truncated' : ''}`}
      >
        {parse(description || '')}
      </div>
      
      {shouldShowToggle && (
        <button 
          className="description-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Свернуть' : 'Развернуть'}
          <IoIosArrowDown 
            className={`toggle-icon ${isExpanded ? 'rotated' : ''}`}
          />
        </button>
      )}
    </div>
  );
}

