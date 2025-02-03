import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { ReleaseCard } from "../../components/ReleaseCard/ReleaseCard"
import styles from './Schedule.module.css'
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { anixartService } from "../../services/AnixartService";
import { useUserStore } from "../../services/auth";

export const Schedule = () => {

    const token = useUserStore((state) => state.token);

    const fetchSchedule = useQuery({
        queryKey: ['getSchedule', token],
        queryFn: () => anixartService.getSchedule(token)
    });

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

    const goToSlide = (list: string, index: number) => {

        let carouselMaxLen: number;

        switch (list) {
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
        }
        
        if (index < 0) {
            index = 0;
        } else if (index > carouselMaxLen) {
            index = carouselMaxLen;
        }

        switch (list) {
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
        }

        document.getElementById(list)!.style.transform = `translateX(-${index * 13}rem)`;
    }
    
    const goToNextSlide = (list: string) => {
        let newIndex: number;
        switch (list) {
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
        }
        
        goToSlide(list, newIndex);
    }
    
    const goToPrevSlide = (list: string) => {
        let newIndex: number;
        switch (list) {
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
        }
        goToSlide(list, newIndex);
    }

    if (fetchSchedule.status === "error") {
        return ('An error has occurred: ' + fetchSchedule.error.message);
    }

    return (    
        <div>        
            { fetchSchedule.isPending || !monday || !thursday || !wednesday || !tuesday || !friday || !sunday || !saturday ?
            (
            <div className="loader-container_home">	
                <i className="loader-circle"></i>
            </div>
            ) : (
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
            )
            }   

        </div>
    )
}