import { useState, useRef } from 'react';
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { LuFlag } from "react-icons/lu";
import { lists } from '#/api/ReleaseService';
import { useClickOutside } from '#/hooks/useClickOutside';

interface ReleaseActionsProps {
  release: any;
  isFavorite: boolean;
  onAddToBookmark: (listId: number) => void;
  onToggleFavorite: () => void;
  onReport: () => void;
}

export function ReleaseActions({ 
  release, 
  isFavorite,
  onAddToBookmark, 
  onToggleFavorite,
  onReport 
}: ReleaseActionsProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  return (
    <div className="release-actions">
      {/* Favorite Button */}
      <button 
        className={`action-button ${isFavorite ? 'active' : ''}`}
        onClick={onToggleFavorite}
        title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
      >
        {isFavorite ? <IoBookmark /> : <IoBookmarkOutline />}
        <span>{isFavorite ? 'В избранном' : 'В избранное'}</span>
      </button>

      {/* Add to List Dropdown */}
      <div className="bookmark-dropdown" ref={dropdownRef}>
        <button 
          className="action-button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <IoBookmarkOutline />
          <span>Добавить в список</span>
        </button>

        {isDropdownOpen && (
          <div className="dropdown-menu">
            {lists.map((item) => (
              <button
                key={item.list}
                className="dropdown-item"
                onClick={() => {
                  onAddToBookmark(item.list);
                  setIsDropdownOpen(false);
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Report Button */}
      <button 
        className="action-button report"
        onClick={onReport}
        title="Пожаловаться"
      >
        <LuFlag />
        <span>Пожаловаться</span>
      </button>
    </div>
  );
}

