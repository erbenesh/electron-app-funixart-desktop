import { useGetComments, useGetDiscoverInteresting, useGetDiscussing, useGetLastUpdatedReleasesInfinite, useGetRandomRelease, useGetRecommendationsInfinite, useGetSchedule, useGetWatchingInfinite } from "#/api/hooks";
import { useUserStore } from "#/auth/store/auth";
import { InterestingCard } from "#/components/InterestingCard/InterestingCard";
import { PopularComments } from "#/components/PopularComments/PopularComments";
import { RandomRelease } from "#/components/RandomRelease/RandomRelease";
import { ReleaseCard } from "#/components/ReleaseCard/ReleaseCard";
import { SchedulePreview } from "#/components/SchedulePreview/SchedulePreview";
import { Carousel, Title } from "ui-kit";
import { Container } from 'ui-kit/components/Container/Container';
import { Flex } from 'ui-kit/components/Layout/Flex';
import { Page } from 'ui-kit/components/Page/Page';
import { Spinner } from 'ui-kit/components/Spinner/Spinner';
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
    <Page topOffset="md">
      <Container>
      {discoverInteresting.isPending ||
      (token && recommendations.isPending) ||
      randomRelease.isPending ||
      lastUpdatedReleases.isPending ||
      (token && schedule.isPending) ||
      (token && popularComments.isPending) ||
      (token && watching.isPending) ||
      (token && discussing.isPending) ||
      top.isPending ? (
        <Flex align="center" justify="center" style={{ minHeight: 200 }}>
          <Spinner />
        </Flex>
      ) : (
        <div>
            <section>
              <Title level={2}>Интересное</Title>
              <Carousel showArrows showDots ariaLabel="Интересное" desktopColumns={4} mobilePeek={0} gap={4} mobileGap={0}>
                {(discoverInteresting.data?.content || []).map((el: any) => (
                  el?.id ? <InterestingCard key={el.id} release={el} /> : null
                ))}
              </Carousel>
            </section>

            <section>
              <Title level={2}>Последнее</Title>
              <Carousel showArrows ariaLabel="Последнее" desktopColumns={5} mobilePeek={0} gap={4} mobileGap={0}>
                {(lastUpdatedReleases.data?.pages || []).map((el: any) => (
                  el?.id ? <ReleaseCard key={el.id} release={el} /> : null
                ))}
              </Carousel>
            </section>

            <section>
              <Title level={2}>Популярное</Title>
              <Carousel showArrows ariaLabel="Популярное" desktopColumns={5} mobilePeek={0} gap={4} mobileGap={0}>
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
                <Carousel showArrows ariaLabel="Рекомендации" desktopColumns={5} mobilePeek={0} gap={4} mobileGap={0}>
                  {(recommendations.data?.pages || []).map((el: any) => (
                    el?.id ? <ReleaseCard key={el.id} release={el} /> : null
                  ))}
                </Carousel>
              </section>
            )}

            {token && (
              <section>
                <Title level={2}>Сейчас смотрят</Title>
                <Carousel showArrows ariaLabel="Сейчас смотрят" desktopColumns={5} mobilePeek={0} gap={4} mobileGap={0}>
                  {(watching.data?.pages || []).map((el: any) => (
                    el?.id ? <ReleaseCard key={el.id} release={el} /> : null
                  ))}
                </Carousel>
              </section>
            )}

            {token && <PopularComments popularComments={popularComments} />}

            {/* <HomeCarouselx5 array={discussing.data?.data.content} sectionTitle={"Обсуждаемое"} sectionTitleAlt={"discussingReleases"} link={"/discussing/all"}/> */}
        </div>
      )}
      </Container>
    </Page>
  );
};
