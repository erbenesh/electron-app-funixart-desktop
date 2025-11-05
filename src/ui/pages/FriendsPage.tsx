import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar } from 'ui-kit/components/Avatar/Avatar'
import { Button } from 'ui-kit/components/Button/Button'
import { Card } from 'ui-kit/components/Card/Card'
import { Spinner } from 'ui-kit/components/Spinner/Spinner'
import { useGetFriendRecommendations, useGetFriendRequestsIn, useGetFriendRequestsOut, useGetFriends, useRemoveFriend, useSendFriendRequest } from '../api/hooks/useFriends'
import { useUserStore } from '../auth/store/auth'
import { useScrollPosition } from '../hooks/useScrollPosition'
import styles from './FriendsPage.module.css'

export const FriendsPage = () => {
    const navigate = useNavigate()
    const userStore = useUserStore()

    const friends = useGetFriends({ profileId: userStore.user?.id || 0, page: 0, token: userStore.token })
    const requestsIn = useGetFriendRequestsIn({ page: 0, token: userStore.token })
    const requestsOut = useGetFriendRequestsOut({ page: 0, token: userStore.token })
    const recommendations = useGetFriendRecommendations(userStore.token)

    const sendRequest = useSendFriendRequest()
    const removeFriend = useRemoveFriend()

    const scrollPosition = useScrollPosition()

    useEffect(() => {
        if (requestsIn.isSuccess && !requestsIn.isFetchingNextPage && scrollPosition >= 90) {
            requestsIn.fetchNextPage()
        }
    }, [scrollPosition, requestsIn])

    useEffect(() => {
        if (requestsOut.isSuccess && !requestsOut.isFetchingNextPage && scrollPosition >= 90) {
            requestsOut.fetchNextPage()
        }
    }, [scrollPosition, requestsOut])

    const friendsItems = friends.data?.content?.filter((p: any) => p) || []
    const requestsInItems = requestsIn.data?.pages?.flatMap((pg: any) => 
        pg.content?.filter((p: any) => p) || []
    ) || []
    const requestsOutItems = requestsOut.data?.pages?.flatMap((pg: any) => 
        pg.content?.filter((p: any) => p) || []
    ) || []
    const recommendationsItems = recommendations.data?.content?.filter((p: any) => p) || []

    return (
        <div className={styles.friends_page}>
            <div className={styles.friends_content}>
                <section className={styles.section}>
                    <h2 className={styles.section_title}>Мои друзья</h2>
                    {friends.isLoading ? (
                        <div className="loader-container_home">
                            <Spinner />
                        </div>
                    ) : (
                        <div className={styles.list}>
                            {friendsItems.map((p: any) => (
                                <Card key={p.id} className={styles.friend_card}>
                                    <div 
                                        className={styles.friend_link}
                                        onClick={() => navigate(`/profile/${p.id}`)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <Avatar src={p.avatar} alt={p.login || 'Пользователь'} size="md" />
                                        <div className={styles.friend_info}>
                                            <span className={styles.friend_login}>{p.login || 'Без имени'}</span>
                                        </div>
                                    </div>
                                    <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => removeFriend.mutate({ profileId: p.id, token: userStore.token! })}
                                    >
                                        Удалить
                                    </Button>
                                </Card>
                            ))}
                            {friendsItems.length === 0 && (
                                <div className={styles.empty_state}>Нет друзей</div>
                            )}
                        </div>
                    )}
                </section>

                <section className={styles.section}>
                    <h2 className={styles.section_title}>Входящие запросы</h2>
                    {requestsIn.isLoading ? (
                        <div className="loader-container_home">
                            <Spinner />
                        </div>
                    ) : (
                        <div className={styles.list}>
                            {requestsInItems.map((p: any) => (
                                <Card key={p.id} className={styles.friend_card}>
                                    <div 
                                        className={styles.friend_link}
                                        onClick={() => navigate(`/profile/${p.id}`)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <Avatar src={p.avatar} alt={p.login || 'Пользователь'} size="md" />
                                        <div className={styles.friend_info}>
                                            <span className={styles.friend_login}>{p.login || 'Без имени'}</span>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                            {requestsInItems.length === 0 && (
                                <div className={styles.empty_state}>Нет входящих запросов</div>
                            )}
                        </div>
                    )}
                    {requestsIn.isFetchingNextPage && (
                        <div className="loader-container_home">
                            <Spinner />
                        </div>
                    )}
                </section>

                <section className={styles.section}>
                    <h2 className={styles.section_title}>Исходящие запросы</h2>
                    {requestsOut.isLoading ? (
                        <div className="loader-container_home">
                            <Spinner />
                        </div>
                    ) : (
                        <div className={styles.list}>
                            {requestsOutItems.map((p: any) => (
                                <Card key={p.id} className={styles.friend_card}>
                                    <div 
                                        className={styles.friend_link}
                                        onClick={() => navigate(`/profile/${p.id}`)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <Avatar src={p.avatar} alt={p.login || 'Пользователь'} size="md" />
                                        <div className={styles.friend_info}>
                                            <span className={styles.friend_login}>{p.login || 'Без имени'}</span>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                            {requestsOutItems.length === 0 && (
                                <div className={styles.empty_state}>Нет исходящих запросов</div>
                            )}
                        </div>
                    )}
                    {requestsOut.isFetchingNextPage && (
                        <div className="loader-container_home">
                            <Spinner />
                        </div>
                    )}
                </section>

                <section className={styles.section}>
                    <h2 className={styles.section_title}>Рекомендации</h2>
                    {recommendations.isLoading ? (
                        <div className="loader-container_home">
                            <Spinner />
                        </div>
                    ) : (
                        <div className={styles.list}>
                            {recommendationsItems.map((p: any) => (
                                <Card key={p.id} className={styles.friend_card}>
                                    <div 
                                        className={styles.friend_link}
                                        onClick={() => navigate(`/profile/${p.id}`)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <Avatar src={p.avatar} alt={p.login || 'Пользователь'} size="md" />
                                        <div className={styles.friend_info}>
                                            <span className={styles.friend_login}>{p.login || 'Без имени'}</span>
                                        </div>
                                    </div>
                                    <Button 
                                        variant="primary" 
                                        size="sm"
                                        onClick={() => sendRequest.mutate({ profileId: p.id, token: userStore.token! })}
                                    >
                                        Добавить
                                    </Button>
                                </Card>
                            ))}
                            {recommendationsItems.length === 0 && (
                                <div className={styles.empty_state}>Нет рекомендаций</div>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}
