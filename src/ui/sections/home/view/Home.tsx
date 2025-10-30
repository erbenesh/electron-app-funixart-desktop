import { useGetComments, useGetDiscoverInteresting, useGetDiscussing, useGetLastUpdatedReleasesInfinite, useGetRandomRelease, useGetRecommendationsInfinite, useGetSchedule, useGetWatchingInfinite } from "#/api/hooks";
import { useUserStore } from "#/auth/store/auth";
import { Carousel, Title } from "ui-kit";
import { InterestingCard } from "#/components/InterestingCard/InterestingCard";
import { ReleaseCard } from "#/components/ReleaseCard/ReleaseCard";
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
            <section>
              <Title level={2}>Интересное</Title>
              <Carousel showArrows showDots ariaLabel="Интересное">
                {(discoverInteresting.data?.content || []).map((el: any) => (
                  el?.id ? <InterestingCard key={el.id} release={el} /> : null
                ))}
              </Carousel>
            </section>

            <section>
              <Title level={2}>Последнее</Title>
              <Carousel showArrows ariaLabel="Последнее">
                {(lastUpdatedReleases.data?.pages || []).map((el: any) => (
                  el?.id ? <ReleaseCard key={el.id} release={el} /> : null
                ))}
              </Carousel>
            </section>

            <section>
              <Title level={2}>Популярное</Title>
              <Carousel showArrows ariaLabel="Популярное">
                {(top.data?.pages || []).map((el: any) => (
                  el?.id ? <ReleaseCard key={el.id} release={el} /> : null
                ))}
              </Carousel>
            </section>

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
              <section>
                <Title level={2}>Рекомендации</Title>
                <Carousel showArrows ariaLabel="Рекомендации">
                  {(recommendations.data?.pages || []).map((el: any) => (
                    el?.id ? <ReleaseCard key={el.id} release={el} /> : null
                  ))}
                </Carousel>
              </section>
            )}

            {token && (
              <section>
                <Title level={2}>Сейчас смотрят</Title>
                <Carousel showArrows ariaLabel="Сейчас смотрят">
                  {(watching.data?.pages || []).map((el: any) => (
                    el?.id ? <ReleaseCard key={el.id} release={el} /> : null
                  ))}
                </Carousel>
              </section>
            )}

            {token && <PopularComments popularComments={popularComments} />}

            {/* <HomeCarouselx5 array={discussing.data?.data.content} sectionTitle={"Обсуждаемое"} sectionTitleAlt={"discussingReleases"} link={"/discussing/all"}/> */}
          </div>
        </div>
      )}
    </div>
  );
};
