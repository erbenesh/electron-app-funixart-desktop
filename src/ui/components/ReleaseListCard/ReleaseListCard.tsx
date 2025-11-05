import { memo } from 'react';
import { IoEllipsisVertical } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { unixToDate } from '../../api/utils';
import styles from './ReleaseListCard.module.css';
import type { Release } from '../../types/entities';

const profile_lists = {
    1: { name: "смотрю", bg_color: "rgba(26, 212, 85, 0.85)" },
    2: { name: "в планах", bg_color: "rgba(140, 119, 197, 0.85)" },
    3: { name: "просмотрено", bg_color: "rgba(91, 93, 207, 0.85)" },
    4: { name: "отложено", bg_color: "rgba(233, 196, 47, 0.85)" },
    5: { name: "брошено", bg_color: "rgba(231, 115, 80, 0.85)" },
};

const yearSeason = ["_", "Зима", "Весна", "Лето", "Осень"];

interface ReleaseListCardProps {
    release: Release;
    clickCallBack?: (value: string) => void;
}

const ReleaseListCardComponent = ({ release, clickCallBack }: ReleaseListCardProps) => {
    const navigate = useNavigate();

    const grade = release.grade ? release.grade.toFixed(1) : null;
    const profile_list_status = release.profile_list_status;
    
    let user_list = null;
    if (profile_list_status != null && profile_list_status != 0) {
        user_list = profile_lists[profile_list_status];
    }
    
    const handleClick = () => {
        if (clickCallBack) {
            clickCallBack("");
        }
        navigate(`/release/${release.id}`);
    };

    const handleMenuClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        // TODO: Open context menu
    };

    return (
        <div 
            className={styles.list_card}
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
            {/* Poster */}
            <div className={styles.poster_container}>
                <img 
                    src={release.image} 
                    alt={release.title_ru} 
                    className={styles.poster_image}
                    loading="lazy"
                />
                {user_list && (
                    <div 
                        className={styles.status_badge} 
                        style={{ background: user_list.bg_color }}
                    >
                        {user_list.name}
                    </div>
                )}
            </div>

            {/* Info */}
            <div className={styles.info_container}>
                <div className={styles.header_row}>
                    <h3 className={styles.title}>{release.title_ru}</h3>
                    <button 
                        className={styles.menu_button}
                        onClick={handleMenuClick}
                        aria-label="Меню"
                    >
                        <IoEllipsisVertical size={20} />
                    </button>
                </div>

                {/* Progress and Rating */}
                <div className={styles.meta_row}>
                    <span className={styles.progress}>
                        {release.episodes_released || 0} из {release.episodes_total || '?'} эп
                    </span>
                    {grade && (
                        <span className={styles.rating}>
                            {grade} ★
                        </span>
                    )}
                </div>

                {/* Description */}
                {release.description && (
                    <p className={styles.description}>
                        {release.description}
                    </p>
                )}

                {/* Additional info */}
                <div className={styles.additional_info}>
                    {release.category && (
                        <span className={styles.info_chip}>{release.category.name}</span>
                    )}
                    {release.status && (
                        <span className={styles.info_chip}>{release.status.name}</span>
                    )}
                    {!grade && release.status?.id === 0 && release.aired_on_date !== 0 && (
                        <span className={styles.info_chip}>
                            {unixToDate(release.aired_on_date, "dayMonthYear")}
                        </span>
                    )}
                    {!grade && release.year && (
                        <span className={styles.info_chip}>
                            {release.season && release.season !== 0 
                                ? `${yearSeason[release.season]} ` 
                                : ""}
                            {release.year} г.
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

// Memoized export for performance
export const ReleaseListCard = memo(ReleaseListCardComponent, (prevProps, nextProps) => {
    return prevProps.release.id === nextProps.release.id;
});

ReleaseListCard.displayName = 'ReleaseListCard';

