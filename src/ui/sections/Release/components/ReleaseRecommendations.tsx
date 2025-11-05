import { ScheduleReleaseCard } from '#/components/ScheduleReleaseCard/ScheduleReleaseCard';
import { HorizontalList } from 'ui-kit/components/HorizontalList/HorizontalList';

interface ReleaseRecommendationsProps {
  recommendations: any[];
  title?: string;
}

export function ReleaseRecommendations({ 
  recommendations, 
  title = 'Рекомендации' 
}: ReleaseRecommendationsProps) {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <section className="release-recommendations">
      <h3>{title}</h3>
      <HorizontalList>
        {recommendations.map((release: any) => (
          release?.id && (
            <ScheduleReleaseCard key={release.id} release={release} />
          )
        ))}
      </HorizontalList>
    </section>
  );
}

