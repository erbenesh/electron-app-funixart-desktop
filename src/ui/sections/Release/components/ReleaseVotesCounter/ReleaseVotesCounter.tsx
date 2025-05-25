import styles from './ReleaseVotesCounter.module.css';

import { numberDeclension } from '../../../../utils/utils';
import { IRelease } from '../../IRelease';

interface Props {
  release: IRelease;
}

export const ReleaseVotesCounter = ({ release }: Props) => (
  <div className={styles.rate}>
    <div className={styles.rating_panels}>
      <div className={styles.big_rate_number}>
        <p className={styles.grade_number}>{String(release.grade).slice(0, 3)}</p>
        <p className={styles.votes_count}>
          {release.vote_count} {numberDeclension(release.vote_count, 'голос', 'голоса', 'голосов')}
        </p>
      </div>
      <ul className={styles.rate_lines}>
        <li className={styles.vote_list_line}>
          5{' '}
          <div
            className={styles.vote_line}
            style={{
              background: `linear-gradient(90deg, rgb(230, 230, 230) 0 ${(release.vote_5_count / release.vote_count) * 100}%, grey 0)`,
            }}
          />
        </li>
        <li className={styles.vote_list_line}>
          4{' '}
          <div
            className={styles.vote_line}
            style={{
              background: `linear-gradient(90deg, rgb(230, 230, 230) 0 ${(release.vote_4_count / release.vote_count) * 100}%, grey 0)`,
            }}
          />
        </li>
        <li className={styles.vote_list_line}>
          3{' '}
          <div
            className={styles.vote_line}
            style={{
              background: `linear-gradient(90deg, rgb(230, 230, 230) 0 ${(release.vote_3_count / release.vote_count) * 100}%, grey 0)`,
            }}
          />
        </li>
        <li className={styles.vote_list_line}>
          2{' '}
          <div
            className={styles.vote_line}
            style={{
              background: `linear-gradient(90deg, rgb(230, 230, 230) 0 ${(release.vote_2_count / release.vote_count) * 100}%, grey 0)`,
            }}
          />
        </li>
        <li className={styles.vote_list_line}>
          1{' '}
          <div
            className={styles.vote_line}
            style={{
              background: `linear-gradient(90deg, rgb(230, 230, 230) 0 ${(release.vote_1_count / release.vote_count) * 100}%, grey 0)`,
            }}
          />
        </li>
      </ul>
    </div>
    <div className={styles.my_vote_stars} />
  </div>
);
