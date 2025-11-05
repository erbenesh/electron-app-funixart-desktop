import { useNavigate } from 'react-router-dom';
import styles from './CollectionCard.module.css';
import { MediaCard } from '#/components/MediaCard/MediaCard';

export const CollectionCard = (props) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/collection/${props.collection.id}`);
    };

    return (
        <div 
            id="collection_card" 
            className={styles.collection_card}
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
                    imageUrl={props.collection.image}
                    bottomOverlay={
                        <div className={styles.release_info_border}>
                            <p className={styles.anime_title}>{props.collection.title}</p>
                        </div>
                    }
                />
            </div>
        </div>
    )
}