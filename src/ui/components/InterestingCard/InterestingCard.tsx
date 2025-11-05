import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './InterestingCard.module.css';
import { MediaCard } from '#/components/MediaCard/MediaCard';

interface InterestingRelease {
    id: number;
    type: number;
    action: string | number;
    image: string;
    title?: string;
    description?: string;
}

interface InterestingCardProps {
    release: InterestingRelease;
}

const InterestingCardComponent = ({ release }: InterestingCardProps) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        const path = release.type !== 3 ? `/release/${release.action}` : `/collection/${release.action}`;
        navigate(path);
    };
    
    return (
        <div 
            id="inter_card" 
            className={styles.card}
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
            <div className={styles.release_image_border}>
                <MediaCard
                    imageUrl={release.image}
                    bottomOverlay={
                        release.title ? (
                            <div className={styles.release_info_border}>
                                <p className={styles.anime_title}>{release.title}</p>
                                <p className={styles.anime_subinfo}>{release.description}</p>
                            </div>
                        ) : null
                    }
                />
            </div>
        </div>
    );
};

export const InterestingCard = memo(InterestingCardComponent);
InterestingCard.displayName = 'InterestingCard';