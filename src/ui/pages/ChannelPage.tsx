import { commentService } from '#/api/CommentService'
import { useGetArticlesByChannelInfinite } from '#/api/hooks/useArticle'
import { useGetChannel, useSubscribeChannel, useUnsubscribeChannel } from '#/api/hooks/useChannel'
import { useUserStore } from '#/auth/store/auth'
import { Comment } from '#/components/Comment/Comment'
import { FeedPost } from '#/components/FeedPost/FeedPost'
import postStyles from '#/components/FeedList/FeedList.module.css'
import { PostInput } from '#/components/PostInput/PostInput'
import { useScrollPosition } from '#/hooks/useScrollPosition'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from 'ui-kit/components/Button/Button'
import { Spinner } from 'ui-kit/components/Spinner/Spinner'
import styles from './ChannelPage.module.css'

export const ChannelPage = () => {
  const navigate = useNavigate()
  const { channelId } = useParams()
  const userStore = useUserStore()
  const scrollPosition = useScrollPosition()
  const [expandedComments, setExpandedComments] = useState<Record<number | string, boolean>>({})

  const channel = useGetChannel({ channelId: Number(channelId), token: userStore.token })
  const articlesByChannel = useGetArticlesByChannelInfinite({ channelId: Number(channelId), token: userStore.token })
  const subscribe = useSubscribeChannel()
  const unsubscribe = useUnsubscribeChannel()

  useEffect(() => {
    if (articlesByChannel.isSuccess && !articlesByChannel.isFetchingNextPage && scrollPosition >= 90) {
      articlesByChannel.fetchNextPage()
    }
  }, [scrollPosition, articlesByChannel])

  if (channel.isLoading) {
    return (
      <div className="loader-container_home">
        <Spinner />
      </div>
    )
  }

  const channelData: any = channel.data?.channel

  if (!channelData) {
    return (
      <div className={styles.channel_page}>
        <div className={styles.empty_state}>Канал не найден</div>
      </div>
    )
  }

  return (
    <div className={styles.channel_page}>
      {/* Header with gradient background */}
      <div className={styles.channel_header}>
        <div className={styles.gradient_background} />
        
        {/* Back button */}
        <button 
          className={styles.back_button}
          onClick={() => window.history.back()}
          aria-label="Назад"
        >
          <span>←</span>
        </button>

        {/* Centered content */}
        <div className={styles.header_content}>
          {/* Avatar */}
          <div className={styles.avatar_circle}>
            {channelData.avatar && (
              <img src={channelData.avatar} alt={channelData.title || 'Канал'} className={styles.avatar_image} />
            )}
          </div>

          {/* Title with verification badge */}
          <div className={styles.title_row}>
            <h2 className={styles.title}>{channelData.title || 'Канал'}</h2>
            {channelData.is_verified && (
              <span className={styles.verified_badge}>✓</span>
            )}
          </div>

          {/* Subscriber count */}
          {typeof channelData.subscriber_count === 'number' && (
            <p className={styles.subscribers}>
              {channelData.subscriber_count.toLocaleString()} подписчиков
            </p>
          )}

          {/* Description */}
          {channelData.description && (
            <p className={styles.description}>{channelData.description}</p>
          )}

          {/* Subscribe/Unsubscribe button */}
          <div className={styles.subscribe_action}>
            {channelData.is_subscribed ? (
              <Button
                variant="ghost"
                className={styles.subscribe_button_large}
                onClick={() => userStore.token && unsubscribe.mutate({ channelId: channelData.id, token: userStore.token })}
              >
                Отписаться
              </Button>
            ) : (
              <Button
                variant="primary"
                className={styles.subscribe_button_large}
                onClick={() => userStore.token && subscribe.mutate({ channelId: channelData.id, token: userStore.token })}
              >
                Подписаться
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className={styles.posts_section}>
        <h3 className={styles.posts_title}>Посты</h3>
        
        {articlesByChannel.isLoading ? (
          <div className="loader-container_home">
            <Spinner />
          </div>
        ) : (
          <div className={postStyles.feed_news}>
            {(articlesByChannel.data?.pages
              ?.flatMap((p: any) => (p.content || []).filter(Boolean))
            )
              .map((post: any) => {
              const BlockComments = ({ blockId }: { blockId: number | string }) => {
                const comments = useInfiniteQuery({
                  queryKey: ['getBlockComments', blockId, userStore.token],
                  queryFn: ({ pageParam = 0 }) => 
                    commentService.getAllComments("article", blockId, pageParam, userStore.token!),
                  initialPageParam: 0,
                  getNextPageParam: (lastPage) => {
                    if (lastPage.content.length === 0) return undefined
                    return lastPage.currentPage + 1
                  },
                  enabled: Boolean(expandedComments[blockId] && userStore.token && blockId),
                })

                const commentsItems = comments.data?.pages?.flatMap((pg: any) => 
                  pg.content?.filter((c: any) => c) || []
                ) || []

                return (
                  <div className={styles.comments_section}>
                    {comments.isLoading && <Spinner />}
                    {commentsItems.map((comment: any) => (
                      <Comment key={comment.id} comment={comment} type="article" />
                    ))}
                    {commentsItems.length === 0 && !comments.isLoading && (
                      <div className={styles.no_comments}>Нет комментариев</div>
                    )}
                  </div>
                )
              }

              return (
                <div key={post.id}>
                  <FeedPost
                    post={post}
                    token={userStore.token}
                    userAvatar={userStore.user?.avatar}
                    onVote={() => articlesByChannel.refetch()}
                    onCommentClick={() => setExpandedComments(prev => ({
                      ...prev,
                      [post.id]: !prev[post.id]
                    }))}
                  />

                  {expandedComments[post.id] && (
                    <BlockComments blockId={post.id} />
                  )}

                  {expandedComments[post.id] && (
                    <div className={postStyles.post_comment_add}>
                      <PostInput
                        avatarUrl={userStore.user?.avatar || ''}
                        placeholder={'Написать комментарий...'}
                        onPostSubmit={async (text) => {
                          if (!userStore.token) return
                          const message = text.trim()
                          if (!message) return
                          try { await commentService.addArticleComment(post.id, { message, spoiler: false }, userStore.token) } catch {}
                        }}
                      />
                    </div>
                  )}
                </div>
              )
            })}

            {(articlesByChannel.data?.pages?.flatMap((p: any) => (p.content || []).filter(Boolean)).length || 0) === 0 && (
              <div className={styles.empty_state}>Нет постов</div>
            )}
          </div>
        )}
        {articlesByChannel.isFetchingNextPage && (
          <div className="loader-container_home">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  )
}


