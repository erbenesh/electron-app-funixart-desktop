
import { useQuery } from '@tanstack/react-query';
import { anixartService } from '../../services/AnixartService';
import styles from './Feed.module.css'
import { useEffect, useState } from 'react';
import { useUserStore } from '../../services/auth';
import parse from 'html-react-parser';
import { useScrollPosition } from '../../hooks/useScrollPosition';

export const Feed = (props) => {

    const token = useUserStore((state) => state.token);
    const [ page, setPage ] = useState(0);

    const [ newsList, setNewsList ] = useState(null);

    const fetchFeedNews = useQuery({
        queryKey: ['get feed news', token, page],
        queryFn: () => anixartService.getFeedNews(token, page)
    });

    useEffect(() => {

        function loadNews() {
            const newsData = fetchFeedNews.data?.data.content;
            console.log(newsData);
            setNewsList(newsData);
        }

        if(!newsList) {

            loadNews();
                
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchFeedNews.status]);

    useEffect(() => {

        function loadNextNews() {
            const newsData = fetchFeedNews.isPending ? [] : fetchFeedNews.data?.data.content;
            const newNews = [...newsList, ...newsData];

            setNewsList(newNews);
        }

        if (page > 0) {

            loadNextNews();
                
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, fetchFeedNews.status]);

    const scrollPosition = useScrollPosition();
    useEffect(() => {
        
        if (scrollPosition >= 90) {
            if(page === 0) {
                setPage(1);
            } else {
                setPage(page + 1);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollPosition])

    
    if (fetchFeedNews.status === "error") {
        return ('An error has occurred: ' + fetchFeedNews.error.message);
    }

    return (
        <div>
            { !newsList ?
            (
            <div className="loader-container_home">	
                <i className="loader-circle"></i>
            </div>
            ) : (
            <div className={styles.feed_page_wrap}>

                <div className={styles.feed_page}>

                    <div className={styles.feed_channels}>

                    </div>

                    <div className={styles.feed_news}>
                        {

                            newsList?.map(post => post.id && (
                                <div key={post.id} className={styles.news_post}>
                                    <div className={styles.post_channel}>
                                        <div className={styles.channel_avatar}>
                                            <img className={styles.channel_avatar_image} src={post.channel.avatar} alt="" />
                                        </div>
                                        <p className={styles.channel_title}>{post.channel.title}</p>
                                    </div>

                                    <div className={styles.post_blocks}>
                                        {post.payload.blocks?.map(block => block.id && block.type === "paragraph" ? 
                                        <p key={block.id} className={styles.post_text_blocks}>{parse(block.data.text)}</p> 
                                        : block.type === "media" 
                                        && <div key={block.id} className={styles.post_images_flex}>
                                            { 
                                                block.data.items?.map(item => item.id && 
                                                <img key={item.id} src={item.url} className={styles.post_image}
                                                // style={{width: `${item.width}`, height: `${item.height}`,}} 
                                                alt=""/>)
                                            }
                                            </div>
                                        )}
                                    </div>

                                    <div className={styles.post_image}>
                                        
                                    </div>

                                    <div className={styles.post_action_buttons}>
                                        
                                    </div>

                                </div>
                            ))

                        }
                    </div>

                </div>

            </div>
            )
            }        
            { fetchFeedNews.isPending &&
                <div className="loader-container_home">	
                    <i className="loader-circle"></i>
                </div>
            }
        </div>

    )
}