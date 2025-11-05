import { articleService } from '#/api/ArticleService'
import { commentService } from '#/api/CommentService'
import { useGetArticlesByChannelInfinite } from '#/api/hooks/useArticle'
import { useGetChannel, useSubscribeChannel, useUnsubscribeChannel } from '#/api/hooks/useChannel'
import { formatPostTimestamp } from '#/api/utils'
import { useUserStore } from '#/auth/store/auth'
import { Comment } from '#/components/Comment/Comment'
import postStyles from '#/components/FeedList/FeedList.module.css'
import { PostInput } from '#/components/PostInput/PostInput'
import { PostMediaItem } from '#/components/PostMediaItem/PostMediaItem'
import { useScrollPosition } from '#/hooks/useScrollPosition'
import { useInfiniteQuery } from '@tanstack/react-query'
import parse from 'html-react-parser'
import { useEffect, useState } from 'react'
import { BiRepost } from 'react-icons/bi'
import { IoHeartOutline } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from 'ui-kit/components/Button/Button'
import { Card } from 'ui-kit/components/Card/Card'
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
                <div key={post.id} className={postStyles.news_post}>
                  <div className={postStyles.post_channel}>
                    <div className={postStyles.channel}>
                      <div className={postStyles.channel_avatar}>
                        {channelData.avatar && (
                          <img 
                            className={postStyles.channel_avatar_image} 
                            src={channelData.avatar} 
                            alt={channelData.title || 'Канал'} 
                          />
                        )}
                      </div>
                      <p className={postStyles.channel_title}>
                        {channelData.title || 'Канал'}
                      </p>
                    </div>
                    <span className={postStyles.post_timing}>
                      {formatPostTimestamp(post.last_update_date || post.creation_date)}
                    </span>
                  </div>

                  <div className={styles.post_meta}>
                    <div className={styles.author_row}>
                      <span className={styles.author_avatar}>
                        {(post.author?.avatar || channelData.avatar) && (
                          <img src={post.author?.avatar || channelData.avatar} alt={post.author?.login || channelData.title || 'Автор'} />
                        )}
                      </span>
                      <span>{post.author?.login || 'Аноним'}</span>
                      <span>• {formatPostTimestamp(post.creation_date)}</span>
                    </div>
                    <div className={styles.meta_chips}>
                      <span className={styles.meta_chip}>❤ {post.vote_count ?? 0}</span>
                      <span className={styles.meta_chip}>💬 {post.comment_count ?? 0}</span>
                      <span className={styles.meta_chip}>↻ {post.repost_count ?? 0}</span>
                      {post.is_under_moderation && (
                        <span className={`${styles.meta_chip} ${styles.flag}`}>На модерации</span>
                      )}
                    </div>
                  </div>

                  <div className={postStyles.post_blocks}>
                    {(() => {
                      const elements: any[] = []
                      let inserted = false
                      const blocks = post.payload?.blocks || []
                      blocks.forEach((b: any) => {
                        if (b.type === 'media' && !inserted) {
                          elements.push(
                            <div key={`showmore-${post.id}`} style={{ marginTop: 8 }}>
                              <Button 
                                variant="primary" 
                                size="sm"
                                onClick={() => navigate(`/article/${post.id}`)}
                              >
                                Показать ещё
                              </Button>
                            </div>
                          )
                          inserted = true
                        }
                        if (b.type === 'header') {
                          elements.push(
                            <h2 key={b.id} className={postStyles.post_text_blocks}>
                              {parse(b.data.text)}
                            </h2>
                          )
                        } else if (b.type === 'paragraph') {
                          elements.push(
                            <p key={b.id} className={postStyles.post_text_blocks}>
                              {parse(b.data.text)}
                            </p>
                          )
                        } else if (b.type === 'media') {
                          elements.push(
                            <div 
                              key={b.id}
                              className={postStyles.post_images_flex}
                              data-count={b.data.item_count >= 5 ? '5+' : b.data.item_count}
                            >
                              {b.data.items?.map((item: any, index: number) => item.id && (
                                <PostMediaItem 
                                  key={item.id}
                                  item={item}
                                  index={index}
                                  dataCount={b.data.item_count}
                                />
                              ))}
                            </div>
                          )
                        }
                      })
                      if (!inserted) {
                        elements.push(
                          <div key={`showmore-${post.id}`} style={{ marginTop: 8 }}>
                            <Button 
                              variant="primary" 
                              size="sm"
                              onClick={() => navigate(`/article/${post.id}`)}
                            >
                              Показать ещё
                            </Button>
                          </div>
                        )
                      }
                      return elements
                    })()}
                  </div>

                  <div className={styles.post_actions}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`${postStyles.post_action_button} ${postStyles.like_button}`}
                      onClick={() => setExpandedComments(prev => ({
                        ...prev,
                        [post.id]: !prev[post.id]
                      }))}
                    >
                      {expandedComments[post.id] ? 'Скрыть' : 'Показать'} комментарии ({post.comment_count ?? 0})
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`${postStyles.post_action_button} ${postStyles.like_button}`}
                      onClick={async () => {
                        if (!userStore.token) return
                        try { await articleService.voteArticle(post.id, 1, userStore.token) } catch {}
                      }}
                    >
                      <IoHeartOutline className={postStyles.action_icon}/>
                      Нравится
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`${postStyles.post_action_button} ${postStyles.repost_button}`}
                      onClick={() => { /* TODO: implement repost */ }}
                    >
                      <BiRepost className={postStyles.action_icon}/>
                      Репост
                    </Button>
                  </div>

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


