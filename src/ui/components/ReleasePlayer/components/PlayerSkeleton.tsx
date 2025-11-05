import styles from '../ReleasePlayer.module.css';

export function PlayerSkeleton() {
  return (
    <div className={styles.player_loading}>
      <div className="loader-container">
        <i className="loader-circle"></i>
      </div>
    </div>
  );
}

