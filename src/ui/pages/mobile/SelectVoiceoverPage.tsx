import { useMemo, useState } from 'react';
import { IoCheckmark, IoChevronBack, IoEyeOutline, IoRefresh } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserStore } from '#/auth/store/auth';
import { useGetEpisodeTypes } from '#/api/hooks/usePlayer';
import { Spinner } from 'ui-kit/components/Spinner/Spinner';
import styles from './SelectVoiceoverPage.module.css';
import type { Type } from '#/types/entities';

type FilterType = 'all' | 'voiceover' | 'subtitle';

export const SelectVoiceoverPage: React.FC = () => {
  const { releaseId } = useParams();
  const token = useUserStore((s) => s.token);
  const navigate = useNavigate();
  
  const [filter, setFilter] = useState<FilterType>('all');
  
  const { data: typesData, isPending: isTypesPending, refetch } = useGetEpisodeTypes(releaseId!, token);
  
  const types = useMemo(() => typesData?.types ?? [], [typesData]);
  
  // Фильтруем озвучки по выбранному фильтру
  const filteredTypes = useMemo(() => {
    if (filter === 'all') return types;
    // is_sub: true = субтитры, false = озвучка
    if (filter === 'voiceover') return types.filter((t: Type) => !t.is_sub);
    if (filter === 'subtitle') return types.filter((t: Type) => t.is_sub);
    return types;
  }, [types, filter]);

  // При выборе озвучки переходим на страницу выбора плеера
  const handleTypeSelect = (type: Type) => {
    // Переходим на страницу выбора плеера для этой озвучки
    navigate(`/release/${releaseId}/select-source/${type.id}`);
  };

  const formatViews = (count?: number) => {
    if (!count) return '0';
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${Math.round(count / 1000)}K`;
    return String(count);
  };

  if (isTypesPending) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {/* Шапка */}
      <div className={styles.header}>
        <button 
          className={styles.backButton} 
          onClick={() => navigate(-1)}
          aria-label="Назад"
        >
          <IoChevronBack size={24} />
        </button>
        
        <h1 className={styles.title}>Выберите вариант</h1>
        
        <button 
          className={styles.refreshButton}
          onClick={() => refetch()}
          aria-label="Обновить"
        >
          <IoRefresh size={24} />
        </button>
      </div>

      {/* Фильтры */}
      <div className={styles.filters}>
        <button
          className={`${styles.filterButton} ${filter === 'all' ? styles.filterButtonActive : ''}`}
          onClick={() => setFilter('all')}
        >
          {filter === 'all' && <IoCheckmark size={16} />}
          Все
        </button>
        
        <button
          className={`${styles.filterButton} ${filter === 'voiceover' ? styles.filterButtonActive : ''}`}
          onClick={() => setFilter('voiceover')}
        >
          {filter === 'voiceover' && <IoCheckmark size={16} />}
          Озвучки
        </button>
        
        <button
          className={`${styles.filterButton} ${filter === 'subtitle' ? styles.filterButtonActive : ''}`}
          onClick={() => setFilter('subtitle')}
        >
          {filter === 'subtitle' && <IoCheckmark size={16} />}
          Субтитры
        </button>
      </div>

      {/* Список озвучек */}
      <div className={styles.sourcesList}>
        {filteredTypes.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Нет доступных вариантов</p>
          </div>
        ) : (
          filteredTypes.map((type: Type) => (
            <button
              key={type.id}
              className={styles.sourceItem}
              onClick={() => handleTypeSelect(type)}
            >
              <div className={styles.sourceInfo}>
                {/* Логотип/аватар озвучки */}
                <div className={styles.sourceLogo}>
                  {type.icon ? (
                    <img src={type.icon} alt={type.name} />
                  ) : (
                    <div className={styles.sourceLogoPlaceholder}>
                      {(type.name || '?').charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                
                {/* Информация */}
                <div className={styles.sourceDetails}>
                  <div className={styles.sourceName}>
                    {type.name || 'Без названия'}
                  </div>
                  <div className={styles.sourceEpisodes}>
                    {type.episodes_count || 0} {type.episodes_count === 1 ? 'эпизод' : 'эпизодов'}
                  </div>
                </div>
              </div>
              
              {/* Счетчики и бейджи */}
              <div className={styles.sourceStats}>
                {type.pinned && (
                  <span className={styles.newBadge}>ЗАКРЕПЛЕНО</span>
                )}
                {type.view_count !== undefined && type.view_count > 0 && (
                <div className={styles.viewsCount}>
                    <span>{formatViews(type.view_count)}</span>
                  <IoEyeOutline size={16} />
                </div>
                )}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

