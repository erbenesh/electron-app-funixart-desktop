import styles from './ScheduleList.module.css';

import { ScheduleReleaseCard } from '../../../components/ScheduleReleaseCard/ScheduleReleaseCard';

export const ScheduleList = (props) => (
    <div className={styles.last_releases}>
      {props.array?.map((el) => el.id && <ScheduleReleaseCard key={el.id} release={el} />)}
    </div>
  );
