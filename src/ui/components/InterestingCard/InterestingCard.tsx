import styles from './InterestingCard.module.css';

import { Link } from 'react-router-dom';

export const InterestingCard = ({ ...props }) => (
  <Link
    to={
      props.release.type !== 3
        ? `/release/${props.release.action}`
        : `/collection/${props.release.action}`
    }
    id="inter_card"
    className={styles.card}
  >
    <div className={styles.release_image_border}>
      <img className={styles.release_image} src={props.release.image} alt="" />

      {props.release.title && (
        <div className={styles.release_info_border}>
          <p className={styles.anime_title}>{props.release.title}</p>
          <p className={styles.anime_subinfo}>{props.release.description}</p>
        </div>
      )}
    </div>
  </Link>
);
