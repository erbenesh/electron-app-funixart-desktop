import { IoCalendarOutline } from "react-icons/io5";
import { getSeasonFromUnix } from '#/api/utils';
import cnFlag from '#/assets/icons/cn_flag.svg';
import jFlag from '#/assets/icons/j_flag.svg';

interface ReleaseHeaderProps {
  release: any;
}

export function ReleaseHeader({ release }: ReleaseHeaderProps) {
  if (!release) return null;

  return (
    <div className="release-header">
      <div className="release-title-row">
        <h1 className="release-title">{release.title.ru || release.title.en}</h1>
        {release.title.original && (
          <p className="release-title-original">{release.title.original}</p>
        )}
      </div>

      <div className="release-meta">
        {release.type && (
          <span className="release-type">{release.type.name}</span>
        )}
        
        {release.release_date && (
          <div className="release-date">
            <IoCalendarOutline />
            <span>{getSeasonFromUnix(release.release_date)}</span>
          </div>
        )}

        {release.country && (
          <div className="release-country">
            <img 
              src={release.country.code === 'CN' ? cnFlag : jFlag} 
              alt={release.country.name}
              width={20}
              height={15}
            />
            <span>{release.country.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}

