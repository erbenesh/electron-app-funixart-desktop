import styles from './Profile.module.css';

import { MdAddLink } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getProfile } from '../../auth/authApi';
import { CircleChart } from './components/CircleChart';
import { unixToDate, minutesToTime } from '../../utils/utils';

export const Profile: React.FC = () => {
  const location = useLocation();

  const {
    data: profile,
    isPending,
    status,
    error,
  } = useQuery({
    queryKey: ['profile', location.pathname.slice(9)],
    queryFn: () => getProfile(location.pathname.slice(9)),
    // enabled: token ? true : false,
  });

  if (isPending) {
    return (
      <div className="loader-container">
        <i className="loader-circle" />
      </div>
    );
  }

  if (status === 'error') {
    console.log(error.message);
  }

  return (
    <div className={styles.profile_page_wrap}>
      <div className={styles.profile_page}>
        <div className={styles.profile_header}>
          <div className={styles.avatar_bg_image_wrap}>
            <img className={styles.avatar_bg_image} src={profile.profile.avatar} alt="avatar" />
          </div>
          <div className={styles.avatar_wrap}>
            <div className={styles.avatar_image_wrap}>
              <img className={styles.avatar_image} src={profile.profile.avatar} alt="avatar" />
            </div>
            <div className={styles.avatar_text_block}>
              <div className={styles.top_text}>
                <div className={styles.profile_name_and_rating}>
                  <p className={styles.login}>{profile.profile.login}</p>
                  <p className={styles.rating_score}>{profile.profile.rating_score}</p>
                </div>

                <p className={styles.status}>{profile.profile.status}</p>

                <div className={styles.is_online}>
                  <p>
                    {profile.profile.is_online
                      ? 'онлайн'
                      : 'был онлайн ' + unixToDate(profile.profile.last_activity_time, 'full')}
                  </p>
                  <p>{'зарегистрирован(а) ' + unixToDate(profile.profile.register_date, 'full')}</p>
                </div>
              </div>

              <div className={styles.profile_activity_stats}>
                <div className={styles.activity_state}>
                  <p className={styles.state_count}>{profile.profile.comment_count}</p>
                  <p>{' коммента'}</p>
                </div>
                <div className={styles.activity_state}>
                  <p className={styles.state_count}>{profile.profile.video_count}</p>
                  <p>{' видео'}</p>
                </div>
                <div className={styles.activity_state}>
                  <p className={styles.state_count}>{profile.profile.collection_count}</p>
                  <p>{' коллекций'}</p>
                </div>
                <div className={styles.activity_state}>
                  <p className={styles.state_count}>{profile.profile.friend_count}</p>
                  <p>{' друга'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {profile.is_my_profile && (
          <div className={styles.header_buttons}>
            <div className={styles.buttons_wrap}>
              <button className={styles.profile_edit_button}>Редактировать</button>
              <button className={styles.profile_edit_button}>VK</button>
              <button className={styles.profile_edit_button}>Telegram</button>
              <button className={styles.profile_edit_button}>Discord</button>
              <button className={styles.profile_edit_button}>Instagram</button>
              <button className={styles.profile_edit_button}>TikTok</button>
              <button className={styles.profile_edit_button}>
                <MdAddLink className={styles.add_link_ico} />
              </button>
            </div>
          </div>
        )}

        <div className={styles.profile_analytics}>
          <div className={styles.analytics_wrap}>
            <h2 className={styles.analytics_title}>Статистика</h2>

            <div className={styles.analytics}>
              <div className={styles.analytics_stats}>
                <ul className={styles.total_stats_lists}>
                  <li className={styles.total_state_w}>
                    Смотрю{' '}
                    <span className={styles.total_state_value}>
                      {profile.profile.watching_count}
                    </span>
                  </li>
                  <li className={styles.total_state_p}>
                    В планах{' '}
                    <span className={styles.total_state_value}>{profile.profile.plan_count}</span>
                  </li>
                  <li className={styles.total_state_v}>
                    Просмотрено{' '}
                    <span className={styles.total_state_value}>
                      {profile.profile.completed_count}
                    </span>
                  </li>
                  <li className={styles.total_state_h}>
                    Отложено{' '}
                    <span className={styles.total_state_value}>
                      {profile.profile.hold_on_count}
                    </span>
                  </li>
                  <li className={styles.total_state_d}>
                    Брошено{' '}
                    <span className={styles.total_state_value}>
                      {profile.profile.dropped_count}
                    </span>
                  </li>
                </ul>
              </div>
              <div className={styles.analytics_stats}>
                <CircleChart
                  size={250}
                  strokeWidth={25}
                  gapSize={1.5}
                  showLabels
                  segments={[
                    {
                      color: 'rgb(26, 212, 85)',
                      value: profile.profile.watching_count,
                      label: 'Watching',
                    },
                    {
                      color: 'rgb(140, 119, 197)',
                      value: profile.profile.plan_count,
                      label: 'Planned',
                    },
                    {
                      color: 'rgb(91, 93, 207)',
                      value: profile.profile.completed_count,
                      label: 'Completed',
                    },
                    {
                      color: 'rgb(233, 196, 47)',
                      value: profile.profile.hold_on_count,
                      label: 'On Hold',
                    },
                    {
                      color: 'rgb(231, 115, 80)',
                      value: profile.profile.dropped_count,
                      label: 'Dropped',
                    },
                  ]}
                />
              </div>
            </div>

            <div className={styles.total_stats_viewed}>
              <p className={styles.state_viewed}>
                Просмотрено серий:{' '}
                <span className={styles.total_state_value}>
                  {profile.profile.watched_episode_count}
                </span>
              </p>
              <p className={styles.state_viewed}>
                Время просомтра:{' '}
                <span className={styles.total_state_value}>
                  {minutesToTime(profile.profile.watched_time)}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className={styles.profile_releases_votes}>
          <div className={styles.votes_wrap}>
            <div className={styles.votes_wrap_top}>
              <h2 className={styles.analytics_title}>Оценки релизов</h2>
              <button className={styles.profile_edit_button} type="button">
                Показать все
              </button>
            </div>

            <div className={styles.voted_releases_5_len}>
              <ul className={styles.voted_releases_list}>
                {profile.profile.votes?.map(
                  (voted_release) =>
                    voted_release.id && (
                      <li className={styles.voted_release} key={voted_release.id}>
                        <div className={styles.voted_release_image_wrap}>
                          <img
                            className={styles.voted_release_image}
                            src={voted_release.image}
                            alt={`${voted_release.name} image`}
                          />
                        </div>

                        <div className={styles.voted_release_info}>
                          <p className={styles.voted_release_title}>{voted_release.title_ru}</p>
                          <p className={styles.voted_release_vote_rate}>***** • Дата</p>
                        </div>
                      </li>
                    )
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.profile_viewing_dynamics} />

        <div className={styles.profile_viewing_dynamics} />

        <div className={styles.profile_last_viewed} />
      </div>
    </div>
  );
};
