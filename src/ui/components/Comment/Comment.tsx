import { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { commentService } from '../../api/CommentService'
import { sinceUnixDate, unixToDate } from '../../api/utils'
import { useUserStore } from '../../auth/store/auth'
import { PostInput } from '../PostInput/PostInput'
import styles from './Comment.module.css'

export const Comment = (props) => {

    const userStore = useUserStore();

    const [isRepliesOpen, setIsRepliesOpen] = useState(false);
    const [replies, setReplies] = useState<any[]>([]);
    const [isLoadingReplies, setIsLoadingReplies] = useState(false);

    const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [replySpoiler, setReplySpoiler] = useState(false);

    async function onToggleReplies() {
        if (!isRepliesOpen && replies.length === 0 && userStore.token) {
            try {
                setIsLoadingReplies(true);
                if (props.type === 'release') {
                    const page = await commentService.getReleaseCommentReplies(props.comment.id, 0, userStore.token);
                    setReplies(page.content || []);
                } else if (props.type === 'collection') {
                    const page = await commentService.getCollectionCommentReplies(props.comment.id, 0, userStore.token);
                    setReplies(page.content || []);
                } else if (props.type === 'article') {
                    const page = await commentService.getArticleCommentReplies(props.comment.id, 0, userStore.token);
                    setReplies(page.content || []);
                }
            } finally {
                setIsLoadingReplies(false);
            }
        }
        setIsRepliesOpen(!isRepliesOpen);
    }

    return (
        <div className={styles.comment_wrap}>
            <div className={styles.comment}>
                <div className={styles.avatar}>
                    <div className={styles.image_border}>
                        <img src={props.comment.profile.avatar} className={styles.ava_image} alt={props.comment.profile.login + "ava"} />
                    </div>
                </div>
                <div className={styles.info}>
                    <div className={styles.header_row}>
                        <p className={styles.commenter_login}>{props.comment.profile.login}</p>
                        <time className={styles.timestamp} dateTime={props.comment.timestamp.toString()} title={unixToDate(props.comment.timestamp, "full")}>
                            {sinceUnixDate(props.comment.timestamp)}
                        </time>
                    </div>
                    <div className={styles.text_block}>
                        <p className={styles.comment_messege}>{props.comment.message}</p>
                    </div>
                    <div className={styles.action_buttons}>
                        <div className={styles.reply_and_like_buttons}>
                            <button className={styles.reply_button} type="button" onClick={() => setIsReplyFormOpen(!isReplyFormOpen)}>Ответить</button>
                            <div className={styles.dislike_and_like_button}>
                                <button className={styles.like_button} type="button"><IoIosArrowDown/></button>
                                <p className={styles.likes_count}>{props.comment.likes_count}</p>
                                <button className={styles.like_button} type="button"><IoIosArrowUp/></button>
                            </div>
                        </div>
                        {isReplyFormOpen && (
                            <div className={styles.comment_add_wrap}>
                                <div className={styles.header_row}>
                                    <span className={styles.commenter_login}>Ответ для @{props.comment.profile.login}</span>
                                </div>
                                <PostInput
                                    avatarUrl={userStore.user?.avatar || props.comment.profile.avatar}
                                    placeholder="Написать ответ..."
                                    
                                    onPostSubmit={async (text) => {
                                        setReplyText(text);
                                            if (!userStore.token) return;
                                            const message = text.trim();
                                            if (!message) return;
                                            const parentId = props.comment.id;
                                            const request = { parentCommentId: parentId, replyToProfileId: props.comment.profile.id, message, spoiler: replySpoiler } as any;
                                            try {
                                                if (props.type === 'release') {
                                                    const releaseId = props.comment.release?.id;
                                                    await commentService.addReleaseComment(releaseId, request, userStore.token);
                                                } else if (props.type === 'collection') {
                                                    const collectionId = props.comment.collection?.id;
                                                    await commentService.addCollectionComment(collectionId, request, userStore.token);
                                                } else if (props.type === 'article') {
                                                    const articleId = props.comment.article?.id;
                                                    await commentService.addArticleComment(articleId, request, userStore.token);
                                                }
                                                setReplyText('');
                                                setReplySpoiler(false);
                                                setIsReplyFormOpen(false);
                                                // Refresh replies
                                                if (!isRepliesOpen) setIsRepliesOpen(true);
                                                // fetch first page again
                                                try {
                                                    setIsLoadingReplies(true);
                                                    if (props.type === 'release') {
                                                        const page = await commentService.getReleaseCommentReplies(parentId, 0, userStore.token);
                                                        setReplies(page.content || []);
                                                    } else if (props.type === 'collection') {
                                                        const page = await commentService.getCollectionCommentReplies(parentId, 0, userStore.token);
                                                        setReplies(page.content || []);
                                                    } else if (props.type === 'article') {
                                                        const page = await commentService.getArticleCommentReplies(parentId, 0, userStore.token);
                                                        setReplies(page.content || []);
                                                    }
                                                } finally {
                                                    setIsLoadingReplies(false);
                                                }
                                            } catch (e) {
                                                // noop
                                            }
                                    }}
                                />
                                <label className={styles.comment_spoiler_under}>
                                    <input
                                        type="checkbox"
                                        checked={replySpoiler}
                                        onChange={(e) => setReplySpoiler(e.target.checked)}
                                    />
                                    Спойлер
                                </label>
                                <div className={styles.comment_actions}>
                                    <button
                                        className={styles.info_button}
                                        type='button'
                                        onClick={() => { setIsReplyFormOpen(false); setReplyText(''); setReplySpoiler(false); }}
                                    >
                                        Отмена
                                    </button>
                                </div>
                            </div>
                        )}
                        { props.comment.reply_count > 0 && (
                            <button className={styles.show_all_replys} type="button" onClick={onToggleReplies}>
                                {/* <LuReplyAll className={styles.show_all_replys_ico}/> */}
                                <p>
                                    {isRepliesOpen ? 'Скрыть ответы' : `Показать ${props.comment.reply_count} ответов`}
                                </p>
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {isRepliesOpen && (
                <div className={styles.replies_wrap}>
                    {isLoadingReplies ? (
                        <div className="loader-container"><i className="loader-circle" /></div>
                    ) : (
                        replies.map((reply) => (
                            <Comment key={reply.id} type={props.type} comment={reply} />
                        ))
                    )}
                </div>
            )}
        </div>
    )
}