import styles from './ScheduleReleaseCard.module.css';

import { Link } from 'react-router-dom';

import { unixToDate } from '../../utils/utils';
import { IRelease } from 'src/ui/sections/Release/IRelease';

const yearSeason = ['_', 'Зима', 'Весна', 'Лето', 'Осень'];

interface Props {
  release: IRelease;
}

export const ScheduleReleaseCard = ({ release }: Props) => {
  const grade = release.grade ? release.grade.toFixed(1) : null;
  // console.log(props.release);

  return (
    <Link
      to={`/release/${release.id}`}
      id="vert_card"
      className={styles.card}
      //style={{backgroundImage: `linear-gradient(rgba(36, 36, 36, 0.5) 0%,  rgba(36, 36, 36, 1)100%), url(${props.release.image})`}}
    >
      <div className={styles.release_image_border}>
        <img
          className={styles.release_image}
          src={release.image}
          alt={release.title_ru + ' image'}
          loading="lazy"
        />
      </div>

      <div className={styles.release_info}>
        <p className={styles.anime_title}>{release.title_ru}</p>

        <div className={styles.anime_subinfo}>
          <p>{Number(release.episodes_released) + 1} серия</p>
          <div className={styles.bottom_info}>
            <div className={styles.anime_subinfo_noborder} style={{ width: '100%' }}>
              {/*Жанры*/}# {release.genres}
            </div>

            <div className={styles.bottom_info}>
              {release.category && (
                <span className={styles.anime_subinfo_noborder}>
                  {/*Категория*/}
                  {release.category.name}
                </span>
              )}

              {release.status && (
                <span className={styles.anime_subinfo_noborder}>
                  {/*Статус*/}
                  {release.status.name}
                </span>
              )}

              <span className={styles.anime_subinfo_noborder}>
                {/*Сколько эпизодов*/}
                {release.episodes_released && release.episodes_released + ' из '}
                {/*Из скольки эпизодов*/}
                {
                  // props.release.status && props.release.status.id !== 3 &&
                  release.episodes_total ? release.episodes_total + ' эп' : '? эп'
                }
              </span>

              <span className={styles.anime_subinfo_noborder}>
                {/*Оценка или это анонс?*/}
                {grade ? (
                  <>&#9733; {grade}</>
                ) : release.status && release.status.id === 0 && release.aired_on_date !== 0 ? (
                  unixToDate(release.aired_on_date, 'dayMonthYear')
                ) : release.year ? (
                  <>
                    {release.season && release.season != 0 ? `${yearSeason[release.season]} ` : ''}
                    {release.year && `${release.year} г.`}
                  </>
                ) : (
                  'Скоро'
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
