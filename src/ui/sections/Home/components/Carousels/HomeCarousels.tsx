import styles from './HomeCarousels.module.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import { ReleaseCard } from '../../../../components/ReleaseCard/ReleaseCard';
import { InterestingCard } from '../../../../components/InterestingCard/InterestingCard';

export const HomeCarouselx5 = (props) => {
  const [indx, setIndxLast] = useState(0);

  const maxLen =
    props.array.length % 5 === 0
      ? Math.floor(props.array.length / 5) * 5 - 5
      : Math.floor(props.array.length / 5) * 5;

  const goToSlide = (index: number) => {
    const carouselMaxLen: number = maxLen;

    if (index < 0) {
      index = 0;
    } else if (index > carouselMaxLen) {
      index = carouselMaxLen;
    }

    setIndxLast(index);

    //console.log(Math.floor(props.array.length / 5) * 5, "/", indx);

    document.getElementById(`inner-${props.sectionTitleAlt}`)!.style.transform =
      `translateX(-${index * 20}rem)`;
  };

  const goToNextSlide = () => {
    const newIndex: number = indx + 5;

    goToSlide(newIndex);
  };

  const goToPrevSlide = () => {
    const newIndex: number = indx - 5;

    goToSlide(newIndex);
  };

  return (
    <div className={styles.section}>
      {props.sectionTitleAlt !== 'monday' &&
      props.sectionTitleAlt !== 'discussingReleases' &&
      props.sectionTitleAlt !== 'watchingReleases' ? (
        <Link to={`${props.link}`} className={styles.section_title_link}>
          {props.sectionTitle} <IoIosArrowForward className={styles.title_arrow_ico} />
        </Link>
      ) : (
        <Link to={`${props.link}`} className={styles.shcedule_title}>
          <div className={styles.title_row_wrap}>
            <h2 className={styles.section_title_link_sh}>{props.sectionTitle}</h2>
            <p className={styles.sh_day_title}>
              {props.sectionTitleAlt !== 'watchingReleases' ? 'Сегодня' : 'Cейчас'}
            </p>
          </div>
          <IoIosArrowForward className={styles.title_arrow_ico} />
        </Link>
      )}

      <div className={styles.last_releases}>
        <div className="carousel">
          <div id={`inner-${props.sectionTitleAlt}`} className="carousel-inner">
            {props.array?.map((el) =>
              el.id && props.sectionTitleAlt === 'interestingReleases' ? (
                <InterestingCard key={el.id} release={el} />
              ) : (
                <ReleaseCard key={el.id} release={el} />
              )
            )}
          </div>
        </div>
        <div className={styles.carousel_buttons}>
          <button
            className={styles.carousel_button}
            style={indx <= 0 ? { opacity: 0, pointerEvents: 'none' } : {}}
            onClick={() => goToPrevSlide()}
          >
            <IoIosArrowBack className={styles.arrow_ico} />
          </button>

          <button
            className={styles.carousel_button}
            style={indx >= maxLen ? { opacity: 0, pointerEvents: 'none' } : {}}
            onClick={() => goToNextSlide()}
          >
            <IoIosArrowForward className={styles.arrow_ico} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const HomeCarouselx2 = (props) => {
  const [indx, setIndxLast] = useState(0);

  const maxLen =
    props.array.length % 2 === 0
      ? Math.floor(props.array.length / 2) * 2 - 2
      : Math.floor(props.array.length / 2) * 2;

  const goToSlide = (index: number) => {
    const carouselMaxLen: number = maxLen;

    if (index < 0) {
      index = 0;
    } else if (index > carouselMaxLen) {
      index = carouselMaxLen;
    }

    setIndxLast(index);

    console.log(Math.floor(props.array.length / 2) * 2, '/', indx);

    document.getElementById(`inner-${props.sectionTitleAlt}`)!.style.transform =
      `translateX(-${index * 55}rem)`;
  };

  const goToNextSlide = () => {
    const newIndex: number = indx + 2;

    goToSlide(newIndex);
  };

  const goToPrevSlide = () => {
    const newIndex: number = indx - 2;

    goToSlide(newIndex);
  };

  return (
    <div className={styles.section}>
      {/* { props.sectionTitleAlt !== "monday" && props.sectionTitleAlt !== "discussingReleases" && props.sectionTitleAlt !== "watchingReleases" ?
            <Link to={"/schedule"} className={styles.section_title_link}>{props.sectionTitle}</Link>
            :
            <Link to={"/schedule"} className={styles.shcedule_title}><h2 className={styles.section_title_link_sh}>{props.sectionTitle}</h2><p className={styles.sh_day_title}>{props.sectionTitleAlt !== "watchingReleases" ? "Сегодня" : "Cейчас"}</p></Link>
            } */}

      <div className={styles.last_releases}>
        <div className="carousel">
          <div id={`inner-${props.sectionTitleAlt}`} className="carousel-inner">
            {props.array?.map((el) =>
              el.id && props.sectionTitleAlt === 'interestingReleases' ? (
                <InterestingCard key={el.id} release={el} />
              ) : (
                <ReleaseCard key={el.id} release={el} />
              )
            )}
          </div>
        </div>
        <div className={styles.carousel_buttons}>
          <button
            className={styles.carousel_button}
            style={indx <= 0 ? { opacity: 0, pointerEvents: 'none' } : {}}
            onClick={() => goToPrevSlide()}
          >
            <IoIosArrowBack className={styles.arrow_ico} />
          </button>

          <button
            className={styles.carousel_button}
            style={indx >= maxLen ? { opacity: 0, pointerEvents: 'none' } : {}}
            onClick={() => goToNextSlide()}
          >
            <IoIosArrowForward className={styles.arrow_ico} />
          </button>
        </div>
      </div>
    </div>
  );
};
