import { useMemo } from 'react';
import { IoChevronBack, IoRefresh } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserStore } from '#/auth/store/auth';
import { useGetEpisodeSources } from '#/api/hooks/usePlayer';
import { Spinner } from 'ui-kit/components/Spinner/Spinner';
import styles from './SelectVoiceoverPage.module.css'; // Используем те же стили
import type { Source } from '#/types/entities';

export const SelectSourcePage: React.FC = () => {
  const { releaseId, typeId } = useParams();
  const token = useUserStore((s) => s.token);
  const navigate = useNavigate();
  
  const { data: sourcesData, isPending, refetch } = useGetEpisodeSources(releaseId!, typeId!, token);
  
  const sources = useMemo(() => sourcesData?.sources ?? [], [sourcesData]);

  // При выборе плеера переходим на страницу с эпизодами
  const handleSourceSelect = (source: Source) => {
    // Переходим на страницу с плеером и эпизодами
    navigate(`/release/${releaseId}/watch?type=${typeId}&source=${source.id}`);
  };

  const formatViews = (count?: number) => {
    if (!count) return '0';
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${Math.round(count / 1000)}K`;
    return String(count);
  };

  if (isPending) {
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
        
        <h1 className={styles.title}>Выберите плеер</h1>
        
        <button 
          className={styles.refreshButton}
          onClick={() => refetch()}
          aria-label="Обновить"
        >
          <IoRefresh size={24} />
        </button>
      </div>

      {/* Список плееров */}
      <div className={styles.sourcesList}>
        {sources.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Нет доступных плееров</p>
          </div>
        ) : (
          sources.map((source: Source) => (
            <button
              key={source.id}
              className={styles.sourceItem}
              onClick={() => handleSourceSelect(source)}
            >
              <div className={styles.sourceInfo}>
                {/* Логотип/аватар плеера */}
                <div className={styles.sourceLogo}>
                  {source.logo ? (
                    <img src={source.logo} alt={source.name || source.title} />
                  ) : (
                    <div className={styles.sourceLogoPlaceholder}>
                      {((source.name || source.title) || '?').charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                
                {/* Информация */}
                <div className={styles.sourceDetails}>
                  <div className={styles.sourceName}>
                    {source.name || source.title || 'Без названия'}
                  </div>
                  <div className={styles.sourceEpisodes}>
                    {source.episodes_count || 0} {source.episodes_count === 1 ? 'эпизод' : 'эпизодов'}
                  </div>
                </div>
              </div>
              
              {/* Счетчики и бейджи */}
              <div className={styles.sourceStats}>
                {/* Можно добавить бейджи если нужно */}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

