import styles from './ScheduleDay.module.css';

import { IRelease } from 'src/ui/sections/Release/IRelease';
import { ScheduleReleaseCard } from '../ScheduleReleaseCard/ScheduleReleaseCard';

interface Props {
  key: string;
  array: IRelease[];
  day_title: string;
}

export const ScheduleDay = ({ key, array, day_title }: Props) => (
  <div key={key} className={styles.releases_schedule}>
    <li className={styles.sh_day_title}>{day_title}</li>

    <div className={styles.last_releases}>
      {array?.map((el: IRelease) => el.id && <ScheduleReleaseCard key={el.id} release={el} />)}
    </div>
  </div>
);
