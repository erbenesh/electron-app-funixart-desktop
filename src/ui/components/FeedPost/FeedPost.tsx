import parse from 'html-react-parser';
import { useState } from 'react';
import { BiRepost } from 'react-icons/bi';
import { IoArrowDownOutline, IoArrowUpOutline, IoChatbubbleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { articleService } from '../../api/ArticleService';
import { commentService } from '../../api/CommentService';
import { formatPostTimestamp } from '../../api/utils';
import { Article } from '../../types/entities';
import { PostInput } from '../PostInput/PostInput';
import { PostMediaItem } from '../PostMediaItem/PostMediaItem';
import styles from './FeedPost.module.css';

interface FeedPostProps {
    post: Article;
    token?: string;
    userAvatar?: string;
    onVote?: () => void;
    onImageClick?: (url: string, allImages: string[], clickedIndex: number) => void;
    onCommentClick?: () => void;
}

export const FeedPost = ({ post, token, userAvatar, onVote, onImageClick, onCommentClick }: FeedPostProps) => {
    const navigate = useNavigate();

    const handleVote = async (voteValue: number) => {
        if (!token) return;
        try {
            await articleService.voteArticle(post.id, voteValue, token);
            onVote?.();
        } catch (error) {
            console.error('Vote error:', error);
        }
    };

    return (
        <div className={styles.news_post}>
            <div className={styles.post_channel}>
                <div 
                    className={styles.channel}
                    onClick={() => navigate(`/channel/${post.channel?.id}`)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            navigate(`/channel/${post.channel?.id}`);
                        }
                    }}
                >
                    <div className={styles.channel_avatar}>
                        <img 
                            className={styles.channel_avatar_image} 
                            src={post.channel.avatar} 
                            alt={post.channel.title || 'Канал'} 
                        />
                    </div>
                    <p className={styles.channel_title}>
                        {post.channel.title}
                    </p>   
                </div>                    

                <span className={styles.post_timing}>
                    {formatPostTimestamp(post.last_update_date)}
                </span>
            </div>

            <div className={styles.post_blocks}>
                {post.payload.blocks?.map((block) => {
                    if (!block.id) return null;
                    
                    return (
                        block.type === "header" ? 
                            <h2 key={block.id} className={`${styles.post_text_blocks} ${styles.post_header}`}>
                                {parse(block.data.text)}
                            </h2>
                        : block.type === "paragraph" ? 
                            <p 
                                key={block.id} 
                                className={`${styles.post_text_blocks} ${styles.post_paragraph}`}
                            >
                                {parse(block.data.text)}
                            </p>
                        : block.type === "quote" ? 
                            <blockquote 
                                key={block.id} 
                                className={`${styles.post_text_blocks} ${styles.post_quote}`}
                            >
                                {parse(block.data.text)}
                            </blockquote>
                        : block.type === "media" ?
                            <div 
                                key={block.id} 
                                className={styles.post_images_flex} 
                                data-count={block.data.item_count >= 5 ? "5+" : block.data.item_count}
                            >
                                { 
                                    block.data.items?.map((item: any, index: number) => item.id && 
                                    <PostMediaItem 
                                        key={item.id} 
                                        item={item} 
                                        index={index} 
                                        dataCount={block.data.item_count}
                                        onImageClick={(url: string) => {
                                            if (onImageClick) {
                                                // Collect all image URLs from this block
                                                const allImages = block.data.items
                                                    ?.filter((i: any) => i?.id)
                                                    .map((i: any) => i.url) || [];
                                                const clickedIndex = allImages.indexOf(url);
                                                
                                                onImageClick(url, allImages, clickedIndex >= 0 ? clickedIndex : 0);
                                            }
                                        }}
                                    />)
                                }
                            </div>
                        : null
                    );
                })}
                
                {/* Show "Показать ещё" button to navigate to post page */}
                {post.payload.blocks && post.payload.blocks.length > 1 && (
                    <button 
                        className={styles.show_more_button}
                        onClick={() => navigate(`/article/${post.id}`)}
                        type="button"
                    >
                        Показать ещё
                    </button>
                )}
            </div>

            <div className={styles.post_action_buttons}>
                {/* Comments */}
                <div 
                    className={styles.post_action_item}
                    onClick={onCommentClick}
                >
                    <IoChatbubbleOutline className={styles.action_icon}/>
                    <span className={styles.action_count}>{post.comment_count || 0}</span>
                </div>

                {/* Reposts */}
                <div className={styles.post_action_item}>
                    <BiRepost className={styles.action_icon}/>
                    <span className={styles.action_count}>{post.repost_count || 0}</span>
                </div>

                {/* Voting section */}
                <div className={styles.post_vote_section}>
                    <button 
                        className={`${styles.vote_button} ${styles.vote_button_down} ${post.vote === 1 ? styles.voted : ''}`}
                        onClick={() => handleVote(post.vote === 1 ? 0 : 1)}
                        type='button'
                        aria-label="Downvote"
                    >
                        <IoArrowDownOutline className={styles.vote_icon}/>
                    </button>
                    
                    <span className={`${styles.vote_count} ${
                        post.vote_count > 0 ? styles.vote_count_positive : 
                        post.vote_count < 0 ? styles.vote_count_negative : ''
                    }`}>
                        {post.vote_count || 0}
                    </span>
                    
                    <button 
                        className={`${styles.vote_button} ${styles.vote_button_up} ${post.vote === 2 ? styles.voted : ''}`}
                        onClick={() => handleVote(post.vote === 2 ? 0 : 2)}
                        type='button'
                        aria-label="Upvote"
                    >
                        <IoArrowUpOutline className={styles.vote_icon}/>
                    </button>
                </div>
            </div>

            <div className={styles.post_comment_add}>
                <PostInput
                    avatarUrl={userAvatar || ''}
                    placeholder={'Написать комментарий...'}
                    onPostSubmit={async (text) => {
                        if (!token) return;
                        const message = text.trim();
                        if (!message) return;
                        try { 
                            await commentService.addArticleComment(post.id, { message, spoiler: false }, token);
                        } catch (error) {
                            console.error('Comment error:', error);
                        }
                    }}
                />
            </div>
        </div>
    );
};

