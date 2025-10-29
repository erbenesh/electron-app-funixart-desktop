import { useGetComments, useGetDiscoverInteresting, useGetDiscussing, useGetLastUpdatedReleasesInfinite, useGetRandomRelease, useGetRecommendationsInfinite, useGetSchedule, useGetWatchingInfinite } from "#/api/hooks";
import { useUserStore } from "#/auth/store/auth";
import { HomeCarouselx2, HomeCarouselx5 } from "#/components/Home/Carousels/HomeCarousels";
import { PopularComments } from "#/components/PopularComments/PopularComments";
import { RandomRelease } from "#/components/RandomRelease/RandomRelease";
import { SchedulePreview } from "#/components/SchedulePreview/SchedulePreview";
import "../styles/Home.css";



export const Home = () => {
  const token = useUserStore((state) => state.token);

  const randomRelease = useGetRandomRelease();

  const lastUpdatedReleases = useGetLastUpdatedReleasesInfinite({ status: "last", token });

  const top = useGetLastUpdatedReleasesInfinite({ status: "ongoing", token, sort: 1 });

  const discussing = useGetDiscussing(token);

  const watching = useGetWatchingInfinite(token);

  const schedule = useGetSchedule(token);

  const recommendations = useGetRecommendationsInfinite(token);

  const discoverInteresting = useGetDiscoverInteresting();

  const popularComments = useGetComments(token);

  if (discoverInteresting.status === "error") {
    return "An error has occurred: " + discoverInteresting.error.message;
  }

  return (
    <div>
      {discoverInteresting.isPending ||
      (token && recommendations.isPending) ||
      randomRelease.isPending ||
      lastUpdatedReleases.isPending ||
      (token && schedule.isPending) ||
      (token && popularComments.isPending) ||
      (token && watching.isPending) ||
      (token && discussing.isPending) ||
      top.isPending ? (
        <div className="loader-container_home">
          <i className="loader-circle"></i>
        </div>
      ) : (
        <div className="home_page_wrap">
          <div className="home_page">
            <HomeCarouselx2
              array={discoverInteresting.data?.content}
              sectionTitle={"Интересное"}
              sectionTitleAlt={"interestingReleases"}
            />

            <HomeCarouselx5
              array={lastUpdatedReleases.data?.pages}
              sectionTitle={"Последнее"}
              sectionTitleAlt={"lastReleases"}
              link={"/last"}
            />

            <HomeCarouselx5
              array={top.data?.pages}
              sectionTitle={"Популярное"}
              sectionTitleAlt={"topReleases"}
              link={"/popular"}
            />

            <RandomRelease
              randomRelease={randomRelease}
              fetchSchedule={schedule}
            />

            {token && (
              <SchedulePreview
                schedule={schedule}
                sectionTitle={"Расписание"}
                link={"/schedule"}
              />
            )}

            {token && (
              <HomeCarouselx5
                array={recommendations.data?.pages}
                sectionTitle={"Рекомендации"}
                sectionTitleAlt={"recommendations"}
                link={"/recommendations/all"}
              />
            )}

            {token && (
              <HomeCarouselx5
                array={watching.data?.pages}
                sectionTitle={"Сейчас смотрят"}
                sectionTitleAlt={"watchingReleases"}
                link={"/watching/all"}
              />
            )}

            {token && <PopularComments popularComments={popularComments} />}

            {/* <HomeCarouselx5 array={discussing.data?.data.content} sectionTitle={"Обсуждаемое"} sectionTitleAlt={"discussingReleases"} link={"/discussing/all"}/> */}
          </div>
        </div>
      )}
    </div>
  );
};
