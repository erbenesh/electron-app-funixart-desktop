import { ReleasePlayer } from '#/components/ReleasePlayer/ReleasePlayer';
import { useSearchParams } from 'react-router-dom';

export const WatchPlayPage: React.FC = () => {
  const [params] = useSearchParams();
  // type, source, voice are available in params for future preselection support
  return (
    <div
      className="wrapper"
    >    
        <div
        style={{
          height: 'calc(100vh - var(--header-height))',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
      <ReleasePlayer minimal />    
      </div>
    </div>
  );
};

