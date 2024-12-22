import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { anixartService } from "../../services/AnixartService";
import styles from './NewHome.module.css'
import { useUserStore } from "../../services/auth";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { InterestingCard } from "../../components/InterestingCard/InterestingCard";
import { ReleaseCard } from "../../components/ReleaseCard/ReleaseCard";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export const NewHome = (props) => {

    const token = useUserStore((state) => state.token);

    const [ lastReleases, setLastReleases ] = useState(null);
    const [ recommendations, setRecommendations ] = useState(null);
    const [ interestingReleases, setInterestingReleases ] = useState(null);
    const [ topReleases, setTopReleases ] = useState(null);
    const [ discussingReleases, setDiscussingReleases ] = useState(null);
    const [ watchingReleases, setWatchingReleases ] = useState(null);

    const [ indxInter, setIndxInter ] = useState(0);
    const [ indxRecom, setIndxRecom ] = useState(0);
    const [ indxLast, setIndxLast ] = useState(0);
    const [ indxTop, setIndxTop ] = useState(0);
    const [ indxDiscus, setIndxDiscus ] = useState(0);
    const [ indxWatching, setIndxWatching ] = useState(0);

    //Schedule
    const [ monday, setMonday ] = useState(null);
    const [ tuesday, setTuesday ] = useState(null);
    const [ wednesday, setWednesday ] = useState(null);
    const [ thursday, setThursday ] = useState(null);
    const [ friday, setFriday ] = useState(null);
    const [ saturday, setSaturday ] = useState(null);
    const [ sunday, setSunday ] = useState(null);

    //Schedule indxs
    const [ indxMonday, setIndxMonday ] = useState(0);
    const [ indxTuesday, setIndxTuesday ] = useState(0);
    const [ indxWednesday, setIndxWednesday ] = useState(0);
    const [ indxThursday, setIndxThursday ] = useState(0);
    const [ indxFriday, setIndxFriday ] = useState(0);
    const [ indxSaturday, setIndxSaturday ] = useState(0);
    const [ indxSunday, setIndxSunday ] = useState(0);

    const fetchLastUpdatedReleases = useQuery({
        queryKey: ['getLastUpdatedReleases', token],
        queryFn: () => anixartService.getLastUpdatedReleases("last", token, 0)
    });

    const fetchTop = useQuery({
        queryKey: ['get top releases finished', token],
        queryFn: () => anixartService.getLastUpdatedReleases("last", token, 0, 1)
    });

    const fetchDiscussing = useQuery({
        queryKey: ['getDiscussing'],
        queryFn: () => anixartService.getDiscussing()
    });

    const fetchWatching = useQuery({
        queryKey: ['getWatching'],
        queryFn: () => anixartService.getWatching()
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

            setMonday(mondayData);
            setTuesday(tuesdayData);
            setWednesday(wednesdayData);
            setThursday(thursdayData);
            setFriday(fridayData);
            setSaturday(saturdayData);
            setSunday(sundayData);
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
            // console.log(interestingData);
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
            case "tuesday_inner":
                carouselMaxLen = (Math.floor(tuesday.length / 8)) * 8;
                break;
            case "wednesday_inner":
                carouselMaxLen = (Math.floor(wednesday.length / 8)) * 8;
                break;
            case "thursday_inner":
                carouselMaxLen = (Math.floor(thursday.length / 8)) * 8;
                break;
            case "friday_inner":
                carouselMaxLen = (Math.floor(friday.length / 8)) * 8;
                break;
            case "saturday_inner":
                carouselMaxLen = (Math.floor(saturday.length / 8)) * 8;
                break;
            case "sunday_inner":
                carouselMaxLen = (Math.floor(sunday.length / 8)) * 8;
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
            case "tuesday_inner":
                setIndxTuesday(index);
                break;
            case "wednesday_inner":
                setIndxWednesday(index);
                break;
            case "thursday_inner":
                setIndxThursday(index);
                break;
            case "friday_inner":
                setIndxFriday(index);
                break;
            case "saturday_inner":
                setIndxSaturday(index);
                break;
            case "sunday_inner":
                setIndxSunday(index);
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
            case "tuesday_inner":
                newIndex = indxTuesday + 8;
                break;
            case "wednesday_inner":
                newIndex = indxWednesday + 8;
                break;
            case "thursday_inner":
                newIndex = indxThursday + 8;
                break;
            case "friday_inner":
                newIndex = indxFriday + 8;
                break;
            case "saturday_inner":
                newIndex = indxSaturday + 8;
                break;
            case "sunday_inner":
                newIndex = indxSunday + 8;
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
            case "tuesday_inner":
                newIndex = indxTuesday - 8;
                break;
            case "wednesday_inner":
                newIndex = indxWednesday - 8;
                break;
            case "thursday_inner":
                newIndex = indxThursday - 8;
                break;
            case "friday_inner":
                newIndex = indxFriday - 8;
                break;
            case "saturday_inner":
                newIndex = indxSaturday - 8;
                break;
            case "sunday_inner":
                newIndex = indxSunday - 8;
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
            { fetchDiscoverInteresting.isPending || fetchSchedule.isPending || !monday || !thursday || !wednesday || !tuesday || !friday || !sunday || !saturday ?
            (
            <div className="loader-container_home">	
                <i className="loader-circle"></i>
            </div>
            ) : (
            <div className={styles.home_page_wrap}>
                <div className={styles.home_page}>

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
                                                setCurrentChoosenRelease={props.setCurrentChoosenRelease}
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
                                                setCurrentChoosenRelease={props.setCurrentChoosenRelease}
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
                                                setCurrentChoosenRelease={props.setCurrentChoosenRelease}
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
                                                setCurrentChoosenRelease={props.setCurrentChoosenRelease}
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
                        <h2 className={styles.section_title}>Расписание</h2>
                        <div className={styles.releases_schedule}>
                            <h3 className={styles.sh_day_title}>Понедельник</h3>
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
                                                    setCurrentChoosenRelease={props.setCurrentChoosenRelease}
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
                            <h3 className={styles.sh_day_title}>Вторник</h3>
                            <div className={styles.last_releases}>
                                <div className="carousel">
                                    <div id="tuesday_inner" className="carousel-inner">
                                        {
                                            tuesday?.map(
                                                el => 
                                                el.id && 
                                                <ReleaseCard 
                                                    key={el.id} 
                                                    release={el}
                                                    setCurrentChoosenRelease={props.setCurrentChoosenRelease}
                                                    currentIndex={indxTuesday}
                                                    indexID={tuesday.findIndex(i => i.id === el.id)}
                                                />
                                            ) 
                                        }
                                    </div>
                                </div>
                                <div className={styles.carousel_buttons}>
                                    <button className={styles.carousel_button} 
                                    style={indxTuesday <= 0 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToPrevSlide("tuesday_inner")}>
                                        <IoIosArrowBack className={styles.arrow_ico}/>
                                    </button>

                                    <button className={styles.carousel_button} 
                                    style={indxTuesday >= (Math.floor(tuesday.length / 8)) * 8 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToNextSlide("tuesday_inner")}>
                                        <IoIosArrowForward className={styles.arrow_ico}/>
                                    </button>

                                </div>
                            </div>
                            <h3 className={styles.sh_day_title}>Среда</h3>
                            <div className={styles.last_releases}>
                                <div className="carousel">
                                    <div id="wednesday_inner" className="carousel-inner">
                                        {
                                            wednesday?.map(
                                                el => 
                                                el.id && 
                                                <ReleaseCard 
                                                    key={el.id} 
                                                    release={el}
                                                    setCurrentChoosenRelease={props.setCurrentChoosenRelease}
                                                    currentIndex={indxWednesday}
                                                    indexID={wednesday.findIndex(i => i.id === el.id)}
                                                />
                                            ) 
                                        }
                                    </div>
                                </div>
                                <div className={styles.carousel_buttons}>
                                    <button className={styles.carousel_button} 
                                    style={indxWednesday <= 0 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToPrevSlide("wednesday_inner")}>
                                        <IoIosArrowBack className={styles.arrow_ico}/>
                                    </button>

                                    <button className={styles.carousel_button} 
                                    style={indxWednesday >= (Math.floor(wednesday.length / 8)) * 8 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToNextSlide("wednesday_inner")}>
                                        <IoIosArrowForward className={styles.arrow_ico}/>
                                    </button>

                                </div>
                            </div>
                            <h3 className={styles.sh_day_title}>Четверг</h3>
                            <div className={styles.last_releases}>
                                <div className="carousel">
                                    <div id="thursday_inner" className="carousel-inner">
                                        {
                                            thursday?.map(
                                                el => 
                                                el.id && 
                                                <ReleaseCard 
                                                    key={el.id} 
                                                    release={el}
                                                    setCurrentChoosenRelease={props.setCurrentChoosenRelease}
                                                    currentIndex={indxThursday}
                                                    indexID={thursday.findIndex(i => i.id === el.id)}
                                                />
                                            ) 
                                        }
                                    </div>
                                </div>
                                <div className={styles.carousel_buttons}>
                                    <button className={styles.carousel_button} 
                                    style={indxThursday <= 0 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToPrevSlide("thursday_inner")}>
                                        <IoIosArrowBack className={styles.arrow_ico}/>
                                    </button>

                                    <button className={styles.carousel_button} 
                                    style={indxThursday >= (Math.floor(thursday.length / 8)) * 8 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToNextSlide("thursday_inner")}>
                                        <IoIosArrowForward className={styles.arrow_ico}/>
                                    </button>

                                </div>
                            </div>
                            <h3 className={styles.sh_day_title}>Пятница</h3>
                            <div className={styles.last_releases}>
                                <div className="carousel">
                                    <div id="friday_inner" className="carousel-inner">
                                        {
                                            friday?.map(
                                                el => 
                                                el.id && 
                                                <ReleaseCard 
                                                    key={el.id} 
                                                    release={el}
                                                    setCurrentChoosenRelease={props.setCurrentChoosenRelease}
                                                    currentIndex={indxFriday}
                                                    indexID={friday.findIndex(i => i.id === el.id)}
                                                />
                                            ) 
                                        }
                                    </div>
                                </div>
                                <div className={styles.carousel_buttons}>
                                    <button className={styles.carousel_button} 
                                    style={indxFriday <= 0 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToPrevSlide("friday_inner")}>
                                        <IoIosArrowBack className={styles.arrow_ico}/>
                                    </button>

                                    <button className={styles.carousel_button} 
                                    style={indxFriday >= ((friday.length / 8)) * 8 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToNextSlide("friday_inner")}>
                                        <IoIosArrowForward className={styles.arrow_ico}/>
                                    </button>

                                </div>
                            </div>
                            <h3 className={styles.sh_day_title}>Суббота</h3>
                            <div className={styles.last_releases}>
                                <div className="carousel">
                                    <div id="saturday_inner" className="carousel-inner">
                                        {
                                            saturday?.map(
                                                el => 
                                                el.id && 
                                                <ReleaseCard 
                                                    key={el.id} 
                                                    release={el}
                                                    setCurrentChoosenRelease={props.setCurrentChoosenRelease}
                                                    currentIndex={indxSaturday}
                                                    indexID={saturday.findIndex(i => i.id === el.id)}
                                                />
                                            ) 
                                        }
                                    </div>
                                </div>
                                <div className={styles.carousel_buttons}>
                                    <button className={styles.carousel_button} 
                                    style={indxSaturday <= 0 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToPrevSlide("saturday_inner")}>
                                        <IoIosArrowBack className={styles.arrow_ico}/>
                                    </button>

                                    <button className={styles.carousel_button} 
                                    style={indxSaturday >= (Math.floor(saturday.length / 8)) * 8 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToNextSlide("saturday_inner")}>
                                        <IoIosArrowForward className={styles.arrow_ico}/>
                                    </button>

                                </div>
                            </div>
                            <h3 className={styles.sh_day_title}>Воскресенье</h3>
                            <div className={styles.last_releases}>
                                <div className="carousel">
                                    <div id="sunday_inner" className="carousel-inner">
                                        {
                                            sunday?.map(
                                                el => 
                                                el.id &&
                                                <ReleaseCard 
                                                    key={el.id} 
                                                    release={el}
                                                    setCurrentChoosenRelease={props.setCurrentChoosenRelease}
                                                    currentIndex={indxSunday}
                                                    indexID={sunday.findIndex(i => i.id === el.id)}
                                                />
                                            ) 
                                        }
                                    </div>
                                </div>
                                <div className={styles.carousel_buttons}>
                                    <button className={styles.carousel_button} 
                                    style={indxSunday <= 0 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToPrevSlide("sunday_inner")}>
                                        <IoIosArrowBack className={styles.arrow_ico}/>
                                    </button>

                                    <button className={styles.carousel_button} 
                                    style={indxSunday >= (Math.floor(sunday.length / 8)) * 8 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToNextSlide("sunday_inner")}>
                                        <IoIosArrowForward className={styles.arrow_ico}/>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.section_title}>Обсуждаемое сегодня</h2>

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
                                                setCurrentChoosenRelease={props.setCurrentChoosenRelease}
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
                        <h2 className={styles.section_title_link}>Смотрят сейчас</h2>

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
                                                setCurrentChoosenRelease={props.setCurrentChoosenRelease}
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