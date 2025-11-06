import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MediaCard } from '../MediaCard/MediaCard';
import { unixToDate } from '../../api/utils';
import styles from './ReleaseCard.module.css';
import type { Release } from '../../types/entities';

const profile_lists = {
    // 0: "Не смотрю",
    1: { name: "Смотрю", bg_color: "rgba(26, 212, 85, 0.95)" },
    2: { name: "В планах", bg_color: "rgba(140, 119, 197, 0.95)" },
    3: { name: "Просмотрено", bg_color: "rgba(91, 93, 207, 0.95)" },
    4: { name: "Отложено", bg_color: "rgba(233, 196, 47, 0.95)" },
    5: { name: "Брошено", bg_color: "rgba(231, 115, 80, 0.95)" },
};

const yearSeason = ["_", "Зима", "Весна", "Лето", "Осень"];

interface ReleaseCardProps {
    release: Release;
    clickCallBack?: (value: string) => void;
}

const ReleaseCardComponent = ({ release, clickCallBack }: ReleaseCardProps) => {
    const navigate = useNavigate();

    const grade = release.grade ? release.grade.toFixed(1) : null;

    const profile_list_status = release.profile_list_status;
    
    let user_list = null;
  
    if (profile_list_status != null || profile_list_status != 0) {
      user_list = profile_lists[profile_list_status];
    }

    const [dominantColor, setDominantColor] = useState('rgba(36, 36, 36, 1)');

    // Dominant color calculation removed to avoid external dependency
    
    const handleClick = () => {
        if (clickCallBack) {
            clickCallBack("");
        }
        navigate(`/release/${release.id}`);
    };

    return (
        <div 
            id="vert_card" 
            className={styles.vert_card}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClick();
                }
            }}
        >
            <div className={styles.card_image_wrapper}>
                <MediaCard
                    imageUrl={release.image}
                    topOverlay={
                        grade ? (
                            <div className={styles.grade_badge}>
                                <span className={styles.star_icon}>★</span>
                                <span className={styles.grade_value}>{grade}</span>
                            </div>
                        ) : null
                    }
                />
                {user_list && (
                    <div 
                        className={styles.status_badge} 
                        style={{background: user_list.bg_color}}
                    >
                        {user_list.name}
                    </div>
                )}
            </div>

            <div className={styles.card_content}>
                <h3 className={styles.card_title}>{release.title_ru}</h3>
                
                {release.genres && (
                    <div className={styles.genres_row}>
                        {release.genres.split(', ').slice(0, 2).map((genre, idx) => (
                            <span key={idx}>#{genre}</span>
                        ))}
                    </div>
                )}

                <div className={styles.info_row}>
                    {release.category && (
                        <>
                            <span className={styles.info_text}>{release.category.name}</span>
                            <span className={styles.separator}>•</span>
                        </>
                    )}
                    
                    {release.status && (
                        <>
                            <span className={styles.info_text}>{release.status.name}</span>
                            <span className={styles.separator}>•</span>
                        </>
                    )}

                    <span className={styles.info_text}>
                        {release.episodes_released && release.episodes_released + " из "}
                        {release.episodes_total ? release.episodes_total + " эп" : "? эп"}
                    </span>
                    
                    <span className={styles.separator}>•</span>
                    
                    <span className={styles.info_text}>
                        {release.status && release.status.id === 0 && release.aired_on_date !== 0 ? (
                            unixToDate(release.aired_on_date, "dayMonthYear")
                        ) : release.year ? (
                            <>
                                {release.season && release.season != 0
                                    ? `${yearSeason[release.season]} `
                                    : ""}
                                {release.year && `${release.year} г.`}
                            </>
                        ) : (
                            "Скоро"
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
};

// Memoized export for performance
export const ReleaseCard = memo(ReleaseCardComponent, (prevProps, nextProps) => {
    // Only re-render if release id changes
    return prevProps.release.id === nextProps.release.id;
});

ReleaseCard.displayName = 'ReleaseCard';

{/* <div className="glowing-elements">
<div className="glow-1"></div>
<div className="glow-2"></div>
<div className="glow-3"></div>
</div>
<div className="card-particles">
<span></span><span></span><span></span> <span></span><span>
  </span><span></span>
</div> */}


{/* <div data-position="top" className="carousel">
<span className="carousel__text">• card component • card component • card component • card component •
  card component • card component</span>
</div>

<div data-direction="right" data-position="bottom" className="carousel">
<span className="carousel__text">• card component • card component • card component • card component •
  card component • card component</span>
</div> */}