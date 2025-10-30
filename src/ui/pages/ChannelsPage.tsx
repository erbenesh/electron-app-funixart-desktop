import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from 'ui-kit/components/Avatar/Avatar'
import { Card } from 'ui-kit/components/Card/Card'
import { Carousel } from 'ui-kit/components/Carousel/Carousel'
import { MediaCard } from '#/components/MediaCard/MediaCard'
import { Spinner } from 'ui-kit/components/Spinner/Spinner'
import { useGetAllChannels, useGetChannelRecommendations } from '../api/hooks/useChannel'
import { useUserStore } from '../auth/store/auth'
import { useScrollPosition } from '../hooks/useScrollPosition'
import styles from './ChannelsPage.module.css'

export const ChannelsPage = () => {
    const userStore = useUserStore()
    const channels = useGetAllChannels(userStore.token)
    const recommendations = useGetChannelRecommendations(userStore.token)
    const scrollPosition = useScrollPosition()

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

    // recommendations carousel managed inside Carousel component

    const recommendationsItems = recommendations.data?.pages?.flatMap((pg: any) => 
        pg.content?.filter((ch: any) => ch) || []
    ) || []

    const channelsItems = channels.data?.pages?.flatMap((pg: any) => 
        pg.content?.filter((ch: any) => ch) || []
    ) || []

    return (
        <div className={styles.channels_page}>
            <section className={styles.section}>
                <h2 className={styles.section_title}>Рекомендации</h2>
                {recommendations.isLoading ? (
                    <div className="loader-container_home">
                        <Spinner />
                    </div>
                ) : (
                    <>
                    <Carousel ariaLabel="Рекомендованные каналы" showDots={false}>
                        {recommendationsItems.map((ch: any) => (
                            <div key={ch.id} className={styles.channel_item}>
                            <Link to={`/channel/${ch.id}`} className={styles.channel_card}>
                                {ch.avatar ? (
                                    <MediaCard
                                        imageUrl={ch.avatar}
                                        bottomOverlay={
                                            <div className={styles.channel_info}>
                                                <p className={styles.channel_title}>{ch.title || 'Без названия'}</p>
                                            </div>
                                        }
                                    />
                                ) : (
                                    <Card className={styles.channel_card_fallback}>
                                        <Avatar src={ch.avatar} alt={ch.title || 'Канал'} size="lg" />
                                        <p className={styles.channel_title}>{ch.title || 'Без названия'}</p>
                                    </Card>
                                )}
                            </Link>
                            <div className={styles.hover_info}>
                                <p className={styles.hover_title}>{ch.title || 'Без названия'} {ch.is_verified && <span className={styles.verified}>✓</span>}</p>
                                <p className={styles.hover_desc}>{ch.description || 'Описание отсутствует'}</p>
                                <div className={styles.hover_stats}>
                                    {typeof ch.subscriber_count === 'number' && (
                                        <span className={styles.hover_chip}>Подписчики: {ch.subscriber_count}</span>
                                    )}
                                    {typeof ch.article_count === 'number' && (
                                        <span className={styles.hover_chip}>Статей: {ch.article_count}</span>
                                    )}
                                    {ch.is_blog && <span className={styles.hover_chip}>Блог</span>}
                                </div>
                                <div className={styles.hover_footer}>
                                    <span>Кликните, чтобы открыть</span>
                                </div>
                            </div>
                            </div>
                        ))}
                    </Carousel>
                    {recommendationsItems.length === 0 && (
                        <div className={styles.empty_state}>Нет рекомендаций</div>
                    )}
                    </>
                )}
                {recommendations.isFetchingNextPage && (
                    <div className="loader-container_home">
                        <Spinner />
                    </div>
                )}
            </section>

            <section className={styles.section}>
                <h2 className={styles.section_title}>Все каналы</h2>
                {channels.isLoading ? (
                    <div className="loader-container_home">
                        <Spinner />
                    </div>
                ) : (
                    <div className={styles.channels_list}>
                        {channelsItems.map((ch: any) => (
                            <div key={ch.id} className={styles.channel_item}>
                            <Link to={`/channel/${ch.id}`} className={styles.channel_card}>
                                {ch.avatar ? (
                                    <MediaCard
                                        imageUrl={ch.avatar}
                                        bottomOverlay={
                                            <div className={styles.channel_info}>
                                                <p className={styles.channel_title}>{ch.title || 'Без названия'}</p>
                                            </div>
                                        }
                                    />
                                ) : (
                                    <Card className={styles.channel_card_fallback}>
                                        <Avatar src={ch.avatar} alt={ch.title || 'Канал'} size="lg" />
                                        <p className={styles.channel_title}>{ch.title || 'Без названия'}</p>
                                    </Card>
                                )}
                            </Link>
                            <div className={styles.hover_info}>
                                <p className={styles.hover_title}>{ch.title || 'Без названия'} {ch.is_verified && <span className={styles.verified}>✓</span>}</p>
                                <p className={styles.hover_desc}>{ch.description || 'Описание отсутствует'}</p>
                                <div className={styles.hover_stats}>
                                    {typeof ch.subscriber_count === 'number' && (
                                        <span className={styles.hover_chip}>Подписчики: {ch.subscriber_count}</span>
                                    )}
                                    {typeof ch.article_count === 'number' && (
                                        <span className={styles.hover_chip}>Статей: {ch.article_count}</span>
                                    )}
                                    {ch.is_blog && <span className={styles.hover_chip}>Блог</span>}
                                </div>
                                <div className={styles.hover_footer}>
                                    <span>Кликните, чтобы открыть</span>
                                </div>
                            </div>
                            </div>
                        ))}
                        {channelsItems.length === 0 && (
                            <div className={styles.empty_state}>Нет каналов</div>
                        )}
                    </div>
                )}
                {channels.isFetchingNextPage && (
                    <div className="loader-container_home">
                        <Spinner />
                    </div>
                )}
            </section>
        </div>
    )
}
