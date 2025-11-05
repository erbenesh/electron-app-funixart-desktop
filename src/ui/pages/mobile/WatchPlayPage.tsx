import { ReleasePlayer } from '#/components/ReleasePlayer/ReleasePlayer';
import { useSearchParams } from 'react-router-dom';

export const WatchPlayPage: React.FC = () => {
  const [params] = useSearchParams();
  // type, source, voice are available in params for future preselection support
  return (
    <div
      className="wrapper"
      style={{
        height: '100vh',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      <ReleasePlayer minimal />
    </div>
  );
};

