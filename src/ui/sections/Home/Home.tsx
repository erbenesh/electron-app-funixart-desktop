import { useQuery } from "@tanstack/react-query";
import styles from './Home.module.css'
import { useAuthStore } from "../../auth/store/authStore";
import { discoverService } from "../../api/discover/DiscoverService";
import { releaseService } from "../../api/release/ReleaseService";
import { HomeCarouselx2, HomeCarouselx5 } from "./components/Carousels/HomeCarousels";
import { SchedulePreview } from "./components/SchedulePreview/SchedulePreview";
import { PopularComments } from "./components/PopularComments/PopularComments";
import { RandomRelease } from "./components/RandomRelease/RandomRelease";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export const Home = () => {

    const token = useAuthStore((state) => state.token);

    const randomRelease = useQuery({
        queryKey: ['get randomRelease'],
        queryFn: () => releaseService.getRandomRelease()
    });

    const lastUpdatedReleases = useQuery({
        queryKey: ['getLastUpdatedReleases', token],
        queryFn: () => releaseService.getLastUpdatedReleases("last", token, 0)
    });

    const top = useQuery({
        queryKey: ['get top releases finished', token],
        queryFn: () => releaseService.getLastUpdatedReleases("ongoing", token, 0, 1)
    });

    const discussing = useQuery({
        queryKey: ['getDiscussing', token],
        queryFn: () => discoverService.getDiscussing(token)
    });

    const watching = useQuery({
        queryKey: ['getWatching', token],
        queryFn: () => discoverService.getWatching(0, token)
    });

    const schedule = useQuery({
        queryKey: ['getSchedule', token],
        queryFn: () => discoverService.getSchedule(token)
    });

    const recommendations = useQuery({
        queryKey: ['getRecommendations'],
        queryFn: () => discoverService.getRecommendations(getRandomInt(3), token)
    });

    const discoverInteresting = useQuery({
        queryKey: ['getDiscoverInteresting'],
        queryFn: () => discoverService.getDiscoverInteresting()
    });

    const popularComments = useQuery({
        queryKey: ['getPopularComments', token],
        queryFn: () => discoverService.getComments(token)
    });

    if (discoverInteresting.status === "error") {
        return ('An error has occurred: ' + discoverInteresting.error.message);
    }

    return (
        <div>
            { 
            
                discoverInteresting.isPending || recommendations.isPending || randomRelease.isPending || lastUpdatedReleases.isPending
                || schedule.isPending || popularComments.isPending ||
                //  watching.isPending || 
                discussing.isPending || top.isPending ?

            (
            <div className="loader-container_home">	
                <i className="loader-circle"></i>
            </div>
            ) : (
            <div className={styles.home_page_wrap}>
                <div className={styles.home_page}>

        

                    <HomeCarouselx2 array={discoverInteresting.data?.data.content} sectionTitle={"Интересное"} sectionTitleAlt={"interestingReleases"}/>

                    <HomeCarouselx5 array={lastUpdatedReleases.data?.data.content} sectionTitle={"Последнее"} sectionTitleAlt={"lastReleases"} link={"/last-releases"}/>

                    <HomeCarouselx5 array={top.data?.data.content} sectionTitle={"Популярное"} sectionTitleAlt={"topReleases"} link={"/popular"}/>

                    <RandomRelease randomRelease={randomRelease} fetchSchedule={schedule}/>

                    <SchedulePreview schedule={schedule} sectionTitle={"Расписание"} link={"/schedule"}/>

                    <HomeCarouselx5 array={recommendations.data?.data.content} sectionTitle={"Рекомендации"} sectionTitleAlt={"recommendations"} link={"/recommendations"}/>

                    {/* <HomeCarouselx5 array={watching.data?.data.content} sectionTitle={"Смотрят"} sectionTitleAlt={"watchingReleases"} link={"/watching/all"}/> */}

                    <PopularComments popularComments={popularComments}/>

                    {/* <HomeCarouselx5 array={discussing.data?.data.content} sectionTitle={"Обсуждаемое"} sectionTitleAlt={"discussingReleases"} link={"/discussing/all"}/> */}

                </div>
            </div>
            )
            }

        </div>
    )
}