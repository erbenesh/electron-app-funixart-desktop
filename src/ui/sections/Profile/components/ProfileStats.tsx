import { Statistic } from 'ui-kit';

interface ProfileStatsProps {
  profile: any;
}

export function ProfileStats({ profile }: ProfileStatsProps) {
  if (!profile) return null;

  return (
    <div className="profile-stats">
      <Statistic 
        label="Аниме в списках"
        value={profile.anime_count || 0}
      />
      <Statistic 
        label="Просмотрено"
        value={profile.completed_count || 0}
      />
      <Statistic 
        label="Друзей"
        value={profile.friends_count || 0}
      />
      <Statistic 
        label="Оценок"
        value={profile.votes_count || 0}
      />
    </div>
  );
}

