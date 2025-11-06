import { useEffect, useState } from 'react';
import { Lightbox } from 'ui-kit/components/Lightbox/Lightbox';
import { useGetFeedInfinite } from '../../api/hooks/useFeed';
import { useUserStore } from '../../auth/store/auth';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { FeedPost } from '../FeedPost/FeedPost';
import styles from './FeedList.module.css';

interface FeedListProps {
    feedType: 'news' | 'latest';
}

export const FeedList = ({ feedType }: FeedListProps) => {
    const userStore = useUserStore();
    const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
    const [lightboxImages, setLightboxImages] = useState<string[]>([]);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const feedNews = useGetFeedInfinite({ path: feedType, token: userStore.token });

    const scrollPosition = useScrollPosition();
    useEffect(() => {
        
        if (feedNews.isSuccess && !feedNews.isFetchingNextPage && scrollPosition >= 90) {
            feedNews.fetchNextPage();
        }

    }, [scrollPosition])
    
    if (feedNews.status === "error") {
        return ('An error has occurred: ' + feedNews.error.message);
    }

    return (
        <div className={styles.feed_news}>
            {
                feedNews.data?.pages.map(post => post.id && (
                    <FeedPost
                        key={post.id}
                        post={post}
                        token={userStore.token}
                        userAvatar={userStore.user?.avatar}
                        onVote={() => feedNews.refetch()}
                        onImageClick={(url, allImages, clickedIndex) => {
                            setLightboxImages(allImages);
                            setLightboxIndex(clickedIndex);
                            setLightboxSrc(url);
                        }}
                    />
                ))
            }
            
            {/* Lightbox for images */}
            {lightboxSrc && (
                <Lightbox 
                    open={true} 
                    images={lightboxImages}
                    initialIndex={lightboxIndex}
                    onClose={() => {
                        setLightboxSrc(null);
                        setLightboxImages([]);
                        setLightboxIndex(0);
                    }} 
                />
            )}
        </div>
    )
}