import { Link } from 'react-router-dom';
import styles from './CollectionCard.module.css';

export const CollectionCard = (props) => {

    return (
        <Link to={`/collection/${props.collection.id}`} id="collection_card" className={styles.collection_card}>

            {/* <div className={styles.release_image_border_bg} style={{width:'17.5rem'}}/>

            <div className={styles.release_image_border_bg}/> */}

            <div className={styles.release_image_border}>

                <img className={styles.release_image} src={props.collection.image} alt="" />

                <div className={styles.release_info_border}>

                    <p className={styles.anime_title}>{props.collection.title}</p>

                </div>  
            </div>

        </Link>
    )
}