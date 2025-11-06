import { useGetChannelSubs } from '#/api/hooks';
import { useUserStore } from '#/auth/store/auth';
import { PostInput } from '#/components/PostInput/PostInput';
import { TopFilterButtons } from '#/components/TopFilterButtons/TopFilterButtons';
import { TabCarousel } from '#/components/TabCarousel/TabCarousel';
import { FeedList } from '#/components/FeedList/FeedList';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoChevronDown } from 'react-icons/io5';
import { Page } from 'ui-kit/components/Page/Page'
import { Container } from 'ui-kit/components/Container/Container'
import { useClickOutside } from '#/hooks/useClickOutside';
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
    
    const [timeFilter, setTimeFilter] = useState('all'); // all, week, month, year
    const [isTimeFilterOpen, setIsTimeFilterOpen] = useState(false);
    const timeFilterRef = useRef<HTMLDivElement>(null);
    
    useClickOutside(timeFilterRef, () => setIsTimeFilterOpen(false));
    
    const timeFilterOptions = [
        { value: 'all', label: 'Всё время' },
        { value: 'day', label: 'За день' },
        { value: 'week', label: 'За неделю' },
        { value: 'month', label: 'За месяц' },
        { value: 'year', label: 'За год' },
    ];

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

    const selectedTimeFilter = timeFilterOptions.find(opt => opt.value === timeFilter) || timeFilterOptions[0];

    return (
        <Page>
            <TopFilterButtons buttonsArray={feedArray} />
            <Container>
                <div>

                    {/* Filter bar */}
                    <div className="feed_filter_bar">
                        <div ref={timeFilterRef} className="time_filter_wrap">
                            <button 
                                className="time_filter_button"
                                onClick={() => setIsTimeFilterOpen(!isTimeFilterOpen)}
                                type="button"
                            >
                                <span>{selectedTimeFilter.label}</span>
                                <IoChevronDown className={`filter_chevron ${isTimeFilterOpen ? 'open' : ''}`} />
                            </button>
                            
                            {isTimeFilterOpen && (
                                <div className="time_filter_dropdown">
                                    {timeFilterOptions.map(option => (
                                        <button
                                            key={option.value}
                                            className={`filter_option ${timeFilter === option.value ? 'active' : ''}`}
                                            onClick={() => {
                                                setTimeFilter(option.value);
                                                setIsTimeFilterOpen(false);
                                            }}
                                            type="button"
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        <button 
                            className="filter_all_button" 
                            type="button"
                            onClick={() => navigate('/channels')}
                        >
                            Все
                        </button>
                    </div>

                    {/* Channels stories */}
                    <div className="feed_channels">
                        {channelSubs.data?.content.map((channel) => 
                            <div 
                                key={channel.id} 
                                className="channel_subed"
                                onClick={() => navigate(`/channel/${channel.id}`)}
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

                    {/* Post input */}
                    <div className="feed_post_input_wrap">
                        <PostInput 
                            avatarUrl={userStore.user?.avatar || ''} 
                            placeholder="Расскажите о чём-нибудь...."
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

                    {/* Feed content */}
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