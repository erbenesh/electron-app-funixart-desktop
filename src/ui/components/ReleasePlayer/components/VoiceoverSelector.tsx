import { useRef, useState } from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { VoiceoverPicker } from '../../VoiceoverPicker/VoiceoverPicker';
import type { Voiceover, VoiceoverPickerItem } from '../../../types/player';
import styles from '../ReleasePlayer.module.css';

interface VoiceoverSelectorProps {
  voiceovers: Voiceover[];
  selected: Voiceover;
  onSelect: (voiceover: Voiceover) => void;
}

export function VoiceoverSelector({ voiceovers, selected, onSelect }: VoiceoverSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setIsOpen(false));

  const pickerItems: VoiceoverPickerItem[] = voiceovers.map((v) => ({
    id: v.id,
    title: v.name,
    episodesCount: v.episodes_count,
    viewsCount: v.view_count,
    logoUrl: v.icon,
    kind: 'dub',
    isNew: false,
  }));

  const handleSelect = (item: VoiceoverPickerItem) => {
    const found = voiceovers.find((v) => v.id === item.id);
    if (found) {
      onSelect(found);
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.player_dropdowns} ref={ref}>
      <button
        className={styles.dropdown_button}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <div className={styles.voicer_ico_border}>
          <img className={styles.voicer_ico} src={selected.icon} alt={selected.name} />
        </div>
        <div className={styles.button_name}>
          <p>{selected.name}</p>
        </div>
      </button>

      {isOpen && (
        <div className={styles.top_buttons_swiper} style={{ display: 'flex' }}>
          <VoiceoverPicker items={pickerItems} onSelect={handleSelect} />
        </div>
      )}
    </div>
  );
}

