import styles from './VideoCard.module.css';

interface VideoCardProps {
    video: {
        id: number;
        title?: string;
        image: string;
        url?: string;
        player_url?: string;
    };
    categoryName?: string;
    releaseName?: string;
    onClick?: () => void;
    variant?: 'horizontal' | 'vertical';
}

export const VideoCard = ({ 
    video, 
    categoryName,
    releaseName,
    onClick, 
    variant = 'horizontal' 
}: VideoCardProps) => {
    return (
        <div 
            className={`${styles.card} ${styles[variant]}`}
            onClick={onClick}
        >
            <div className={styles.imageContainer}>
                <img 
                    src={video.image} 
                    alt={video.title || categoryName || 'Video'} 
                    className={styles.image}
                />
                <div className={styles.overlay}>
                    {/* Main category title */}
                    {categoryName && (
                        <div className={styles.categoryTitle}>
                            {categoryName}
                        </div>
                    )}
                    
                    {/* Bottom badges */}
                    <div className={styles.badges}>
                        {video.title && (
                            <span className={styles.badge}>
                                {video.title}
                            </span>
                        )}
                        {releaseName && (
                            <span className={styles.badge}>
                                {releaseName}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

