import styles from './PostMediaItem.module.css';

export const PostMediaItem = (props) => (
    <div className={styles.post_image}>
      <img src={props.item.url} loading="lazy" alt="" />

      {props.index === props.dataCount && (
        <>
          {props.dataCount > 5 && <div className={styles.image_count}>+{props.dataCount - 5}</div>}
        </>
      )}
    </div>
  );
