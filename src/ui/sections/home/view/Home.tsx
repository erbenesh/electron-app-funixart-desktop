import { useGetComments, useGetDiscoverInteresting, useGetDiscussing, useGetLastUpdatedReleasesInfinite, useGetRandomRelease, useGetRecommendationsInfinite, useGetSchedule, useGetWatchingInfinite } from "#/api/hooks";
import { useUserStore } from "#/auth/store/auth";
import { InterestingCard } from "#/components/InterestingCard/InterestingCard";
import { PopularComments } from "#/components/PopularComments/PopularComments";
import { QueryError } from "#/components/QueryError/QueryError";
import { RandomRelease } from "#/components/RandomRelease/RandomRelease";
import { ReleaseCard } from "#/components/ReleaseCard/ReleaseCard";
import { SchedulePreview } from "#/components/SchedulePreview/SchedulePreview";
import { SectionTitle } from "#/components/SectionTitle/SectionTitle";
import { Carousel } from "ui-kit";
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

  if (discoverInteresting.error) {
    return <QueryError error={discoverInteresting.error} />;
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
              <SectionTitle>Интересное</SectionTitle>
              <Carousel showArrows showDots ariaLabel="Интересное" desktopColumns={4} mobilePeek={0.12} gap={12}>
                {(discoverInteresting.data?.content || []).map((el: any) => (
                  el?.id ? <InterestingCard key={el.id} release={el} /> : null
                ))}
              </Carousel>
            </section>

            <section>
              <SectionTitle link="/last/last">Последнее</SectionTitle>
              <Carousel showArrows ariaLabel="Последнее" desktopColumns={5} mobilePeek={0.12} gap={12}>
                {(lastUpdatedReleases.data?.pages || []).map((el: any) => (
                  el?.id ? <ReleaseCard key={el.id} release={el} /> : null
                ))}
              </Carousel>
            </section>

            <section>
              <SectionTitle link="/popular/ongoing">Популярное</SectionTitle>
              <Carousel showArrows ariaLabel="Популярное" desktopColumns={5} mobilePeek={0.12} gap={12}>
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
                <SectionTitle link="/recommendations/all">Рекомендации</SectionTitle>
                <Carousel showArrows ariaLabel="Рекомендации" desktopColumns={5} mobilePeek={0.12} gap={12}>
                  {(recommendations.data?.pages || []).map((el: any) => (
                    el?.id ? <ReleaseCard key={el.id} release={el} /> : null
                  ))}
                </Carousel>
              </section>
            )}

            {token && (
              <section>
                <SectionTitle link="/watching/all">Сейчас смотрят</SectionTitle>
                <Carousel showArrows ariaLabel="Сейчас смотрят" desktopColumns={5} mobilePeek={0.12} gap={12}>
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
