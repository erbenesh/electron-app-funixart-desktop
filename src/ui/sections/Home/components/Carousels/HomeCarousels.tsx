import styles from './HomeCarousels.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { ReleaseCard } from '../../../../components/ReleaseCard/ReleaseCard';
import { InterestingCard } from '../../../../components/InterestingCard/InterestingCard';

interface HomeCarouselProps {
  array: any[];
  itemsPerSlide: number;
  sectionTitle: string;
  sectionTitleAlt: string;
  link?: string;
  translateAmount: number; // rem units for transform
}

export const HomeCarousel = ({
  array,
  itemsPerSlide,
  sectionTitle,
  sectionTitleAlt,
  link,
  translateAmount,
}: HomeCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex =
    array.length % itemsPerSlide === 0
      ? Math.floor(array.length / itemsPerSlide) * itemsPerSlide - itemsPerSlide
      : Math.floor(array.length / itemsPerSlide) * itemsPerSlide;

  const goToSlide = (index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(clampedIndex);

    document.getElementById(`inner-${sectionTitleAlt}`)!.style.transform =
      `translateX(-${clampedIndex * translateAmount}rem)`;
  };

  const goToNextSlide = () => goToSlide(currentIndex + itemsPerSlide);
  const goToPrevSlide = () => goToSlide(currentIndex - itemsPerSlide);

  const isSpecialSection = ['monday', 'discussingReleases', 'watchingReleases'].includes(
    sectionTitleAlt
  );
  const isWatchingReleases = sectionTitleAlt === 'watchingReleases';

  return (
    <div className={styles.section}>
      {link && (
        <>
          {!isSpecialSection ? (
            <Link to={link ?? ''} className={styles.section_title_link}>
              {sectionTitle} <IoIosArrowForward className={styles.title_arrow_ico} />
            </Link>
          ) : (
            <Link to={link ?? ''} className={styles.shcedule_title}>
              <div className={styles.title_row_wrap}>
                <h2 className={styles.section_title_link_sh}>{sectionTitle}</h2>
                <p className={styles.sh_day_title}>{isWatchingReleases ? 'Cейчас' : 'Сегодня'}</p>
              </div>
              <IoIosArrowForward className={styles.title_arrow_ico} />
            </Link>
          )}
        </>
      )}

      <div className={styles.last_releases}>
        <div className="carousel">
          <div id={`inner-${sectionTitleAlt}`} className="carousel-inner">
            {array?.map((el) =>
              el.id && sectionTitleAlt === 'interestingReleases' ? (
                <InterestingCard key={el.id} release={el} />
              ) : (
                <ReleaseCard key={el.id} release={el} />
              )
            )}
          </div>
        </div>

        {array.length > itemsPerSlide && (
          <div className={styles.carousel_buttons}>
            <button
              className={styles.carousel_button}
              disabled={currentIndex <= 0}
              style={currentIndex <= 0 ? { opacity: 0, pointerEvents: 'none' } : {}}
              onClick={goToPrevSlide}
            >
              <IoIosArrowBack className={styles.arrow_ico} />
            </button>

            <button
              className={styles.carousel_button}
              disabled={currentIndex >= maxIndex}
              style={currentIndex >= maxIndex ? { opacity: 0, pointerEvents: 'none' } : {}}
              onClick={goToNextSlide}
            >
              <IoIosArrowForward className={styles.arrow_ico} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
