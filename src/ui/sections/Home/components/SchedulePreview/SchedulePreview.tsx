import styles from './SchedulePreview.module.css';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { IoIosArrowForward } from 'react-icons/io';

import { ScheduleReleaseCard } from '../../../../components/ScheduleReleaseCard/ScheduleReleaseCard';

const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const today = new Date().getDay();

export const SchedulePreview = (props) => {
  const [schedulePreview, setSchedulePreview] = useState(null);

  const [currentDay, setCurrentDay] = useState(today);

  useEffect(() => {
    async function _loadInitialReleases() {
      const data = props.schedule.data?.data;

      for (const key in data) {
        if (key !== 'code') {
          if (key == dayNames[currentDay]) {
            setSchedulePreview(data[key]);
          }
        }
      }
    }

    _loadInitialReleases();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.schedule.status, currentDay]);

  return (
    <div className={styles.schedule_preview_wrap}>
      <div className={styles.schedule}>
        <Link to={`${props.link}`} className={styles.section_title_link}>
          {props.sectionTitle} <IoIosArrowForward className={styles.title_arrow_ico} />
        </Link>

        <div className={styles.day_filters}>
          <button
            className={
              today - 1 < 0
                ? currentDay > today
                  ? styles.bookmarks_button_title_active
                  : styles.bookmarks_button_title
                : currentDay < today
                  ? styles.bookmarks_button_title_active
                  : styles.bookmarks_button_title
            }
            type="button"
            onClick={() => setCurrentDay(today - 1 < 0 ? 6 : today - 1)}
          >
            Вчера
          </button>

          <button
            className={
              currentDay === today
                ? styles.bookmarks_button_title_active
                : styles.bookmarks_button_title
            }
            type="button"
            onClick={() => setCurrentDay(today)}
          >
            Сегодня
          </button>

          <button
            className={
              today + 1 > 6
                ? currentDay < today
                  ? styles.bookmarks_button_title_active
                  : styles.bookmarks_button_title
                : currentDay > today
                  ? styles.bookmarks_button_title_active
                  : styles.bookmarks_button_title
            }
            type="button"
            onClick={() => setCurrentDay(today + 1 > 6 ? 0 : today + 1)}
          >
            Завтра
          </button>
        </div>

        {props.schedule.isPending || !schedulePreview ? (
          <div className="loader-container_home">
            <i className="loader-circle" />
          </div>
        ) : (
          <div className={styles.today_releases_preview}>
            {schedulePreview.map((el) => el.id && <ScheduleReleaseCard key={el.id} release={el} />)}
          </div>
        )}
      </div>
    </div>
  );
};
