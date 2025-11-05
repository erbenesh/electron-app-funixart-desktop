import parse from 'html-react-parser';
import { useEffect } from 'react';
import { BiRepost } from 'react-icons/bi';
import { IoHeartOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { articleService } from '../../api/ArticleService';
import { commentService } from '../../api/CommentService';
import { useGetFeedInfinite } from '../../api/hooks/useFeed';
import { formatPostTimestamp } from '../../api/utils';
import { useUserStore } from '../../auth/store/auth';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { PostInput } from '../PostInput/PostInput';
import { PostMediaItem } from '../PostMediaItem/PostMediaItem';
import styles from './FeedList.module.css';

interface FeedListProps {
    feedType: 'news' | 'latest';
}

export const FeedList = ({ feedType }: FeedListProps) => {
    const navigate = useNavigate();
    const token = useUserStore((state) => state.token);

    const feedNews = useGetFeedInfinite({ path: feedType, token });

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
                    <div key={post.id} className={styles.news_post}>

                        <div className={styles.post_channel}>

                            <div 
                                className={styles.channel}
                                onClick={() => navigate(`/channel/${post.channel?.id}`)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        navigate(`/channel/${post.channel?.id}`);
                                    }
                                }}
                            >
                                <div className={styles.channel_avatar}>
                                    <img className={styles.channel_avatar_image} src={post.channel.avatar} alt={post.channel.title || 'Канал'} />
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
                            <button className={`${styles.post_action_button} ${styles.like_button}`} type='button'
                                onClick={async () => {
                                    if (!token) return;
                                    try { await articleService.voteArticle(post.id, 1, token); } catch {}
                                }}>
                                <IoHeartOutline className={styles.action_icon}/>
                                Нравится
                            </button>
                            <button className={`${styles.post_action_button} ${styles.repost_button}`} type='button'
                                onClick={() => {/* TODO: implement repost when API is available */}}>
                                <BiRepost className={styles.action_icon}/>
                                Репост
                            </button>
                        </div>

                        <div className={styles.post_comment_add}>
                            <PostInput
                                avatarUrl={useUserStore.getState().user?.avatar || ''}
                                placeholder={'Написать комментарий...'}
                                onPostSubmit={async (text) => {
                                    if (!token) return;
                                    const message = text.trim();
                                    if (!message) return;
                                    try { await commentService.addArticleComment(post.id, { message, spoiler: false }, token); } catch {}
                                }}
                            />
                        </div>

                    </div>
                ))

            }
        </div>
    )
}