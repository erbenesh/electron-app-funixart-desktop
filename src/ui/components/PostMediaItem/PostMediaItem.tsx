import { memo } from 'react';
import styles from './PostMediaItem.module.css';

interface PostMediaItemProps {
    item: {
        id: number | string;
        url: string;
    };
    index: number;
    dataCount: number;
    onImageClick?: (url: string) => void;
}

const PostMediaItemComponent = ({ item, index, dataCount, onImageClick }: PostMediaItemProps) => {
    const handleClick = () => {
        if (onImageClick) {
            onImageClick(item.url);
        }
    };

    return (
        <div 
            className={styles.post_image}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClick();
                }
            }}
            style={{ cursor: 'pointer' }}
        >
            <img src={item.url} loading="lazy" alt={`Media ${index + 1}`} />

            {index === 5 && dataCount > 6 && (
                <div className={styles.image_count}>+{dataCount - 6}</div>
            )}
        </div>
    );
};

export const PostMediaItem = memo(PostMediaItemComponent);
PostMediaItem.displayName = 'PostMediaItem';