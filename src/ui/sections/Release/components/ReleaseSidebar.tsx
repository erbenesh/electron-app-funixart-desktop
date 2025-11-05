import { useRef, useState } from 'react';
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { LuFlag } from "react-icons/lu";
import { lists, profile_lists } from '#/api/ReleaseService';
import { useClickOutside } from '#/hooks/useClickOutside';

interface ReleaseSidebarProps {
  release: any;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onAddToList: (listId: number) => void;
  onReport: () => void;
}

export function ReleaseSidebar({
  release,
  isFavorite,
  onToggleFavorite,
  onAddToList,
  onReport,
}: ReleaseSidebarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  if (!release) return null;

  const currentList = release.profile_list;

  return (
    <div className="release-sidebar">
      {/* Favorite Button */}
      <button
        className={`sidebar-button ${isFavorite ? 'active' : ''}`}
        onClick={onToggleFavorite}
        title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
      >
        {isFavorite ? <IoBookmark size={20} /> : <IoBookmarkOutline size={20} />}
        <span>{isFavorite ? 'В избранном' : 'Добавить'}</span>
      </button>

      {/* Current List Status */}
      {currentList !== undefined && currentList > 0 && (
        <div className="current-list-badge" style={{ 
          backgroundColor: profile_lists[currentList]?.bg_color 
        }}>
          {profile_lists[currentList]?.name}
        </div>
      )}

      {/* Add to List Dropdown */}
      <div className="list-dropdown" ref={dropdownRef}>
        <button
          className="sidebar-button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <IoBookmarkOutline size={20} />
          <span>Добавить в список</span>
        </button>

        {isDropdownOpen && (
          <div className="dropdown-menu">
            {lists.map((item) => (
              <button
                key={item.list}
                className="dropdown-item"
                onClick={() => {
                  onAddToList(item.list);
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
        className="sidebar-button report"
        onClick={onReport}
        title="Пожаловаться"
      >
        <LuFlag size={20} />
        <span>Пожаловаться</span>
      </button>
    </div>
  );
}

