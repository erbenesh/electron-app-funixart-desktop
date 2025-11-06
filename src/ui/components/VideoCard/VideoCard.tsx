import { IoLogoYoutube } from 'react-icons/io5';
import styles from './VideoCard.module.css';

interface VideoCardProps {
    video: {
        id: number;
        title?: string;
        image: string;
        url?: string;
        player_url?: string;
    };
    onClick?: () => void;
    variant?: 'horizontal' | 'vertical';
}

export const VideoCard = ({ video, onClick, variant = 'horizontal' }: VideoCardProps) => {
    return (
        <div 
            className={`${styles.card} ${styles[variant]}`}
            onClick={onClick}
        >
            <div className={styles.imageContainer}>
                <img 
                    src={video.image} 
                    alt={video.title || 'Video'} 
                    className={styles.image}
                />
                <div className={styles.overlay}>
                    <IoLogoYoutube className={styles.playIcon} />
                </div>
                {video.title && (
                    <div className={styles.titleOverlay}>
                        <span className={styles.title}>{video.title}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

