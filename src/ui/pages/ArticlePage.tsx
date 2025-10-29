import { useQuery } from '@tanstack/react-query'
import parse from 'html-react-parser'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from 'ui-kit/components/Button/Button'
import { Card } from 'ui-kit/components/Card/Card'
import { Spinner } from 'ui-kit/components/Spinner/Spinner'
import { articleService } from '../api/ArticleService'
import { formatPostTimestamp } from '../api/utils'
import { useUserStore } from '../auth/store/auth'
import postStyles from '../components/FeedList/FeedList.module.css'
import { PostMediaItem } from '../components/PostMediaItem/PostMediaItem'

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
    <div style={{ padding: 16 }}>
      <Card className={postStyles.news_post}>
        <div className={postStyles.post_channel}>
          <div className={postStyles.channel}>
            <div className={postStyles.channel_avatar}>
              {data.channel?.avatar && (
                <img className={postStyles.channel_avatar_image} src={data.channel.avatar} alt={data.channel?.title || 'Канал'} />
              )}
            </div>
            <p className={postStyles.channel_title}>{data.channel?.title || 'Канал'}</p>
          </div>
          <span className={postStyles.post_timing}>
            {formatPostTimestamp(data.last_update_date || data.creation_date)}
          </span>
        </div>

        {data.title && (
          <h2 className={postStyles.post_text_blocks}>{data.title}</h2>
        )}

        <div className={postStyles.post_blocks}>
          {data.payload?.blocks?.map((b: any) =>
            b.type === 'header' ? (
              <h3 key={b.id} className={postStyles.post_text_blocks}>{parse(b.data.text)}</h3>
            ) : b.type === 'paragraph' ? (
              <p key={b.id} className={postStyles.post_text_blocks}>{parse(b.data.text)}</p>
            ) : b.type === 'media' && (
              <div key={b.id} className={postStyles.post_images_flex} data-count={b.data.item_count >= 5 ? '5+' : b.data.item_count}>
                {b.data.items?.map((item: any, index: number) => item.id && (
                  <PostMediaItem key={item.id} item={item} index={index} dataCount={b.data.item_count} />
                ))}
              </div>
            )
          )}
        </div>

        <div className={postStyles.post_actions}>
          <Button variant="ghost" size="sm" className={`${postStyles.post_action_button} ${postStyles.like_button}`}>
            ❤ {data.vote_count ?? 0}
          </Button>
          <Button variant="ghost" size="sm" className={`${postStyles.post_action_button} ${postStyles.repost_button}`}>
            💬 {data.comment_count ?? 0}
          </Button>
        </div>
      </Card>
    </div>
  )
}


