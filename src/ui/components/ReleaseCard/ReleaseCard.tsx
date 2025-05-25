import styles from './ReleaseCard.module.css';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FastAverageColor } from 'fast-average-color';

import { unixToDate } from '../../utils/utils';
import { IRelease } from 'src/ui/sections/Release/IRelease';

const profile_lists = {
  // 0: "Не смотрю",
  1: { name: 'Смотрю', bg_color: 'rgba(26, 212, 85, 0.5)' },
  2: { name: 'В планах', bg_color: 'rgba(140, 119, 197, 0.5)' },
  3: { name: 'Просмотрено', bg_color: 'rgba(91, 93, 207, 0.5)' },
  4: { name: 'Отложено', bg_color: 'rgba(233, 196, 47, 0.5)' },
  5: { name: 'Брошено', bg_color: 'rgba(231, 115, 80, 0.5)' },
};

const yearSeason = ['_', 'Зима', 'Весна', 'Лето', 'Осень'];

interface Props {
  release: IRelease;
  clickCallBack?: (arg: string) => void;
}

export const ReleaseCard = ({ release, clickCallBack }: Props) => {
  const grade = release.grade ? release.grade.toFixed(1) : null;

  const profile_list_status = release.profile_list_status;

  let user_list = null;

  if (profile_list_status != null || profile_list_status != 0) {
    user_list = profile_lists[profile_list_status as keyof typeof profile_lists];
  }

  const [dominantColor, setDominantColor] = useState('rgba(36, 36, 36, 1)');

  useEffect(() => {
    if (release.image) {
      if (dominantColor === 'rgba(36, 36, 36, 1)') {
        const fac = new FastAverageColor();
        // const img = new Image();

        // img.onload = function () {
        //   const color = fac.getColor(img);
        //   console.log(color);
        // };
        // img.onerror = function () {
        //   console.error('Image failed to load');
        // };
        // img.src = release.image;

        fac
          .getColorAsync(release.image)
          .then((color) => {
            setDominantColor(
              `rgba(${color.value[0] - 80}, ${color.value[1] - 80}, ${color.value[2] - 80}, 1)`
            );
            // console.log(color);
          })
          .catch(console.error);
      }
    }
  }, [release.image]);

  return (
    <div id="vert_card" className={styles.vert_card}>
      <Link
        to={`/release/${release.id}`}
        onClick={() => clickCallBack && clickCallBack('')}
        className={styles.release_image_border}
      >
        <img
          className={styles.release_image}
          src={release.image}
          alt={release.title_ru + ' image'}
          loading="lazy"
        />
      </Link>

      <div
        className={styles.description_and_action_buttons}
        style={{
          background: `linear-gradient(${dominantColor.replace('1)', '0)')} 0%, ${dominantColor.replace('1)', '0.8)')} 30%, ${dominantColor.replace('1)', '1)')} 60%)`,
        }}
      >
        <div className={styles.release_info}>
          <div className={styles.anime_title}>{release.title_ru}</div>

          <div className={styles.anime_subinfo_noborder}>
            {/*Жанры*/}# {release.genres}
          </div>

          <div className={styles.bottom_info}>
            {release.category && (
              <>
                <span className={styles.anime_subinfo}>
                  {/*Категория*/}
                  {release.category.name}
                </span>
                •
              </>
            )}
            {release.status && (
              <>
                <span className={styles.anime_subinfo}>
                  {/*Статус*/}
                  {release.status.name}
                </span>
                •
              </>
            )}
            <span className={styles.anime_subinfo}>
              {/*Сколько эпизодов*/}
              {release.episodes_released && release.episodes_released + ' из '}
              {/*Из скольки эпизодов*/}
              {
                // props.release.status && props.release.status.id !== 3 &&
                release.episodes_total ? release.episodes_total + ' эп' : '? эп'
              }
            </span>
            •
            <span className={styles.anime_subinfo}>
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
            {/* <div className={styles.bookmark}>
                            {
                            props.release.is_favorite? 
                            <IoBookmark style={{color:"rgb(189, 78, 44)", width: '1.2rem', height: '1.2rem'}}/> 
                            : <IoBookmarkOutline style={{color:"rgb(160, 160, 160)", width: '1.2rem', height: '1.2rem'}}/>
                            }
                        </div> */}
          </div>

          <div className={styles.release_lists_info}>
            {user_list && (
              <span className={styles.user_list_name} style={{ background: user_list.bg_color }}>
                {user_list.name}
              </span>
            )}
          </div>
        </div>

        {/* <p className={styles.description}>{ props.release.description }</p> */}

        {/* <button className={props.release.is_favorite ? styles.card_action_button_active :  styles.card_action_button} onClick={() => addToFavorite()} type='button'>
                    {props.release.is_favorite ? <IoBookmark className={styles.card_action_button_ico_active} /> : <IoBookmarkOutline className={styles.card_action_button_ico}/>}
                </button> */}
      </div>
    </div>
  );
};

{
  /* <div className="glowing-elements">
<div className="glow-1"></div>
<div className="glow-2"></div>
<div className="glow-3"></div>
</div>
<div className="card-particles">
<span></span><span></span><span></span> <span></span><span>
  </span><span></span>
</div> */
}

{
  /* <div data-position="top" className="carousel">
<span className="carousel__text">• card component • card component • card component • card component •
  card component • card component</span>
</div>

<div data-direction="right" data-position="bottom" className="carousel">
<span className="carousel__text">• card component • card component • card component • card component •
  card component • card component</span>
</div> */
}
