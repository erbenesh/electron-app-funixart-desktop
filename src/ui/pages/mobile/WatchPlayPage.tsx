import { useSearchParams } from 'react-router-dom';
import { ReleasePlayer } from '#/components/ReleasePlayer/ReleasePlayer';

export const WatchPlayPage: React.FC = () => {
  const [params] = useSearchParams();
  // type, source, voice are available in params for future preselection support
  return (
    <div className="wrapper" style={{ paddingTop: 'var(--header-height)' }}>
      <ReleasePlayer minimal />
    </div>
  );
};

