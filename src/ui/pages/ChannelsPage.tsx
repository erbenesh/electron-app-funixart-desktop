import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoCheckmarkSharp, IoAddSharp } from 'react-icons/io5'
import { Spinner } from 'ui-kit/components/Spinner/Spinner'
import { useGetAllChannels, useGetChannelRecommendations, useSubscribeChannel, useUnsubscribeChannel } from '../api/hooks/useChannel'
import { useUserStore } from '../auth/store/auth'
import { useScrollPosition } from '../hooks/useScrollPosition'
import styles from './ChannelsPage.module.css'

export const ChannelsPage = () => {
    const navigate = useNavigate()
    const userStore = useUserStore()
    const channels = useGetAllChannels(userStore.token)
    const recommendations = useGetChannelRecommendations(userStore.token)
    const subscribe = useSubscribeChannel()
    const unsubscribe = useUnsubscribeChannel()
    const scrollPosition = useScrollPosition()
    
    const [localSubscriptions, setLocalSubscriptions] = useState<Record<number, boolean>>({})

    useEffect(() => {
        if (channels.isSuccess && !channels.isFetchingNextPage && scrollPosition >= 90) {
            channels.fetchNextPage()
        }
    }, [scrollPosition, channels])

    useEffect(() => {
        if (recommendations.isSuccess && !recommendations.isFetchingNextPage && scrollPosition >= 90) {
            recommendations.fetchNextPage()
        }
    }, [scrollPosition, recommendations])

    const recommendationsItems = recommendations.data?.pages?.flatMap((pg: any) => 
        pg.content?.filter((ch: any) => ch) || []
    ) || []

    const channelsItems = channels.data?.pages?.flatMap((pg: any) => 
        pg.content?.filter((ch: any) => ch) || []
    ) || []

    const handleSubscription = async (channelId: number, isCurrentlySubscribed: boolean) => {
        if (!userStore.token) return
        
        // Оптимистичное обновление UI
        setLocalSubscriptions(prev => ({ ...prev, [channelId]: !isCurrentlySubscribed }))
        
        try {
            if (isCurrentlySubscribed) {
                await unsubscribe.mutateAsync({ channelId, token: userStore.token })
            } else {
                await subscribe.mutateAsync({ channelId, token: userStore.token })
            }
            // Обновляем данные после успешной операции
            channels.refetch()
            recommendations.refetch()
        } catch (error) {
            // Откатываем изменение при ошибке
            setLocalSubscriptions(prev => ({ ...prev, [channelId]: isCurrentlySubscribed }))
        }
    }

    const getIsSubscribed = (channel: any) => {
        return localSubscriptions[channel.id] ?? channel.is_subscribed
    }

    const renderChannelItem = (channel: any) => {
        const isSubscribed = getIsSubscribed(channel)
        
        return (
            <div key={channel.id} className={styles.channel_item}>
                <div 
                    className={styles.channel_info}
                    onClick={() => navigate(`/channel/${channel.id}`)}
                >
                    <div className={styles.channel_avatar}>
                        <img src={channel.avatar} alt={channel.title || 'Канал'} />
                    </div>
                    <div className={styles.channel_details}>
                        <div className={styles.channel_name_row}>
                            <span className={styles.channel_name}>{channel.title || 'Без названия'}</span>
                            {channel.is_verified && <span className={styles.verified_badge}>✓</span>}
                        </div>
                        <div className={styles.channel_meta}>
                            <span className={styles.subscribers_count}>
                                {channel.subscriber_count?.toLocaleString()} подписчик{channel.subscriber_count !== 1 && (channel.subscriber_count % 10 === 1 && channel.subscriber_count % 100 !== 11 ? 'а' : 'ов')}
                            </span>
                        </div>
                    </div>
                </div>
                <button 
                    className={`${styles.subscribe_button} ${isSubscribed ? styles.subscribed : ''}`}
                    onClick={(e) => {
                        e.stopPropagation()
                        handleSubscription(channel.id, isSubscribed)
                    }}
                    type="button"
                    aria-label={isSubscribed ? 'Отписаться' : 'Подписаться'}
                >
                    {isSubscribed ? (
                        <IoCheckmarkSharp className={styles.button_icon} />
                    ) : (
                        <IoAddSharp className={styles.button_icon} />
                    )}
                </button>
            </div>
        )
    }

    return (
        <div className={styles.channels_page}>
            {/* Актуальное / Trending */}
            <section className={styles.section}>
                <div className={styles.section_header}>
                    <h2 className={styles.section_title}>Актуальное</h2>
                </div>
                <div className={styles.trending_tags}>
                    <span className={styles.trending_tag}>#Goddik</span>
                    <span className={styles.trending_tag}>#art</span>
                    <span className={styles.trending_tag}>#Metropoliman</span>
                </div>
            </section>

            {/* Каналы */}
            <section className={styles.section}>
                <div className={styles.section_header}>
                    <h2 className={styles.section_title}>Каналы</h2>
                    <button 
                        className={styles.show_all_button}
                        onClick={() => {/* TODO: показать все каналы */}}
                        type="button"
                    >
                        Показать все
                    </button>
                </div>
                {channels.isLoading ? (
                    <div className="loader-container_home">
                        <Spinner />
                    </div>
                ) : (
                    <div className={styles.channels_list}>
                        {channelsItems.slice(0, 5).map(renderChannelItem)}
                        {channelsItems.length === 0 && (
                            <div className={styles.empty_state}>Нет каналов</div>
                        )}
                    </div>
                )}
            </section>

            {/* Блоги */}
            <section className={styles.section}>
                <div className={styles.section_header}>
                    <h2 className={styles.section_title}>Блоги</h2>
                    <button 
                        className={styles.show_all_button}
                        onClick={() => {/* TODO: показать все блоги */}}
                        type="button"
                    >
                        Показать все
                    </button>
                </div>
                {recommendations.isLoading ? (
                    <div className="loader-container_home">
                        <Spinner />
                    </div>
                ) : (
                    <div className={styles.channels_list}>
                        {recommendationsItems
                            .filter((ch: any) => ch.is_blog)
                            .slice(0, 5)
                            .map(renderChannelItem)}
                        {recommendationsItems.filter((ch: any) => ch.is_blog).length === 0 && (
                            <div className={styles.empty_state}>Нет блогов</div>
                        )}
                    </div>
                )}
            </section>

            {/* Рекомендации */}
            {!recommendations.isLoading && recommendationsItems.filter((ch: any) => !ch.is_blog).length > 0 && (
                <section className={styles.section}>
                    <div className={styles.section_header}>
                        <h2 className={styles.section_title}>Рекомендации</h2>
                    </div>
                    <div className={styles.channels_list}>
                        {recommendationsItems
                            .filter((ch: any) => !ch.is_blog)
                            .slice(0, 10)
                            .map(renderChannelItem)}
                    </div>
                </section>
            )}

            {(channels.isFetchingNextPage || recommendations.isFetchingNextPage) && (
                <div className="loader-container_home">
                    <Spinner />
                </div>
            )}
        </div>
    )
}
