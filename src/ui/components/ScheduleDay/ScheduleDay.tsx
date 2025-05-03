import styles from './ScheduleDay.module.css';

import { ScheduleList } from '../../sections/lists/ScheduleList/ScheduleList';

export const ScheduleDay = (props) => (
    <div key={props.key} className={styles.releases_schedule}>
      <li className={styles.sh_day_title}>{props.day_title}</li>

      <ScheduleList array={props.array} />
    </div>
  );
