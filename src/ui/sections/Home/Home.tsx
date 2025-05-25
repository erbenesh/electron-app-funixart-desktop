import styles from './Home.module.css';

import { useQuery } from '@tanstack/react-query';

import { releaseService } from '../../api/release/ReleaseService';
import { discoverService } from '../../api/discover/DiscoverService';
import { RandomRelease } from './components/RandomRelease/RandomRelease';
import { SchedulePreview } from './components/SchedulePreview/SchedulePreview';
import { PopularComments } from './components/PopularComments/PopularComments';
import { HomeCarousel } from './components/Carousels/HomeCarousels';

function getRandomInt(max: number) {
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

  const {
    data: schedule,
    isPending: isSchedulePending,
    isError: isScheduleError,
  } = useQuery({
    queryKey: ['getSchedule'],
    queryFn: () => discoverService.getSchedule(),
  });

  const recommendations = useQuery({
    queryKey: ['getRecommendations'],
    queryFn: () => discoverService.getRecommendations(getRandomInt(3)),
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
      isSchedulePending ||
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
            <HomeCarousel
              array={discoverInteresting.data.content}
              sectionTitle="Интересное"
              sectionTitleAlt="interestingReleases"
              itemsPerSlide={2}
              translateAmount={55}
            />

            <HomeCarousel
              array={lastUpdatedReleases.data.content}
              sectionTitle="Последнее"
              sectionTitleAlt="lastReleases"
              link="/last-releases"
              itemsPerSlide={5}
              translateAmount={20}
            />

            <HomeCarousel
              array={top.data.content}
              sectionTitle="Популярное"
              sectionTitleAlt="topReleases"
              link="/popular"
              itemsPerSlide={5}
              translateAmount={20}
            />

            <RandomRelease randomRelease={randomRelease} />

            {schedule && (
              <SchedulePreview
                schedule={schedule}
                isSchedulePending={isSchedulePending}
                sectionTitle="Расписание"
                link="/schedule"
              />
            )}

            <HomeCarousel
              array={recommendations.data.content}
              sectionTitle="Рекомендации"
              sectionTitleAlt="recommendations"
              link="/recommendations"
              itemsPerSlide={5}
              translateAmount={20}
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
