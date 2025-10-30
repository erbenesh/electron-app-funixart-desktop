import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'ui-kit/components/Card/Card'
import { MediaCard } from '#/components/MediaCard/MediaCard'
import { Spinner } from 'ui-kit/components/Spinner/Spinner'
import { useGetAllArticles, useGetLatestArticles } from '../api/hooks/useArticle'
import { useUserStore } from '../auth/store/auth'
import { useScrollPosition } from '../hooks/useScrollPosition'
import styles from './ArticlesPage.module.css'

export const ArticlesPage = () => {
    const userStore = useUserStore()
    const latest = useGetLatestArticles(userStore.token)
    const all = useGetAllArticles(userStore.token)
    const scrollPosition = useScrollPosition()

    useEffect(() => {
        if (latest.isSuccess && !latest.isFetchingNextPage && scrollPosition >= 90) {
            latest.fetchNextPage()
        }
    }, [scrollPosition, latest])

    useEffect(() => {
        if (all.isSuccess && !all.isFetchingNextPage && scrollPosition >= 90) {
            all.fetchNextPage()
        }
    }, [scrollPosition, all])

    const latestItems = latest.data?.pages?.flatMap((pg: any) => 
        pg.content?.filter((a: any) => a) || []
    ) || []
    const allItems = all.data?.pages?.flatMap((pg: any) => 
        pg.content?.filter((a: any) => a) || []
    ) || []

    return (
        <div className={styles.articles_page}>
            <section className={styles.section}>
                <h2 className={styles.section_title}>Последние</h2>
                {latest.isLoading ? (
                    <div className="loader-container_home">
                        <Spinner />
                    </div>
                ) : (
                    <div className={styles.articles_list}>
                        {latestItems.map((a: any) => (
                            <Link key={a.id} to={`/article/${a.id}`} className={styles.article_card}>
                                {a.image ? (
                                    <MediaCard
                                        imageUrl={a.image}
                                        bottomOverlay={
                                            <div className={styles.article_info}>
                                                <p className={styles.article_title}>{a.title || 'Без названия'}</p>
                                            </div>
                                        }
                                    />
                                ) : (
                                    <Card className={styles.article_card_fallback}>
                                        <p className={styles.article_title}>{a.title || 'Без названия'}</p>
                                    </Card>
                                )}
                            </Link>
                        ))}
                        {latestItems.length === 0 && (
                            <div className={styles.empty_state}>Нет статей</div>
                        )}
                    </div>
                )}
                {latest.isFetchingNextPage && (
                    <div className="loader-container_home">
                        <Spinner />
                    </div>
                )}
            </section>

            <section className={styles.section}>
                <h2 className={styles.section_title}>Все статьи</h2>
                {all.isLoading ? (
                    <div className="loader-container_home">
                        <Spinner />
                    </div>
                ) : (
                    <div className={styles.articles_list}>
                        {allItems.map((a: any) => (
                            <Link key={a.id} to={`/article/${a.id}`} className={styles.article_card}>
                                {a.image ? (
                                    <MediaCard
                                        imageUrl={a.image}
                                        bottomOverlay={
                                            <div className={styles.article_info}>
                                                <p className={styles.article_title}>{a.title || 'Без названия'}</p>
                                            </div>
                                        }
                                    />
                                ) : (
                                    <Card className={styles.article_card_fallback}>
                                        <p className={styles.article_title}>{a.title || 'Без названия'}</p>
                                    </Card>
                                )}
                            </Link>
                        ))}
                        {allItems.length === 0 && (
                            <div className={styles.empty_state}>Нет статей</div>
                        )}
                    </div>
                )}
                {all.isFetchingNextPage && (
                    <div className="loader-container_home">
                        <Spinner />
                    </div>
                )}
            </section>
        </div>
    )
}
