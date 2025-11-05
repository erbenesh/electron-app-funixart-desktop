import { memo } from 'react';
import styles from './PostMediaItem.module.css';

interface PostMediaItemProps {
    item: {
        id: number | string;
        url: string;
    };
    index: number;
    dataCount: number;
}

const PostMediaItemComponent = ({ item, index, dataCount }: PostMediaItemProps) => {
    return (
        <div className={styles.post_image}>
            <img src={item.url} loading="lazy" alt={`Media ${index + 1}`} />

            {index === dataCount && dataCount > 5 && (
                <div className={styles.image_count}>+{dataCount - 5}</div>
            )}
        </div>
    );
};

export const PostMediaItem = memo(PostMediaItemComponent);
PostMediaItem.displayName = 'PostMediaItem';