import { useEffect, useMemo, useState } from 'react';
import { IoCheckmark, IoChevronBack, IoEyeOutline, IoRefresh } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserStore } from '#/auth/store/auth';
import { useGetEpisodeSources, useGetEpisodeTypes } from '#/api/hooks/usePlayer';
import { Spinner } from 'ui-kit/components/Spinner/Spinner';
import styles from './SelectVoiceoverPage.module.css';

type FilterType = 'all' | 'voiceover' | 'subtitle';

export const SelectVoiceoverPage: React.FC = () => {
  const { releaseId } = useParams();
  const token = useUserStore((s) => s.token);
  const navigate = useNavigate();
  
  const [filter, setFilter] = useState<FilterType>('all');
  
  const { data: typesData, isPending: isTypesPending, refetch } = useGetEpisodeTypes(releaseId!, token);
  
  const types = useMemo(() => typesData?.types ?? [], [typesData]);
  
  // Собираем все источники из всех типов
  const allSources = useMemo(() => {
    if (!types.length) return [];
    
    const sourcesWithType: Array<{
      id: number | string;
      title: string;
      name: string;
      logo?: string;
      episodes_count?: number;
      views_count?: number;
      is_new?: boolean;
      typeId: number | string;
      typeName: string;
      isVoiceover: boolean;
    }> = [];
    
    types.forEach((type: any) => {
      const isVoiceover = type.name?.toLowerCase().includes('озвучка') || type.type === 'voiceover';
      
      if (type.sources && Array.isArray(type.sources)) {
        type.sources.forEach((source: any) => {
          sourcesWithType.push({
            ...source,
            typeId: type.id,
            typeName: type.name || type.title || 'Озвучка',
            isVoiceover
          });
        });
      }
    });
    
    return sourcesWithType;
  }, [types]);
  
  // Фильтруем источники по выбранному фильтру
  const filteredSources = useMemo(() => {
    if (filter === 'all') return allSources;
    if (filter === 'voiceover') return allSources.filter(s => s.isVoiceover);
    if (filter === 'subtitle') return allSources.filter(s => !s.isVoiceover);
    return allSources;
  }, [allSources, filter]);

  const handleSourceSelect = (source: typeof filteredSources[0]) => {
    navigate(`/release/${releaseId}/watch/source?type=${source.typeId}&source=${source.id}`);
  };

  const formatViews = (count?: number) => {
    if (!count) return '0';
    if (count >= 1000) return `${Math.floor(count / 1000)}K`;
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

      {/* Список источников */}
      <div className={styles.sourcesList}>
        {filteredSources.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Нет доступных вариантов</p>
          </div>
        ) : (
          filteredSources.map((source) => (
            <button
              key={`${source.typeId}-${source.id}`}
              className={styles.sourceItem}
              onClick={() => handleSourceSelect(source)}
            >
              <div className={styles.sourceInfo}>
                {/* Логотип/аватар */}
                <div className={styles.sourceLogo}>
                  {source.logo ? (
                    <img src={source.logo} alt={source.title || source.name} />
                  ) : (
                    <div className={styles.sourceLogoPlaceholder}>
                      {(source.title || source.name || '?').charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                
                {/* Информация */}
                <div className={styles.sourceDetails}>
                  <div className={styles.sourceName}>
                    {source.title || source.name || 'Без названия'}
                  </div>
                  <div className={styles.sourceEpisodes}>
                    {source.episodes_count || 0} {source.episodes_count === 1 ? 'эпизод' : 'эпизодов'}
                  </div>
                </div>
              </div>
              
              {/* Счетчики и бейджи */}
              <div className={styles.sourceStats}>
                {source.is_new && (
                  <span className={styles.newBadge}>НОВИНКА</span>
                )}
                <div className={styles.viewsCount}>
                  <span>{formatViews(source.views_count)}</span>
                  <IoEyeOutline size={16} />
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

