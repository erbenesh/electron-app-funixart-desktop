import { Link } from 'react-router-dom';
import styles from './CollectionCard.module.css';
import { MediaCard } from 'ui-kit/components/MediaCard/MediaCard';

export const CollectionCard = (props) => {

    return (
        <Link to={`/collection/${props.collection.id}`} id="collection_card" className={styles.collection_card}>
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
        </Link>
    )
}