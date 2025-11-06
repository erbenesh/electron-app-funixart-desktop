import { IoLogoYoutube, IoEllipsisVertical } from 'react-icons/io5';
import styles from './VideoListItem.module.css';

interface VideoListItemProps {
    video: {
        id: number;
        title?: string;
        image: string;
        url?: string;
        player_url?: string;
        timestamp?: number;
        category?: { name?: string };
        profile?: { login?: string };
    };
    onClick?: () => void;
    onMenuClick?: () => void;
}

export const VideoListItem = ({ video, onClick, onMenuClick }: VideoListItemProps) => {
    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        const now = new Date();
        const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diff < 60) return 'только что';
        if (diff < 3600) return `${Math.floor(diff / 60)} мин. назад`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} ч. назад`;
        
        const months = ['янв.', 'фев.', 'мар.', 'апр.', 'мая', 'июн.', 'июл.', 'авг.', 'сен.', 'окт.', 'нояб.', 'дек.'];
        return `${date.getDate()} ${months[date.getMonth()]} в ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
    };

    return (
        <div className={styles.container} onClick={onClick}>
            <div className={styles.thumbnail}>
                <img 
                    src={video.image} 
                    alt={video.title || 'Video'} 
                    className={styles.image}
                />
                <div className={styles.playIconContainer}>
                    <IoLogoYoutube className={styles.playIcon} />
                </div>
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{video.title || 'Без названия'}</h3>
                <div className={styles.metadata}>
                    <span className={styles.author}>
                        {video.profile?.login || 'Anixart'}
                    </span>
                    {video.timestamp && (
                        <>
                            <span className={styles.separator}>•</span>
                            <span className={styles.date}>
                                {formatDate(video.timestamp)}
                            </span>
                        </>
                    )}
                </div>
                {video.category?.name && (
                    <div className={styles.category}>
                        {video.category.name}
                    </div>
                )}
            </div>

            <button 
                className={styles.menuButton}
                onClick={(e) => {
                    e.stopPropagation();
                    onMenuClick?.();
                }}
                type="button"
                aria-label="Меню"
            >
                <IoEllipsisVertical />
            </button>
        </div>
    );
};

