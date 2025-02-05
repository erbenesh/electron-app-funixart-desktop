import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import styles from './Home.module.css'
import { useUserStore } from "../../services/api/auth";
import { RandomReleaseCard } from "../../components/Home/RandomReleaseCard/RandomReleaseCard";
import { HomeCarouselx2, HomeCarouselx5 } from "../../components/Home/Carousels/HomeCarousels";
import { FakeHeader } from "../../components/FakeHeader/FakeHeader";
import { releaseService } from "../../services/ReleaseService";
import { discoverService } from "../../services/DiscoverService";
import { Schedule } from "../../components/Schedule/Schedule";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export const Home = () => {

    const token = useUserStore((state) => state.token);

    const queryClient = useQueryClient();

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
    

    if (discoverInteresting.status === "error") {
        return ('An error has occurred: ' + discoverInteresting.error.message);
    }

    return (
        <div>
            { 
            
                discoverInteresting.isPending || recommendations.isPending || randomRelease.isPending || lastUpdatedReleases.isPending
                || schedule.isPending || watching.isPending || discussing.isPending || top.isPending ?

            (
            <div className="loader-container_home">	
                <i className="loader-circle"></i>
            </div>
            ) : (
            <div className={styles.home_page_wrap}>
                <div className={styles.home_page}>

                    <FakeHeader />

                    <HomeCarouselx2 array={discoverInteresting.data?.data.content} sectionTitle={"Интересное"} sectionTitleAlt={"interestingReleases"}/>

                    <HomeCarouselx5 array={lastUpdatedReleases.data?.data.content} sectionTitle={"Последнее"} sectionTitleAlt={"lastReleases"}/>

                    <HomeCarouselx5 array={recommendations.data?.data.content} sectionTitle={"Рекомендации"} sectionTitleAlt={"recommendations"}/>

                    <HomeCarouselx5 array={top.data?.data.content} sectionTitle={"Популярное"} sectionTitleAlt={"topReleases"}/>

                    <div className={styles.random_header_wrap}>
                        <div className={styles.random_header}>
                            <div className={styles.random_background}>
                                <img className={styles.title_image_bg} src={randomRelease?.data?.data.release.image} alt="" />
                            </div>
                            <div className={styles.title_wrap}> 

                                <Schedule />

                                { randomRelease.isPending || randomRelease.isRefetching ?
                                (
                                <div className="loader-container_home">	
                                    <i className="loader-circle"></i>
                                </div>
                                ) : (
                                        <RandomReleaseCard randomRelease={randomRelease.data?.data.release} queryClient={queryClient}/>
                                    )
                                }

                            </div>

                        </div>

                    </div>

                    <HomeCarouselx5 array={discussing.data?.data.content} sectionTitle={"Обсуждаемое"} sectionTitleAlt={"discussingReleases"}/>

                    <HomeCarouselx5 array={watching.data?.data.content} sectionTitle={"Смотрят"} sectionTitleAlt={"watchingReleases"}/>

                </div>
            </div>
            )
            }

        </div>
    )
}