import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ScheduleReleaseCard } from "../ScheduleReleaseCard/ScheduleReleaseCard";
import styles from "./SchedulePreview.module.css";

const dayNames = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const today = new Date().getDay();

export const SchedulePreview = (props) => {
  const navigate = useNavigate();
  const [schedulePreview, setSchedulePreview] = useState<any[] | null>(null);

  const [currentDay, setCurrentDay] = useState(today);

  useEffect(() => {
    const loadInitialReleases = async () => {
      const data = (props.schedule.data?.schedule ?? props.schedule.data) as any;

      if (!data) {
        return;
      }

      // API returns an object with weekday arrays: { monday: [...], ... }
      const listForDay = data?.[dayNames[currentDay]];

      setSchedulePreview(Array.isArray(listForDay) && listForDay.length > 0 ? listForDay.slice(0, 10) : null);
    };

    loadInitialReleases();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.schedule.status, currentDay, props.schedule.data]);

  return (
    <div className={styles.schedule_preview_wrap}>
      <div 
        className={styles.section_title_link}
        onClick={() => navigate(props.link)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navigate(props.link);
          }
        }}
      >
        {props.sectionTitle}{" "}
        <IoIosArrowForward className={styles.title_arrow_ico} />
      </div>

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

      {props.schedule.isPending ? (
        <div className="loader-container_home">
          <i className="loader-circle"></i>
        </div>
      ) : (
        <div className={styles.today_releases_preview}>
          {Array.isArray(schedulePreview) && schedulePreview.length > 0 ? (
            schedulePreview.map((release) => (
              release?.id && (
                <ScheduleReleaseCard key={release.id} release={release} />
              )
            ))
          ) : (
            <div className={styles.no_releases}>Нет релизов на выбранный день</div>
          )}
        </div>
      )}
    </div>
  );
};
