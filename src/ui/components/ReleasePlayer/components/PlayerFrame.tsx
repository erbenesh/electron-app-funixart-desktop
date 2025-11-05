import styles from '../ReleasePlayer.module.css';

interface PlayerFrameProps {
  url?: string;
  isMinimal?: boolean;
}

export function PlayerFrame({ url, isMinimal }: PlayerFrameProps) {
  if (!url) {
    return (
      <div className={styles.player_wrap}>
        <div className={styles.player}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: '100%',
            color: 'var(--color-text-secondary)',
          }}>
            Выберите озвучку и источник
          </div>
        </div>
      </div>
    );
  }

  if(isMinimal) {
    return (
        <iframe 
          allowFullScreen={true} 
          src={url} 
          className={styles.player}
        />
    );
  }

  return (
    <div className={styles.player_wrap}>
      <iframe 
        allowFullScreen={true} 
        src={url} 
        className={styles.player}
        title="Video player"
     
      />
    </div>
  );
}

