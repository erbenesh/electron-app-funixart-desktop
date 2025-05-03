import styles from './CollectionCard.module.css';

import { Link } from 'react-router-dom';
import { BiCommentDetail } from 'react-icons/bi';
import { IoBookmarkOutline } from 'react-icons/io5';

export const CollectionCard = (props) => (
    <Link
      to={`/collection/${props.collection.id}`}
      id="collection_card"
      className={styles.collection_card}
      onClick={() => props.clickCallBack && props.clickCallBack('')}
    >
      {/* <div className={styles.release_image_border_bg} style={{width:'17.5rem'}}/>

            <div className={styles.release_image_border_bg}/> */}

      <div className={styles.release_image_border}>
        <img className={styles.release_image} src={props.collection.image} alt="" />

        <div className={styles.release_info_border}>
          <p className={styles.anime_title}>{props.collection.title}</p>
          <div className={styles.collection_chips}>
            <div className={styles.anime_subinfo}>
              <p>{props.collection.comment_count}</p>
              <BiCommentDetail />
            </div>

            <div className={styles.anime_subinfo}>
              <p>{props.collection.favorites_count}</p>
              <IoBookmarkOutline />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
