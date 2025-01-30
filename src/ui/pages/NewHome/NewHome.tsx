import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { anixartService } from "../../services/AnixartService";
import styles from './NewHome.module.css'
import { useUserStore } from "../../services/auth";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { InterestingCard } from "../../components/InterestingCard/InterestingCard";
import { ReleaseCard } from "../../components/ReleaseCard/ReleaseCard";
import { IoShuffle } from "react-icons/io5";
import { Link } from "react-router-dom";

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

    const [ indxInter, setIndxInter ] = useState(0);
    const [ indxRecom, setIndxRecom ] = useState(0);
    const [ indxLast, setIndxLast ] = useState(0);
    const [ indxTop, setIndxTop ] = useState(0);
    const [ indxDiscus, setIndxDiscus ] = useState(0);
    const [ indxWatching, setIndxWatching ] = useState(0);

    //Schedule
    const [ monday, setMonday ] = useState(null);
    //Schedule indx
    const [ indxMonday, setIndxMonday ] = useState(0);

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
        queryKey: ['getDiscussing'],
        queryFn: () => anixartService.getDiscussing()
    });

    const fetchWatching = useQuery({
        queryKey: ['getWatching'],
        queryFn: () => anixartService.getWatching(0)
    });

    const fetchSchedule = useQuery({
        queryKey: ['getSchedule'],
        queryFn: () => anixartService.getSchedule()
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
            const releasesData: [] = fetchTop.status === "success" ? fetchTop.data?.data.content : [];

            setTopReleases(releasesData);
        }

        _loadInitialReleases();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, fetchTop.status]);

    useEffect(() => {
        async function _loadInitialReleases() {
            const releasesData: [] = fetchDiscussing.status === "success" ? fetchDiscussing.data?.data.content : [];

            setDiscussingReleases(releasesData);
        }

        _loadInitialReleases();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchDiscussing.status]);

    useEffect(() => {
        async function _loadInitialReleases() {
            const mondayData = fetchSchedule.data?.data.monday;
            const tuesdayData = fetchSchedule.data?.data.tuesday;
            const wednesdayData = fetchSchedule.data?.data.wednesday;
            const thursdayData = fetchSchedule.data?.data.thursday;
            const fridayData = fetchSchedule.data?.data.friday;
            const saturdayData = fetchSchedule.data?.data.saturday;
            const sundayData = fetchSchedule.data?.data.sunday;

            if(fetchSchedule.isSuccess) {
                const today = new Date();
                let todayData;
                switch(today.getDay()) {
                    case 1:
                        todayData = [...mondayData];
                        break;
                    case 2:
                        todayData = [...tuesdayData];
                        break;
                    case 3:
                        todayData = [...wednesdayData];
                        break;
                    case 4:
                        todayData = [...thursdayData];
                        break;
                    case 5:
                        todayData = [...fridayData];
                        break;
                    case 6:
                        todayData = [...saturdayData];
                        break;
                    case 7:
                        todayData = [...sundayData];
                        break;
                }
                setMonday(todayData);
            }
        }

        _loadInitialReleases();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchSchedule.status]);

    useEffect(() => {
        async function _loadInitialRecommendations() {
            const recommendationsData: [] = fetchRecommendations.status === "success" ? fetchRecommendations.data?.data.content : [];
            setRecommendations(recommendationsData);
        }

        _loadInitialRecommendations();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchRecommendations.status]);

    useEffect(() => {
        async function _loadInitialReleases() {
            const releasesData: [] = fetchLastUpdatedReleases.status === "success" ? fetchLastUpdatedReleases.data?.data.content : [];

            setLastReleases(releasesData);
        }

        _loadInitialReleases();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, fetchLastUpdatedReleases.status]);

    useEffect(() => {
        async function _loadDiscoverInteresting() {
            const interestingData: [] = fetchDiscoverInteresting.status === "success" ? fetchDiscoverInteresting.data?.data.content : [];
             console.log(interestingData);
            setInterestingReleases(interestingData);
        }

        _loadDiscoverInteresting();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchDiscoverInteresting.status]);

    useEffect(() => {
        async function _loadInitialReleases() {
            const releasesData: [] = fetchWatching.status === "success" ? fetchWatching.data?.data.content : [];

            setWatchingReleases(releasesData);
        }

        _loadInitialReleases();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchWatching.status]);
    
    const goToSlide = (list: string, index: number) => {

        let carouselMaxLen: number;

        switch (list) {
            case "last_inner":
                carouselMaxLen = (Math.floor(lastReleases.length / 8)) * 8;
                break;
            case "recommendation_inner":
                carouselMaxLen = (Math.floor(recommendations.length / 8)) * 8;
                break;
            case "top_inner":
                carouselMaxLen = (Math.floor(topReleases.length / 8)) * 8;
                break;
            case "monday_inner":
                carouselMaxLen = (Math.floor(monday.length / 8)) * 8;
                break;
            case "discussing_inner":
                carouselMaxLen = (Math.floor(discussingReleases.length / 5)) * 5;
                break;
            case "watching_inner":
                carouselMaxLen = (Math.floor(watchingReleases.length / 8)) * 8;
                break;
            default:
                carouselMaxLen = (Math.floor(interestingReleases.length / 5)) * 5;
        }
        
        if (index < 0) {
            index = 0;
        } else if (index > carouselMaxLen) {
            index = carouselMaxLen;
        }

        switch (list) {
            case "last_inner":
                setIndxLast(index);
                break;
            case "recommendation_inner":
                setIndxRecom(index);
                break;
            case "top_inner":
                setIndxTop(index);
                break;
            case "monday_inner":
                setIndxMonday(index);
                break;
            case "discussing_inner":
                setIndxDiscus(index);
                break;
            case "watching_inner":
                setIndxWatching(index);
                break;
            default:
                setIndxInter(index);
        }
        if( list === "interesting_inner") {
            document.getElementById("interesting_inner")!.style.transform = `translateX(-${index * 19.5}rem)`;
        } else {
            document.getElementById(list)!.style.transform = `translateX(-${index * 13}rem)`;
        }
    }
    
    const goToNextSlide = (list: string) => {
        let newIndex: number;
        switch (list) {
            case "last_inner":
                newIndex = indxLast + 8;
                break;
            case "recommendation_inner":
                newIndex = indxRecom + 8;
                break;
            case "top_inner":
                newIndex = indxTop + 8;
                break;
            case "monday_inner":
                newIndex = indxMonday + 8;
                break;
            case "discussing_inner":
                newIndex = indxDiscus + 5;
                break;
            case "watching_inner":
                newIndex = indxWatching + 8;
                break;
            default:
                newIndex = indxInter + 5;
        }
        
        goToSlide(list, newIndex);
    }
    
    const goToPrevSlide = (list: string) => {
        let newIndex: number;
        switch (list) {
            case "last_inner":
                newIndex = indxLast - 8;
                break;
            case "recommendation_inner":
                newIndex = indxRecom - 8;
                break;
            case "top_inner":
                newIndex = indxTop - 8;
                break;
            case "monday_inner":
                newIndex = indxMonday - 8;
                break;
            case "discussing_inner":
                newIndex = indxDiscus - 5;
                break;
            case "watching_inner":
                newIndex = indxWatching - 8;
                break;
            default:
                newIndex = indxInter - 5;
        }
        goToSlide(list, newIndex);
    }

    if (fetchDiscoverInteresting.status === "error") {
        return ('An error has occurred: ' + fetchDiscoverInteresting.error.message);
    }

    return (
        <div>
            { fetchDiscoverInteresting.isPending || fetchSchedule.isPending || !monday ?
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
                                    <div className={styles.title}>
                                        <Link to={`/release/${randomRelease?.id}`} className={styles.image_border}>
                                            <img className={styles.title_image} src={randomRelease?.image} alt="" />
                                        </Link>

                                        <div className={styles.title_title}>
                                            <div className={styles.title_with_button}>
                                                <h2 className={styles.random_release_title}>{randomRelease?.title_ru}</h2>
                                                <button className={styles.random_button} onClick={() => queryClient.refetchQueries({queryKey: ['get randomRelease']})} type="button"><IoShuffle className={styles.random_ico}/></button>
                                            </div>
                                            <p className={styles.random_description}>{randomRelease?.description}</p>
                                        </div>
                                        
                                    </div>
                                    )
                                }
                            </div>

                        </div>

                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.section_title_link}>Последнее</h2>

                        <div className={styles.last_releases}>
                            <div className="carousel">
                                <div id="last_inner" className="carousel-inner">
                                    {
                                        lastReleases?.map(
                                            el => 
                                            el.id && 
                                            <ReleaseCard 
                                                key={el.id} 
                                                release={el}
                                                currentIndex={indxLast}
                                            />
                                        ) 
                                    }
                                </div>
                            </div>
                            <div className={styles.carousel_buttons}>
                                <button className={styles.carousel_button} 
                                style={indxLast <= 0 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToPrevSlide("last_inner")}>
                                    <IoIosArrowBack className={styles.arrow_ico}/>
                                </button>

                                <button className={styles.carousel_button} 
                                style={indxLast >= (Math.floor(lastReleases.length / 8)) * 8 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToNextSlide("last_inner")}>
                                    <IoIosArrowForward className={styles.arrow_ico}/>
                                </button>

                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.section_title_link}>Рекомендации</h2>

                        <div className={styles.last_releases}>
                            <div className="carousel">
                                <div id="recommendation_inner" className="carousel-inner">
                                    {
                                        recommendations?.map(
                                            el => 
                                            el.id && 
                                            <ReleaseCard 
                                                key={el.id} 
                                                release={el}
                                                currentIndex={indxRecom}
                                            />
                                        ) 
                                    }
                                </div>
                            </div>
                            <div className={styles.carousel_buttons}>
                                <button className={styles.carousel_button} 
                                style={indxRecom <= 0 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToPrevSlide("recommendation_inner")}>
                                    <IoIosArrowBack className={styles.arrow_ico}/>
                                </button>

                                <button className={styles.carousel_button} 
                                style={indxRecom >= (Math.floor(recommendations.length / 8)) * 8 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToNextSlide("recommendation_inner")}>
                                    <IoIosArrowForward className={styles.arrow_ico}/>
                                </button>

                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.section_title_link}>Популярное</h2>

                        <div className={styles.last_releases}>
                            <div className="carousel">
                                <div id="top_inner" className="carousel-inner">
                                    {
                                        topReleases?.map(
                                            el => 
                                            el.id && 
                                            <ReleaseCard 
                                                key={el.id} 
                                                release={el}
                                                currentIndex={indxTop}
                                            />
                                        ) 
                                    }
                                </div>
                            </div>
                            <div className={styles.carousel_buttons}>
                                <button className={styles.carousel_button} 
                                style={indxTop <= 0 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToPrevSlide("top_inner")}>
                                    <IoIosArrowBack className={styles.arrow_ico}/>
                                </button>

                                <button className={styles.carousel_button} 
                                style={indxTop >= (Math.floor(topReleases.length / 8)) * 8 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToNextSlide("top_inner")}>
                                    <IoIosArrowForward className={styles.arrow_ico}/>
                                </button>

                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.section_title}>Интересное</h2>

                        <div className={styles.interesting}>
                            <div className="carousel">
                                <div id="interesting_inner" className="carousel-inner">
                                    {
                                        interestingReleases?.map((
                                            el) => 
                                            el.id && 
                                            <InterestingCard 
                                                key={el.id} 
                                                release={el}
                                                currentIndex={indxInter}
                                            />
                                        ) 
                                    }
                                </div>
                            </div>
                            <div className={styles.carousel_buttons}>
                                <button className={styles.carousel_button} 
                                style={indxInter <= 0 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToPrevSlide("interesting_inner")}>
                                    <IoIosArrowBack className={styles.arrow_ico}/>
                                </button>

                                <button className={styles.carousel_button} 
                                style={indxInter >= (Math.floor(interestingReleases.length / 5)) * 5 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToNextSlide("interesting_inner")}>
                                    <IoIosArrowForward className={styles.arrow_ico}/>
                                </button>

                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.shcedule_title}><h2 className={styles.section_title_link_sh}>Расписание</h2><p className={styles.sh_day_title}>Сегодня</p></div>
                            <div className={styles.last_releases}>
                                <div className="carousel">
                                    <div id="monday_inner" className="carousel-inner">
                                        {
                                            monday?.map(
                                                el => 
                                                el.id && 
                                                <ReleaseCard 
                                                    key={el.id} 
                                                    release={el}
                                                    currentIndex={indxMonday}
                                                    indexID={monday.findIndex(i => i.id === el.id)}
                                                />
                                            ) 
                                        }
                                    </div>
                                </div>
                                <div className={styles.carousel_buttons}>
                                    <button className={styles.carousel_button} 
                                    style={indxMonday <= 0 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToPrevSlide("monday_inner")}>
                                        <IoIosArrowBack className={styles.arrow_ico}/>
                                    </button>

                                    <button className={styles.carousel_button} 
                                    style={indxMonday >= (Math.floor(monday.length / 8) * 8) ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToNextSlide("monday_inner")}>
                                        <IoIosArrowForward className={styles.arrow_ico}/>
                                    </button>

                                </div>
                            </div>
 
                    </div>

                    <div className={styles.section}>
                        {/* <h2 className={styles.section_title}>Обсуждаемое сегодня</h2> */}
                        <div className={styles.shcedule_title}><h2 className={styles.section_title_link_sh}>Обсуждаемое</h2><p className={styles.sh_day_title}>Сегодня</p></div>
                        <div className={styles.last_releases}>
                            <div className="carousel">
                                <div id="discussing_inner" className="carousel-inner">
                                    {
                                        discussingReleases?.map((
                                            el) => 
                                            el.id && 
                                            <ReleaseCard 
                                                key={el.id} 
                                                release={el}
                                                currentIndex={indxDiscus}
                                            />
                                        ) 
                                    }
                                </div>
                            </div>
                            <div className={styles.carousel_buttons}>
                                <button className={styles.carousel_button} 
                                style={indxDiscus <= 0 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToPrevSlide("discussing_inner")}>
                                    <IoIosArrowBack className={styles.arrow_ico}/>
                                </button>

                                <button className={styles.carousel_button} 
                                style={indxDiscus >= (Math.floor(discussingReleases.length / 5)) * 5 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToNextSlide("discussing_inner")}>
                                    <IoIosArrowForward className={styles.arrow_ico}/>
                                </button>

                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        {/* <h2 className={styles.section_title_link}>Смотрят сейчас</h2> */}
                        <div className={styles.shcedule_title}><h2 className={styles.section_title_link_sh}>Смотрят</h2><p className={styles.sh_day_title}>Cейчас</p></div>
                        <div className={styles.last_releases}>
                            <div className="carousel">
                                <div id="watching_inner" className="carousel-inner">
                                    {
                                        watchingReleases?.map((
                                            el) => 
                                            el.id && 
                                            <ReleaseCard 
                                                key={el.id} 
                                                release={el}

                                                currentIndex={indxWatching}
                                            />
                                        ) 
                                    }
                                </div>
                            </div>
                            <div className={styles.carousel_buttons}>
                                <button className={styles.carousel_button} 
                                style={indxWatching <= 0 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToPrevSlide("watching_inner")}>
                                    <IoIosArrowBack className={styles.arrow_ico}/>
                                </button>

                                <button className={styles.carousel_button} 
                                style={indxWatching >= (Math.floor(watchingReleases.length / 8)) * 8 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToNextSlide("watching_inner")}>
                                    <IoIosArrowForward className={styles.arrow_ico}/>
                                </button>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
            )
            }

        </div>
    )
}