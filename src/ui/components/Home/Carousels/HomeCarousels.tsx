import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { ReleaseCard } from "../../ReleaseCard/ReleaseCard"
import styles from "./HomeCarousels.module.css"
import { useState } from "react";
import { InterestingCard } from "../../InterestingCard/InterestingCard";
import { Link } from "react-router-dom";

export const HomeCarouselx8 = (props) => {

    const [ indx, setIndxLast ] = useState(0);

    const goToSlide = (index: number) => {

        const carouselMaxLen: number = (Math.floor(props.array.length / 8)) * 8;
        
        if (index < 0) {
            index = 0;
        } else if (index > carouselMaxLen) {
            index = carouselMaxLen;
        }

        setIndxLast(index);

        document.getElementById(`inner-${props.sectionTitleAlt}`)!.style.transform = `translateX(-${index * 13}rem)`;
    }
    
    const goToNextSlide = () => {
        const newIndex: number = indx + 8;
        
        goToSlide(newIndex);
    }
    
    const goToPrevSlide = () => {
        const newIndex: number = indx - 8;
        
        goToSlide(newIndex);
    }

    return (
        <div className={styles.section}>

            { props.sectionTitleAlt !== "monday" && props.sectionTitleAlt !== "discussingReleases" && props.sectionTitleAlt !== "watchingReleases" ?
            <Link to={"/schedule"} className={styles.section_title_link}>{props.sectionTitle}</Link>
            :
            <Link to={"/schedule"} className={styles.shcedule_title}><h2 className={styles.section_title_link_sh}>{props.sectionTitle}</h2><p className={styles.sh_day_title}>{props.sectionTitleAlt !== "watchingReleases" ? "Сегодня" : "Cейчас"}</p></Link>
            }

            <div className={styles.last_releases}>
                <div className="carousel">
                    <div id={`inner-${props.sectionTitleAlt}`} className="carousel-inner">
                        {
                            props.array?.map(
                                el => 
                                el.id && 
                                props.sectionTitleAlt === "interestingReleases" ?
                                <InterestingCard
                                    key={el.id} 
                                    release={el}
                                />
                                :
                                <ReleaseCard 
                                    key={el.id} 
                                    release={el}
                                />
                            ) 
                        }
                    </div>
                </div>
                <div className={styles.carousel_buttons}>
                    <button className={styles.carousel_button} 
                    style={indx <= 0 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToPrevSlide()}>
                        <IoIosArrowBack className={styles.arrow_ico}/>
                    </button>

                    <button className={styles.carousel_button} 
                    style={indx >= (Math.floor(props.array.length / 8)) * 8 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToNextSlide()}>
                        <IoIosArrowForward className={styles.arrow_ico}/>
                    </button>

                </div>
            </div>
        </div>
    )
}

export const HomeCarouselx5 = (props) => {
    const [ indx, setIndxLast ] = useState(0);

    const goToSlide = (index: number) => {

        const carouselMaxLen: number = (Math.floor(props.array.length / 5)) * 5;
        
        if (index < 0) {
            index = 0;
        } else if (index > carouselMaxLen) {
            index = carouselMaxLen;
        }

        setIndxLast(index);

        document.getElementById(`inner-${props.sectionTitleAlt}`)!.style.transform = `translateX(-${index * 19.5}rem)`;
    }
    
    const goToNextSlide = () => {
        const newIndex: number = indx + 5;
        
        goToSlide(newIndex);
    }
    
    const goToPrevSlide = () => {
        const newIndex: number = indx - 5;
        
        goToSlide(newIndex);
    }

    return (
        <div className={styles.section}>

            { props.sectionTitleAlt !== "monday" && props.sectionTitleAlt !== "discussingReleases" && props.sectionTitleAlt !== "watchingReleases" ?
            <h2 className={styles.section_title_link}>{props.sectionTitle}</h2>
            :
            <div className={styles.shcedule_title}><h2 className={styles.section_title_link_sh}>{props.sectionTitle}</h2><p className={styles.sh_day_title}>{props.sectionTitleAlt !== "watchingReleases" ? "Сегодня" : "Cейчас"}</p></div>
            }

            <div className={styles.last_releases}>
                <div className="carousel">
                    <div id={`inner-${props.sectionTitleAlt}`} className="carousel-inner">
                        {
                            props.array?.map(
                                el => 
                                el.id && 
                                props.sectionTitleAlt === "interestingReleases" ?
                                <InterestingCard
                                    key={el.id} 
                                    release={el}
                                />
                                :
                                <ReleaseCard 
                                    key={el.id} 
                                    release={el}
                                />
                            ) 
                        }
                    </div>
                </div>
                <div className={styles.carousel_buttons}>
                    <button className={styles.carousel_button} 
                    style={indx <= 0 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToPrevSlide()}>
                        <IoIosArrowBack className={styles.arrow_ico}/>
                    </button>

                    <button className={styles.carousel_button} 
                    style={indx >= (Math.floor(props.array.length / 5)) * 5 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToNextSlide()}>
                        <IoIosArrowForward className={styles.arrow_ico}/>
                    </button>

                </div>
            </div>
        </div>
    )
}