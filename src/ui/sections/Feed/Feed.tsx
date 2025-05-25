import styles from './Feed.module.css';

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Outlet, useNavigate } from 'react-router-dom';

import { feedService } from '../../api/feed/FeedService';
import { useAuthStore } from '../../auth/store/authStore';
import { PostInput } from './components/PostInput/PostInput';
import { FilterButtons } from '../../layouts/navigation/FilterButtons/FilterButtons';

const feedArray = [
  {
    id: 0,
    eng_name: 'feed',
    ru_name: 'Моя лента',
    link: '/feed/news',
  },
  {
    id: 1,
    eng_name: 'latesst',
    ru_name: 'Свежее',
    link: '/feed/latest',
  },
];

export const Feed = () => {
  const user = useAuthStore((state) => state.user);

  const channelSubs = useQuery({
    queryKey: ['get channel subs all', 0],
    queryFn: () => feedService.getChannelSubs(0),
  });

  const navigate = useNavigate();

  useEffect(() => {
    navigate('/feed/news');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.feed_page_wrap}>
      <div className={styles.feed_page}>
        <FilterButtons buttonsArray={feedArray} />

        <div className={styles.feed_channels}>
          {channelSubs.data?.data.content.map(
            (channel: {
              id: Key | null | undefined;
              avatar: string | undefined;
              title:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | null
                | undefined;
            }) => (
              <div key={channel.id} className={styles.channel_subed}>
                <div className={styles.channel_avatar_border}>
                  <img className={styles.channel_avatar} src={channel.avatar} alt="" />
                </div>

                <p className={styles.channel_title}>{channel.title}</p>
              </div>
            )
          )}
        </div>

        <div className={styles.feed_channels}>
          <PostInput avatarUrl={user.avatar} />
        </div>

        <div className={styles.feed_news}>
          <Outlet />
        </div>

        {/* <FeedList newsList={feedNews.data}/> */}
      </div>
    </div>
  );
};
