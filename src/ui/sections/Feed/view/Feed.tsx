import { useGetChannelSubs } from '#/api/hooks';
import { useUserStore } from '#/auth/store/auth';
import { PostInput } from '#/components/PostInput/PostInput';
import { TopFilterButtons } from '#/components/TopFilterButtons/TopFilterButtons';
import { TabCarousel } from '#/components/TabCarousel/TabCarousel';
import { FeedList } from '#/components/FeedList/FeedList';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Page } from 'ui-kit/components/Page/Page'
import { Container } from 'ui-kit/components/Container/Container'
import '../styles/Feed.css';


const feedArray = [
    {
        id: 0,
        eng_name: "feed",
        ru_name: "Моя лента",
        link: '/feed/news',
        type: 'news' as const
    },
    {
        id: 1,
        eng_name: "latesst",
        ru_name: "Свежее",
        link: '/feed/latest',
        type: 'latest' as const
    }
];

export const Feed = () => {

    const userStore = useUserStore((state) => state);

    const channelSubs = useGetChannelSubs(userStore.token);

    const navigate = useNavigate();
    const location = useLocation();

    const getIndexFromPath = (path: string) => {
        const index = feedArray.findIndex(f => f.link === path);
        return index >= 0 ? index : 0;
    };

    const [activeIndex, setActiveIndex] = useState(() => getIndexFromPath(location.pathname));

    // Sync URL with active index
    useEffect(() => {
        const expectedPath = feedArray[activeIndex]?.link;
        if (expectedPath && location.pathname !== expectedPath) {
            navigate(expectedPath, { replace: true });
        }
    }, [activeIndex, navigate]);

    // Sync active index with URL changes (browser back/forward)
    useEffect(() => {
        const newIndex = getIndexFromPath(location.pathname);
        if (newIndex !== activeIndex) {
            setActiveIndex(newIndex);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const tabs = feedArray.map((feed) => ({
        id: feed.id,
        content: <FeedList key={feed.type} feedType={feed.type} />
    }));

    return (
        <Page>
            <Container>
                <div style={{ paddingTop: 'calc(var(--header-height) + 3.5rem)' }}>
                    <TopFilterButtons buttonsArray={feedArray} />

                    <div className="feed_channels">
                    {channelSubs.data?.content.map((channel) => 
                        <div 
                            key={channel.id} 
                            className="channel_subed"
                            onClick={() => navigate(`/channel/${channel.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="channel_avatar_border">
                                <img className="channel_avatar" src={channel.avatar} alt={channel.title || ''} />
                            </div>

                            <p className="channel_title">
                                {channel.title}
                            </p>
                        </div>
                    )}
                </div>

                <div className="feed_channels">
                    <PostInput 
                        avatarUrl={userStore.user.avatar} 
                        placeholder="Что у вас нового?"
                        onPostSubmit={(text) => {
                            const firstChannel = channelSubs.data?.content?.[0];
                            if (firstChannel) {
                                navigate(`/channel/${firstChannel.id}`, { state: { draft: text } });
                            } else {
                                navigate('/channels');
                            }
                        }}
                    />
                </div>

                    <TabCarousel
                        tabs={tabs}
                        activeIndex={activeIndex}
                        onChange={setActiveIndex}
                    />
                </div>
            </Container>
        </Page>
    )
}