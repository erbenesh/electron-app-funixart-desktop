import styles from './Watching.module.css';

import { WatchingList } from '../lists/WatchingList/WatchingList';

export const Watching = () => (
    <div className={styles.watching_page_wrap}>
      <div className={styles.watching_page}>
        <WatchingList />
      </div>
    </div>
  );
