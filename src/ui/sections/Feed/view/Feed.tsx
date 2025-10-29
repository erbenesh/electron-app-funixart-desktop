import { useGetChannelSubs } from '#/api/hooks';
import { useUserStore } from '#/auth/store/auth';
import { PostInput } from '#/components/PostInput/PostInput';
import { TopFilterButtons } from '#/components/TopFilterButtons/TopFilterButtons';
import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../styles/Feed.css';


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

    const channelSubs = useGetChannelSubs(userStore.token);

    const navigate = useNavigate();

    useEffect(() => {
        navigate("/feed/news");
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
  
        <div className="feed_page_wrap">

            <div className="feed_page">

                <TopFilterButtons buttonsArray={feedArray} />

                <div className="feed_channels">
                    {channelSubs.data?.content.map((channel) => 
                        <Link key={channel.id} to={`/channel/${channel.id}`} className="channel_subed">
                            <div className="channel_avatar_border">
                                <img className="channel_avatar" src={channel.avatar} alt={channel.title || ''} />
                            </div>

                            <p className="channel_title">
                                {channel.title}
                            </p>
                        </Link>
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

                <Outlet />

                {/* <FeedList newsList={feedNews.data}/> */}

            </div>

        </div>


    )
}