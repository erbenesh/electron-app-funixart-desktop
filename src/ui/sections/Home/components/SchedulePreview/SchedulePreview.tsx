import styles from './SchedulePreview.module.css';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { IoIosArrowForward } from 'react-icons/io';

import { ScheduleReleaseCard } from '../../../../components/ScheduleReleaseCard/ScheduleReleaseCard';
import { IRelease } from 'src/ui/sections/Release/IRelease';
import { IResponseSchedule } from 'src/ui/api/discover/DiscoverService';

const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const today = new Date().getDay();

interface Props {
  schedule: IResponseSchedule;
  isSchedulePending: boolean;
  sectionTitle: string;
  link: string;
}

export const SchedulePreview = ({ schedule, isSchedulePending, sectionTitle, link }: Props) => {
  const [schedulePreview, setSchedulePreview] = useState<IRelease[]>();

  const [currentDay, setCurrentDay] = useState(today);

  useEffect(() => {
    async function _loadInitialReleases() {
      const data = schedule;

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
  }, [isSchedulePending, currentDay]);

  return (
    <div className={styles.schedule_preview_wrap}>
      <div className={styles.schedule}>
        <Link to={`${link}`} className={styles.section_title_link}>
          {sectionTitle} <IoIosArrowForward className={styles.title_arrow_ico} />
        </Link>

        <div className={styles.day_filters}>
          <button
            className={
              today - 1 < 0
                ? currentDay > today
                  ? styles.bookmarks_button_title
                  : styles.bookmarks_button_title_active
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
                  ? styles.bookmarks_button_title
                  : styles.bookmarks_button_title_active
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

        {isSchedulePending || !schedulePreview ? (
          <div className="loader-container_home">
            <i className="loader-circle" />
          </div>
        ) : (
          <div className={styles.today_releases_preview}>
            {schedulePreview.map(
              (el: IRelease) => el.id && <ScheduleReleaseCard key={el.id} release={el} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
