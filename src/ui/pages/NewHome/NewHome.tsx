import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { anixartService } from "../../services/AnixartService";
import styles from './NewHome.module.css'
import { useUserStore } from "../../services/auth";
import { RandomReleaseCard } from "../../components/Home/RandomReleaseCard/RandomReleaseCard";
import { HomeCarouselx5, HomeCarouselx8 } from "../../components/Home/Carousels/HomeCarousels";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export const NewHome = () => {

    const token = useUserStore((state) => state.token);

    const [ lastReleases, setLastReleases ] = useState(null);
    const [ recommendations, setRecommendations ] = useState(null);
    const [ interestingReleases, setInterestingReleases ] = useState(null);
    const [ topReleases, setTopReleases ] = useState(null);
    const [ discussingReleases, setDiscussingReleases ] = useState(null);
    const [ watchingReleases, setWatchingReleases ] = useState(null);

    const [ randomRelease, setRandomRelease ] = useState(null);

    //Schedule
    const [ monday, setMonday ] = useState(null);

    const queryClient = useQueryClient();

    const fetchRandomRelease = useQuery({
        queryKey: ['get randomRelease'],
        queryFn: () => anixartService.getRandomRelease()
    });

    const fetchLastUpdatedReleases = useQuery({
        queryKey: ['getLastUpdatedReleases', token],
        queryFn: () => anixartService.getLastUpdatedReleases("last", token, 0)
    });

    const fetchTop = useQuery({
        queryKey: ['get top releases finished', token],
        queryFn: () => anixartService.getLastUpdatedReleases("ongoing", token, 0, 1)
    });

    const fetchDiscussing = useQuery({
        queryKey: ['getDiscussing', token],
        queryFn: () => anixartService.getDiscussing(token)
    });

    const fetchWatching = useQuery({
        queryKey: ['getWatching', token],
        queryFn: () => anixartService.getWatching(0, token)
    });

    const fetchSchedule = useQuery({
        queryKey: ['getSchedule', token],
        queryFn: () => anixartService.getSchedule(token)
    });

    const fetchRecommendations = useQuery({
        queryKey: ['getRecommendations'],
        queryFn: () => anixartService.getRecommendations(getRandomInt(3), token)
    });

    const fetchDiscoverInteresting = useQuery({
        queryKey: ['getDiscoverInteresting'],
        queryFn: () => anixartService.getDiscoverInteresting()
    });

    useEffect(() => {

        async function _loadInitialRelease() {

            const randomReleaseData = fetchRandomRelease.data?.data.release;

            if (!randomRelease && fetchRandomRelease.isSuccess) {
                console.log(randomReleaseData);
                setRandomRelease(randomReleaseData);
            }

        }

        _loadInitialRelease();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchRandomRelease.status]);

    useEffect(() => {

        async function _loadInitialRelease() {

            const randomReleaseData = fetchRandomRelease.data?.data.release;

            if (!fetchRandomRelease.isRefetching) {
                // console.log(randomReleaseData);
                setRandomRelease(randomReleaseData);
            }

        }

        _loadInitialRelease();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchRandomRelease.isRefetching]);

    useEffect(() => {
        async function _loadInitialReleases() {
            const releasesData = fetchTop.data?.data.content;

            setTopReleases(releasesData);
        }

        _loadInitialReleases();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, fetchTop.status]);

    useEffect(() => {
        async function _loadInitialReleases() {
            const releasesData = fetchDiscussing.data?.data.content;

            setDiscussingReleases(releasesData);
        }

        _loadInitialReleases();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchDiscussing.status]);

    useEffect(() => {
        async function _loadInitialReleases() {
            const mondayData = fetchSchedule.data?.data.monday;

            if(fetchSchedule.isSuccess) {
                let todayData;

                todayData = [...mondayData];

                setMonday(todayData);
            }
        }

        _loadInitialReleases();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchSchedule.status]);

    useEffect(() => {
        async function _loadInitialRecommendations() {
            const recommendationsData = fetchRecommendations.data?.data.content;
            setRecommendations(recommendationsData);
        }

        _loadInitialRecommendations();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchRecommendations.status]);

    useEffect(() => {
        async function _loadInitialReleases() {
            const releasesData = fetchLastUpdatedReleases.data?.data.content;

            setLastReleases(releasesData);
        }

        _loadInitialReleases();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, fetchLastUpdatedReleases.status]);

    useEffect(() => {
        async function _loadDiscoverInteresting() {
            const interestingData = fetchDiscoverInteresting.data?.data.content;
            //  console.log(interestingData);
            setInterestingReleases(interestingData);
        }

        _loadDiscoverInteresting();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchDiscoverInteresting.status]);

    useEffect(() => {
        async function _loadInitialReleases() {
            const releasesData = fetchWatching.data?.data.content;

            setWatchingReleases(releasesData);
        }

        _loadInitialReleases();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchWatching.status]);
    

    if (fetchDiscoverInteresting.status === "error") {
        return ('An error has occurred: ' + fetchDiscoverInteresting.error.message);
    }

    return (
        <div>
            { fetchDiscoverInteresting.isPending || fetchSchedule.isPending || !monday || !interestingReleases ?
            (
            <div className="loader-container_home">	
                <i className="loader-circle"></i>
            </div>
            ) : (
            <div className={styles.home_page_wrap}>
                <div className={styles.home_page}>

                    <div className={styles.random_header_wrap}>
                        <div className={styles.random_header}>
                            <div className={styles.random_background}>
                                <img className={styles.title_image_bg} src={randomRelease?.image} alt="" />
                            </div>
                            <div className={styles.title_wrap}> 
                                { fetchRandomRelease.isPending || fetchRandomRelease.isRefetching || !randomRelease ?
                                (
                                <div className="loader-container_home">	
                                    <i className="loader-circle"></i>
                                </div>
                                ) : (
                                        <RandomReleaseCard randomRelease={randomRelease} queryClient={queryClient}/>
                                    )
                                }
                            </div>

                        </div>

                    </div>

                    <HomeCarouselx8 array={lastReleases} sectionTitle={"Последнее"} sectionTitleAlt={"lastReleases"}/>

                    <HomeCarouselx8 array={recommendations} sectionTitle={"Рекомендации"} sectionTitleAlt={"recommendations"}/>

                    <HomeCarouselx8 array={topReleases} sectionTitle={"Популярное"} sectionTitleAlt={"topReleases"}/>

                    <HomeCarouselx5 array={interestingReleases} sectionTitle={"Интересное"} sectionTitleAlt={"interestingReleases"}/>

                    <HomeCarouselx8 array={monday} sectionTitle={"Расписание"} sectionTitleAlt={"monday"}/>

                    <HomeCarouselx8 array={discussingReleases} sectionTitle={"Обсуждаемое"} sectionTitleAlt={"discussingReleases"}/>

                    <HomeCarouselx8 array={watchingReleases} sectionTitle={"Смотрят"} sectionTitleAlt={"watchingReleases"}/>

                </div>
            </div>
            )
            }

        </div>
    )
}