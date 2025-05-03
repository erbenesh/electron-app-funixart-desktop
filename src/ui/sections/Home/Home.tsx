import styles from './Home.module.css';

import { useQuery } from '@tanstack/react-query';

import { releaseService } from '../../api/release/ReleaseService';
import { discoverService } from '../../api/discover/DiscoverService';
import { RandomRelease } from './components/RandomRelease/RandomRelease';
import { SchedulePreview } from './components/SchedulePreview/SchedulePreview';
import { PopularComments } from './components/PopularComments/PopularComments';
import { HomeCarouselx2, HomeCarouselx5 } from './components/Carousels/HomeCarousels';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const Home = () => {
  const randomRelease = useQuery({
    queryKey: ['get randomRelease'],
    queryFn: () => releaseService.getRandomRelease(),
  });

  const lastUpdatedReleases = useQuery({
    queryKey: ['getLastUpdatedReleases'],
    queryFn: () => releaseService.getLastUpdatedReleases('last', 0),
  });

  const top = useQuery({
    queryKey: ['get top releases finished'],
    queryFn: () => releaseService.getLastUpdatedReleases('ongoing', 0, 1),
  });

  const discussing = useQuery({
    queryKey: ['getDiscussing'],
    queryFn: () => discoverService.getDiscussing(),
  });

  const watching = useQuery({
    queryKey: ['getWatching'],
    queryFn: () => discoverService.getWatching(0),
  });

  const schedule = useQuery({
    queryKey: ['getSchedule'],
    queryFn: () => discoverService.getSchedule(),
  });

  const recommendations = useQuery({
    queryKey: ['getRecommendations'],
    queryFn: () => discoverService.getRecommendations(null, getRandomInt(3)),
  });

  const discoverInteresting = useQuery({
    queryKey: ['getDiscoverInteresting'],
    queryFn: () => discoverService.getDiscoverInteresting(),
  });

  const popularComments = useQuery({
    queryKey: ['getPopularComments'],
    queryFn: () => discoverService.getComments(),
  });

  if (discoverInteresting.status === 'error') {
    return 'An error has occurred: ' + discoverInteresting.error.message;
  }

  return (
    <div>
      {discoverInteresting.isPending ||
      recommendations.isPending ||
      randomRelease.isPending ||
      lastUpdatedReleases.isPending ||
      schedule.isPending ||
      popularComments.isPending ||
      // || watching.isPending
      // || discussing.isPending
      top.isPending ? (
        <div className="loader-container_home">
          <i className="loader-circle" />
        </div>
      ) : (
        <div className={styles.home_page_wrap}>
          <div className={styles.home_page}>
            <HomeCarouselx2
              array={discoverInteresting.data.content}
              sectionTitle="Интересное"
              sectionTitleAlt="interestingReleases"
            />

            <HomeCarouselx5
              array={lastUpdatedReleases.data.content}
              sectionTitle="Последнее"
              sectionTitleAlt="lastReleases"
              link="/last-releases"
            />

            <HomeCarouselx5
              array={top.data.content}
              sectionTitle="Популярное"
              sectionTitleAlt="topReleases"
              link="/popular"
            />

            <RandomRelease randomRelease={randomRelease} fetchSchedule={schedule} />

            <SchedulePreview schedule={schedule} sectionTitle="Расписание" link="/schedule" />

            <HomeCarouselx5
              array={recommendations.data.content}
              sectionTitle="Рекомендации"
              sectionTitleAlt="recommendations"
              link="/recommendations"
            />

            {/* <HomeCarouselx5 array={watching.data?.data.content} sectionTitle={"Смотрят"} sectionTitleAlt={"watchingReleases"} link={"/watching/all"}/> */}

            <PopularComments popularComments={popularComments} />

            {/* <HomeCarouselx5 array={discussing.data?.data.content} sectionTitle={"Обсуждаемое"} sectionTitleAlt={"discussingReleases"} link={"/discussing/all"}/> */}
          </div>
        </div>
      )}
    </div>
  );
};
