import { useNavigate, useParams } from 'react-router-dom';
import styles from './VideoCategoryCard.module.css';

interface VideoCategoryCardProps {
    categoryName: string;
    categoryId?: string;
    previewImage?: string;
    videoCount: number;
}

export const VideoCategoryCard = ({ 
    categoryName, 
    categoryId,
    previewImage,
    videoCount 
}: VideoCategoryCardProps) => {
    const navigate = useNavigate();
    const { releaseId } = useParams();

    const handleClick = () => {
        // Navigate to videos page with category hash or query param
        const hash = categoryId ? `#${categoryId}` : '';
        navigate(`/release/${releaseId}/videos${hash}`);
    };

    return (
        <div 
            className={styles.card}
            onClick={handleClick}
        >
            <div className={styles.imageContainer}>
                {previewImage ? (
                    <img 
                        src={previewImage} 
                        alt={categoryName} 
                        className={styles.image}
                    />
                ) : (
                    <div className={styles.placeholder} />
                )}
                <div className={styles.overlay}>
                    <div className={styles.categoryTitle}>
                        {categoryName}
                    </div>
                    <div className={styles.videoCount}>
                        {videoCount} {videoCount === 1 ? 'видео' : 'видео'}
                    </div>
                </div>
            </div>
        </div>
    );
};

