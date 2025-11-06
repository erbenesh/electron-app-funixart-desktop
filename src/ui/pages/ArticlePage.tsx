import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Spinner } from 'ui-kit/components/Spinner/Spinner'
import { articleService } from '../api/ArticleService'
import { useUserStore } from '../auth/store/auth'
import { FeedPost } from '../components/FeedPost/FeedPost'

export const ArticlePage = () => {
  const { articleId } = useParams()
  const userStore = useUserStore()

  const article = useQuery({
    queryKey: ['article', articleId, userStore.token],
    queryFn: () => articleService.getArticle(Number(articleId), userStore.token),
    enabled: Boolean(articleId),
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [articleId])

  if (article.isLoading) {
    return (
      <div className="loader-container_home">
        <Spinner />
      </div>
    )
  }

  const data: any = article.data?.article || article.data
  if (!data) {
    return <div style={{ padding: 16 }}>Статья не найдена</div>
  }

  return (
    <div style={{ padding: 16, maxWidth: '40rem', margin: '0 auto' }}>
      <FeedPost
        post={data}
        token={userStore.token}
        userAvatar={userStore.user?.avatar}
        onVote={() => article.refetch()}
      />
    </div>
  )
}


