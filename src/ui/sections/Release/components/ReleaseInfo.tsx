import { GoHash } from "react-icons/go";
import { GrGroup } from "react-icons/gr";
import { BsCollectionPlay } from "react-icons/bs";
import { minutesToTime } from '#/api/utils';
import { weekDay } from '#/api/ReleaseService';

interface ReleaseInfoProps {
  release: any;
}

export function ReleaseInfo({ release }: ReleaseInfoProps) {
  if (!release) return null;

  return (
    <div className="release-info">
      {/* Episodes Info */}
      {release.episodes_total && (
        <div className="info-item">
          <GoHash />
          <span>
            {release.episodes_released || 0} из {release.episodes_total} эп.
            {release.episode_duration && ` • ${minutesToTime(release.episode_duration)}`}
          </span>
        </div>
      )}

      {/* Schedule */}
      {release.schedule_day && release.schedule_day > 0 && (
        <div className="info-item">
          <BsCollectionPlay />
          <span>Выходит {weekDay[release.schedule_day]}</span>
        </div>
      )}

      {/* Studios */}
      {release.studios && release.studios.length > 0 && (
        <div className="info-item">
          <GrGroup />
          <span>{release.studios.map((s: any) => s.name).join(', ')}</span>
        </div>
      )}

      {/* Genres */}
      {release.genres && release.genres.length > 0 && (
        <div className="genres">
          {release.genres.map((genre: any) => (
            <span key={genre.id} className="genre-tag">
              {genre.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

