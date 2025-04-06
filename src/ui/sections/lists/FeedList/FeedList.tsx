import { PostMediaItem } from '../../Feed/components/PostMediaItem/PostMediaItem'
import parse from 'html-react-parser';
import styles from './FeedList.module.css'
import { formatPostTimestamp } from '../../../utils/utils';
import { useEffect } from 'react';
import { useScrollPosition } from '../../../hooks/useScrollPosition';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '../../../auth/store/authStore';
import { feedService } from '../../../api/feed/FeedService';

export const FeedList = () => {

    const token = useAuthStore((state) => state.token);

    const location = useLocation();

    const feedNews = useInfiniteQuery({
        queryKey: ['get feed news', String(location.pathname).slice(6), token],
        queryFn: meta => feedService.getFeed(String(location.pathname).slice(6), token, meta.pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage.data.content.length === 0) {
                return undefined
            }
            return lastPageParam + 1
          },
        select: data => data.pages.flatMap((page) => page.data.content)
    });

    console.log(String(location.pathname).slice(5));

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

                feedNews.data?.map(post => post.id && (
                    <div key={post.id} className={styles.news_post}>

                        <div className={styles.post_channel}>

                            <div className={styles.channel}>
                                <div className={styles.channel_avatar}>
                                    <img className={styles.channel_avatar_image} src={post.channel.avatar} alt="" />
                                </div>
                            
                                <p className={styles.channel_title}>
                                    {post.channel.title}
                                </p>   

                            </div>                    

                            <span className={styles.post_timing}>
                                {formatPostTimestamp(post.last_update_date)}
                            </span>
                       
                        </div>

                        <div className={styles.post_blocks}>
                            {post.payload.blocks?.map(block => block.id && 

                            block.type === "header" ? 

                            <h2 key={block.id} className={styles.post_text_blocks}>{parse(block.data.text)}</h2> 

                            : block.type === "paragraph" ? 
                            
                            <p key={block.id} className={styles.post_text_blocks}>{parse(block.data.text)}</p> 
                            
                            : block.type === "media" 

                            && <div key={block.id} className={styles.post_images_flex} data-count={block.data.item_count >= 5 ? "5+" : block.data.item_count}>
                                { 
                                    block.data.items?.map((item, index) => item.id && 
                                    <PostMediaItem key={item.id} item={item} index={index} dataCount={block.data.item_count}/>)
                                }
                                </div>
                            )}

                        </div>

                        <div className={styles.post_action_buttons}>
                            
                        </div>

                    </div>
                ))

            }
        </div>
    )
}