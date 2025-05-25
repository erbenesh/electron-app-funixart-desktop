import styles from './Schedule.module.css';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { discoverService } from '../../api/discover/DiscoverService';
import { ScheduleDay } from '../../components/ScheduleDay/ScheduleDay';
import { IRelease } from '../Release/IRelease';

export const Schedule = () => {
  const fetchSchedule = useQuery({
    queryKey: ['getSchedule'],
    queryFn: () => discoverService.getSchedule(),
  });

  //Schedule
  const [monday, setMonday] = useState<IRelease[]>();
  const [tuesday, setTuesday] = useState<IRelease[]>();
  const [wednesday, setWednesday] = useState<IRelease[]>();
  const [thursday, setThursday] = useState<IRelease[]>();
  const [friday, setFriday] = useState<IRelease[]>();
  const [saturday, setSaturday] = useState<IRelease[]>();
  const [sunday, setSunday] = useState<IRelease[]>();

  useEffect(() => {
    async function _loadInitialReleases() {
      const data = fetchSchedule.data;
      if (data) {
        const mondayData = data.monday;
        const tuesdayData = data.tuesday;
        const wednesdayData = data.wednesday;
        const thursdayData = data.thursday;
        const fridayData = data.friday;
        const saturdayData = data.saturday;
        const sundayData = data.sunday;

        setMonday(mondayData);
        setTuesday(tuesdayData);
        setWednesday(wednesdayData);
        setThursday(thursdayData);
        setFriday(fridayData);
        setSaturday(saturdayData);
        setSunday(sundayData);
      }
    }

    _loadInitialReleases();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchSchedule.status]);

  if (fetchSchedule.status === 'error') {
    return 'An error has occurred: ' + fetchSchedule.error.message;
  }

  return (
    <div>
      {fetchSchedule.isPending ||
      !monday ||
      !thursday ||
      !wednesday ||
      !tuesday ||
      !friday ||
      !sunday ||
      !saturday ? (
        <div className="loader-container_home">
          <i className="loader-circle" />
        </div>
      ) : (
        <div className={styles.section}>
          <h2 className={styles.section_title}>Расписание</h2>

          <ScheduleDay key="monday" array={monday} day_title="Понедельник" />
          <ScheduleDay key="thursday" array={thursday} day_title="Вторник" />
          <ScheduleDay key="wednesday" array={wednesday} day_title="Среда" />
          <ScheduleDay key="tuesday" array={tuesday} day_title="Четверг" />
          <ScheduleDay key="friday" array={friday} day_title="Пятница" />
          <ScheduleDay key="sunday" array={sunday} day_title="Суббота" />
          <ScheduleDay key="saturday" array={saturday} day_title="Воскресенье" />
        </div>
      )}
    </div>
  );
};
