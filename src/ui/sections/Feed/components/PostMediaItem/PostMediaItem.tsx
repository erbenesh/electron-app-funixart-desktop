import styles from './PostMediaItem.module.css';

interface Props {
  item: any;
  index: number;
  dataCount: number;
}

export const PostMediaItem = ({ item, index, dataCount }: Props) => (
  <div className={styles.post_image}>
    <img src={item.url} loading="lazy" alt="" />

    {index === dataCount && (
      <>{dataCount > 5 && <div className={styles.image_count}>+{dataCount - 5}</div>}</>
    )}
  </div>
);
