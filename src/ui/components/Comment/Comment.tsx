import styles from './Comment.module.css';

import { LuReplyAll } from 'react-icons/lu';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

import { unixToDate, sinceUnixDate } from '../../utils/utils';
import { IComment } from 'src/ui/sections/Release/IRelease';

interface Props {
  comment: IComment;
}

export const Comment = ({ comment }: Props) => (
  <div className={styles.comment_wrap}>
    <div className={styles.comment}>
      <div className={styles.avatar}>
        <div className={styles.image_border}>
          <img
            src={comment.profile.avatar}
            className={styles.ava_image}
            alt={comment.profile.login + 'ava'}
          />
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.text_block}>
          <div className={styles.login_and_time}>
            <p className={styles.commenter_login}>{comment.profile.login}</p>
            <time
              className={styles.timestamp}
              dateTime={comment.timestamp.toString()}
              title={unixToDate(comment.timestamp, 'full').toString()}
            >
              {sinceUnixDate(comment.timestamp)}
            </time>
          </div>
          <p className={styles.comment_messege}>{comment.message}</p>
        </div>
        <div className={styles.action_buttons}>
          <div className={styles.reply_and_like_buttons}>
            <button className={styles.reply_button} type="button">
              Ответить
            </button>
            <div className={styles.dislike_and_like_button}>
              <button className={styles.like_button} type="button">
                <IoIosArrowDown />
              </button>
              <p className={styles.likes_count}>{comment.likes_count}</p>
              <button className={styles.like_button} type="button">
                <IoIosArrowUp />
              </button>
            </div>
          </div>
          {comment.reply_count > 0 && (
            <button className={styles.show_all_replys} type="button">
              <LuReplyAll className={styles.show_all_replys_ico} />
              <p>Показать {comment.reply_count} ответов</p>
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);
