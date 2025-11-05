import { useRef, useState } from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside';
import type { VideoSource } from '../../../types/player';
import styles from '../ReleasePlayer.module.css';

interface SourceSelectorProps {
  sources: VideoSource[];
  selected: VideoSource;
  onSelect: (source: VideoSource) => void;
}

export function SourceSelector({ sources, selected, onSelect }: SourceSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setIsOpen(false));

  return (
    <div className={styles.player_dropdowns} style={{ width: '40%' }} ref={ref}>
      <button
        className={styles.dropdown_button}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        style={{ placeContent: 'center', height: '100%' }}
      >
        {selected.name}
      </button>

      {isOpen && (
        <div className={styles.top_buttons_swiper} style={{ display: 'flex' }}>
          {sources.map((source) => (
            <button
              key={`source_${source.id}`}
              className={styles.dropdown_list_button}
              onClick={() => {
                onSelect(source);
                setIsOpen(false);
              }}
            >
              {source.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

