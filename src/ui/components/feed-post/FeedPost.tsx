import styles from './FeedPost.module.css';

import parse from 'html-react-parser';

import { formatPostTimestamp } from '../../utils/utils';
import { PostMediaItem } from '../../sections/Feed/components/PostMediaItem/PostMediaItem';

export const FeedPost = (props) => (
    <div key={props.post.id} className={styles.news_post}>
      <div className={styles.post_channel}>
        <div className={styles.channel}>
          <div className={styles.channel_avatar}>
            <img className={styles.channel_avatar_image} src={props.post.channel.avatar} alt="" />
          </div>

          <p className={styles.channel_title}>{props.post.channel.title}</p>
        </div>

        <span className={styles.post_timing}>
          {formatPostTimestamp(props.post.last_update_date)}
        </span>
      </div>

      <div className={styles.post_blocks}>
        {props.post.payload.blocks?.map((block) =>
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
                  (item, index) =>
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
