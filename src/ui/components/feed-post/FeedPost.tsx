import styles from './FeedPost.module.css';

import parse from 'html-react-parser';

import { formatPostTimestamp } from '../../utils/utils';
import { PostMediaItem } from '../../sections/Feed/components/PostMediaItem/PostMediaItem';
import { Key } from 'react';

export interface IPost {
  id: Key | null | undefined;
  channel: {
    avatar: string | undefined;
    title: string;
  };
  last_update_date: number;
  payload: { blocks: any[] };
}

interface Props {
  post: IPost;
}

export const FeedPost = ({ post }: Props) => (
  <div key={post.id} className={styles.news_post}>
    <div className={styles.post_channel}>
      <div className={styles.channel}>
        <div className={styles.channel_avatar}>
          <img className={styles.channel_avatar_image} src={post.channel.avatar} alt="" />
        </div>

        <p className={styles.channel_title}>{post.channel.title}</p>
      </div>

      <span className={styles.post_timing}>{formatPostTimestamp(post.last_update_date)}</span>
    </div>

    <div className={styles.post_blocks}>
      {post.payload.blocks?.map(
        (block: {
          id: Key | null | undefined;
          type: string;
          data: { text: string; item_count: number; items: { id: number }[] };
        }) =>
          block.id && block.type === 'header' ? (
            <h2 key={block.id} className={styles.post_text_blocks}>
              {parse(block.data.text)}
            </h2>
          ) : block.type === 'paragraph' ? (
            <p key={block.id} className={styles.post_text_blocks}>
              {parse(block.data.text)}
            </p>
          ) : (
            block.type === 'media' && (
              <div
                key={block.id}
                className={styles.post_images_flex}
                data-count={block.data.item_count >= 5 ? '5+' : block.data.item_count}
              >
                {block.data.items?.map(
                  (item: { id: number }, index: number) =>
                    item.id && (
                      <PostMediaItem
                        key={item.id}
                        item={item}
                        index={index}
                        dataCount={block.data.item_count}
                      />
                    )
                )}
              </div>
            )
          )
      )}
    </div>

    <div className={styles.post_action_buttons} />
  </div>
);
