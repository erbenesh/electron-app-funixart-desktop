import { useQuery } from '@tanstack/react-query';
import styles from './Feed.module.css'
import { useEffect } from 'react';
import { useUserStore } from '../../services/api/auth';
import { feedService } from '../../services/FeedService';
import { TopFilterButtons } from '../../components/TopFilterButtons/TopFilterButtons';
import { Outlet, useNavigate } from 'react-router-dom';
import { PostInput } from '../../components/PostInput/PostInput';

const feedArray = [
    {
        id: 0,
        eng_name: "feed",
        ru_name: "Моя лента",
        link: '/feed/news'
    },
    {
        id: 1,
        eng_name: "latesst",
        ru_name: "Свежее",
        link: '/feed/latest'
    }
];

export const Feed = () => {

    const userStore = useUserStore((state) => state);

    const channelSubs = useQuery({
        queryKey: ['get channel subs all', userStore.token, 0],
        queryFn: () => feedService.getChannelSubs(0, userStore.token)
    });

    const navigate = useNavigate();

    useEffect(() => {
        navigate("/feed/news");
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
  
        <div className={styles.feed_page_wrap}>

            <div className={styles.feed_page}>

                <TopFilterButtons buttonsArray={feedArray} />

                <div className={styles.feed_channels}>
                    {channelSubs.data?.data.content.map((channel, index) => 
                        <div key={channel.id} className={styles.channel_subed}>
                            <div className={styles.channel_avatar_border}>
                                <img className={styles.channel_avatar} src={channel.avatar} alt="" />
                            </div>

                            <p className={styles.channel_title}>
                                {channel.title}
                            </p>
                        </div>
                    )}
                </div>

                <div className={styles.feed_channels}>
                    <PostInput avatarUrl={userStore.user.avatar} />
                </div>

                <Outlet />

                {/* <FeedList newsList={feedNews.data}/> */}

            </div>

        </div>


    )
}