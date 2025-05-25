import styles from './PopularCommentCard.module.css';

import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import { LuReplyAll } from 'react-icons/lu';
import { IoIosArrowForward } from 'react-icons/io';

import { unixToDate } from '../../../../../../utils/utils';
import { IComment } from 'src/ui/sections/Release/IRelease';

interface Props {
  comment: IComment;
  array: any[];
}

export const PopularCommentCard = ({ comment, array }: Props) => {
  const commentRelease = comment.release;
  const commentProfile = comment.profile;

  return (
    <Link
      to={`/release/${commentRelease.id ? commentRelease.id : array.find((comment) => commentRelease === comment.release['@id']).release.id}`}
      className={styles.comment_wrap}
    >
      <div className={styles.comment}>
        <div className={styles.avatar}>
          <div className={styles.image_border}>
            <img
              src={commentProfile.avatar}
              className={styles.ava_image}
              alt={commentProfile.login + 'ava'}
            />
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.text_block}>
            <div className={styles.login_and_time}>
              <p className={styles.commenter_login}>{commentProfile.login}</p>

              <span className={styles.timestamp}>к релизу</span>
              <p className={styles.timestamp}>
                {commentRelease.title_ru
                  ? commentRelease.title_ru
                  : array.find((comment) => commentRelease === comment.release['@id']).release
                      .title_ru}
              </p>
              <IoIosArrowForward style={{ color: 'grey', height: '0.9rem' }} />
            </div>
            <p className={styles.comment_messege}>{parse(comment.message)}</p>
          </div>
          <div className={styles.action_buttons}>
            <div className={styles.reply_and_like_buttons}>
              <div className={styles.dislike_and_like_button}>
                <time
                  className={styles.timestamp}
                  dateTime={comment.timestamp.toString()}
                  title={String(unixToDate(comment.timestamp, 'full'))}
                >
                  {unixToDate(comment.timestamp, 'full').toString().slice(0, 7)} в{' '}
                  {unixToDate(comment.timestamp, 'full').toString().slice(14)}
                </time>

                <p className={styles.likes_count}>{comment.likes_count}</p>
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
    </Link>
  );
};
