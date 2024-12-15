import styles from './ReleasePage.module.css'
import { GoArrowLeft } from "react-icons/go";
import { BsCollectionPlay } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";
import { RxCardStackPlus } from "react-icons/rx";
import { GoHash } from "react-icons/go";
import { anixartService } from '../../services/AnixartService';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { getSeasonFromUnix, minutesToTime } from '../../services/utils';
import { LuFlag } from "react-icons/lu";
import { ReleasePlayer } from '../../components/ReleasePlayer/ReleasePlayer';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import interestCardStyles from "../../components/InterestingCard/InterestingCard.module.css"

const weekDay = [
    "_",
    "каждый понедельник",
    "каждый вторник",
    "каждую среду",
    "каждый четверг",
    "каждую пятницу",
    "каждую субботу",
    "каждое воскресенье",
];
// const yearSeason = ["_", "Зима", "Весна", "Лето", "Осень"];

export const ReleasePage = (props) => {

    const [ release, setRelease ] = useState(null);

    const [ isDescriptionHidden, setDescriptionHidden ] = useState(true);

    const [ textLineCount, setTextLineCount] = useState(0);

    const [ currentIndex, setCurrentIndex ] = useState(0);

    const textInput = useRef(null);

    useEffect(() => {

        function handleLineCount() {
            if(fetchCurrentRelease.status === "success") {
                
                // console.log(textInput.current);

                const el = textInput.current;
                const lineHeight = parseInt(window.getComputedStyle(el).lineHeight);
                const lineCount = Math.ceil(el.scrollHeight / lineHeight);
        
        
                setTextLineCount(lineCount);
            }
        }

        handleLineCount();

    });

    const fetchCurrentRelease = useQuery({
        queryKey: ['getCurrentRelease', props.currentChoosenRelease],
        queryFn: () => anixartService.getCurrentRelease(props.currentChoosenRelease)
    });

    useEffect(() => {
        async function _loadInitialRelease() {
            const releaseData: object = fetchCurrentRelease.status === "success" ? fetchCurrentRelease.data?.data.release : {};
            setRelease(releaseData);
        }

        _loadInitialRelease();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchCurrentRelease.status]);

    const goToSlide = (index: number) => {

        // const carouselMaxLen = ((release.screenshot_images?.length / 4) - (release.screenshot_images?.length / 4) % 1) * 4;
        
        if (index < 0) {
            index = 0;
        } else if (index > release.screenshot_images.length) {
            index = release.screenshot_images.length;
        }

        setCurrentIndex(index);
        document.getElementById("screens_inner")!.style.transform = `translateX(-${index * 21.5}rem)`;
    }
    
    const goToNextSlide = () => {
        const newIndex = currentIndex + 4;
        goToSlide(newIndex);
    }
    
    const goToPrevSlide = () => {
        const newIndex = currentIndex - 4;
        goToSlide(newIndex);
    }

    if (fetchCurrentRelease.status === "pending") {
        return (
            <div className="loader-container">	
                <i className="loader-circle"></i>
            </div>
        )
    } else {
        console.log(release.screenshot_images)
    }

    if (fetchCurrentRelease.status === "error") {
        return ('An error has occurred: ' + fetchCurrentRelease.error.message);
    }

    return (
        <div className={styles.release_page_wrap}>

            <div className={styles.release_page}>

                <div className={styles.toolbar}>

                    <button onClick={() => props.setCurrentChoosenRelease(null)} className={styles.back_button}>
                        <GoArrowLeft className={styles.back_ico} />
                    </button>

                    <button className={styles.back_button}>
                        <RxCardStackPlus className={styles.back_ico} />
                    </button>

                </div>

                <div className={styles.release_header}>

                    <div className={styles.header_image_borders}>

                        <div className={styles.header_background_image_border}>
                            <img className={styles.header_background_title_image} src={release.image} alt={release.title_ru} />
                        </div>

                        <div className={styles.header_title_image_border}>
                            <img className={styles.header_title_image} src={release.image} alt={release.title_ru} />
                        </div>
                        
                    </div>

                    <p className={styles.release_title}>{release.title_ru}</p>
                    <p className={styles.release_title_alt}>{release.title_original}</p>
                    
                </div>

                <div className={styles.release_info}>
                    <div className={styles.release_info_table}>

                        <ul className={styles.parameters_icons}>
                            <li className={styles.icon}>
                                <img src={release.country === "Япония" ? "/j_flag.svg" : release.country === "Китай" ? "/cn_flag.svg" : ""} alt="flag" />
                                {release.country !== "Япония" && release.country !== "Китай" && <LuFlag className={styles.mini_ico}/>}
                            </li>
                            <li className={styles.icon}><BsCollectionPlay className={styles.mini_ico}/></li>
                            <li className={styles.icon}><IoCalendarOutline className={styles.mini_ico}/></li>
                            <li className={styles.icon}><GrGroup className={styles.mini_ico}/></li>
                        </ul>

                        <ul className={styles.parameters}>

                            <li className={styles.param}>
                                {release.country && release.country}
                                {(release.aired_on_date != 0 || release.year) && ", "}
                                {release.aired_on_date != 0 &&
                                    `${getSeasonFromUnix(release.aired_on_date)} `}
                                {release.year && `${release.year} г.`}
                            </li>

                            <li className={styles.param}>
                                {release.episodes_released ? release.episodes_released : "?"}
                                {"/"}
                                {release.episodes_total ? release.episodes_total + " эп. " : "? эп. "}
                                {release.duration != 0 && `по ${minutesToTime(release.duration, "daysHours")}`}
                            </li>

                            <li className={styles.param}>
                               { release.category?.name + ", " }
                                { release.broadcast === 0
                                    ? release.status.name
                                    : `выходит ${weekDay[release.broadcast]}` }
                            </li>

                            <li className={styles.param}>
                                {release.studio && (
                                <>
                                {"Студия "}
                                {release.studio
                                    .split(", ")
                                    .map((studio: string, index: number) => {
                                        return (
                                            <div key={index} style={{display: 'inline'}}>
                                            {index > 0 && ", "}
                                            <a>{studio}</a>
                                            </div>
                                        );
                                    })
                                }
                                {(release.author || release.director) && ", "}
                                </>
                                )}
                                {release.author && (
                                    <>
                                    {"автор "}
                                    <a>{release.author}</a>
                                    {release.director && ", "}
                                    </>
                                )}
                                {release.director && (
                                    <>
                                    {"режиссёр "}
                                    <a>{release.director}</a>
                                    </>
                                )}
                            </li>

                        </ul>

                    </div>

                    <div className={styles.genres_wrap}>
                        <p className={styles.genres}><GoHash className={styles.mini_ico} style={{width: 1.2+"rem"}}/> {release.genres}</p>
                    </div>

                    <div className={styles.description_wrap}>
                        <p ref={textInput} className={isDescriptionHidden? styles.description_hidden : styles.description}>{release.description}</p>
                        
                        {textLineCount > 4 && <button className={styles.description_button} onClick={() => setDescriptionHidden(!isDescriptionHidden)}>
                            {isDescriptionHidden ? 'Подробнее...' : 'Скрыть'}
                        </button>}
                    </div>

                </div>

                { release?.screenshot_images?.length > 0 &&
                (<div className={styles.screens_wrap}>

                    <h2 className={styles.section_title}>Кадры</h2>

                    <div className="carousel" style={{maxWidth: 85+"rem"}}>
                        <div id='screens_inner' className="carousel-inner">
                            {release.screenshot_images?.map((screen: string) => (
                                <div className={interestCardStyles.card} style={{cursor: "default"}}>
                                    <div className={styles.screens_image_border}>
                                        <img className={interestCardStyles.release_image} src={screen} alt="screens" />
                                    </div>
                                </div>
                                )
                            )}
                        </div>
                    
                        <div className={styles.carousel_buttons}>
                            <button className={styles.carousel_prev_button} style={currentIndex <= 0 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToPrevSlide()}>
                                <IoIosArrowBack className={styles.arrow_ico}/>
                            </button>

                            <button className={styles.carousel_next_button} style={currentIndex >= release.screenshot_images.length/2 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToNextSlide()}>
                                <IoIosArrowForward className={styles.arrow_ico}/>
                            </button>

                        </div>

                    </div>
                </div>)}

         
                {release.status && release.status.name != "Анонс" && (
                    <div className={styles.video_player_wrap}>
                        <div className={styles.video_player}>
                            <ReleasePlayer id={props.currentChoosenRelease} />
                        </div>
                    </div>
                )}
                

                <div className={styles.video_player_wrap}>
                    <h2>Рейтинг</h2>
                </div>

                <div className={styles.video_player_wrap}>
                    <h2>В списках у людей</h2>
                </div>

                <div className={styles.video_player_wrap}>
                    <h2>Показать в коллекциях(кнопка)</h2>
                </div>
                <div className={styles.video_player_wrap}>
                    <h2>Добавить себе в коллекцию(кнопка)</h2>
                </div>

                <div className={styles.video_player_wrap}>
                    <h2>Комментарии</h2>
                </div>

            </div>
            
        </div>
    )
}