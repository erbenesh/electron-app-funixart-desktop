import { useQuery } from '@tanstack/react-query';
import { anixartService } from '../../services/AnixartService';
import styles from './Discover.module.css'
import { useEffect, useState } from 'react';
import { IRelease } from '../../interfaces/IRelease';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { InterestingCard } from '../../components/InterestingCard/InterestingCard';

export const Discover = ({...props}) => {

    const [ interestingReleases, setInterestingReleases ] = useState([]);

    const [ currentIndex, setCurrentIndex ] = useState(0);

    const fetchDiscoverInteresting = useQuery({
        queryKey: ['getDiscoverInteresting'],
        queryFn: () => anixartService.getDiscoverInteresting()
    });

    useEffect(() => {
        async function _loadDiscoverInteresting() {
            const interestingData: [] = fetchDiscoverInteresting.status === "success" ? fetchDiscoverInteresting.data?.data.content : [];
            // console.log(interestingData);
            setInterestingReleases(interestingData);
        }

        _loadDiscoverInteresting();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchDiscoverInteresting.status]);
    
    const goToSlide = (index: number) => {

        const carouselMaxLen = ((interestingReleases.length / 5) - (interestingReleases.length / 5) % 1) * 5;
        
        if (index < 0) {
            index = 0;
        } else if (index > carouselMaxLen) {
            index = carouselMaxLen;
        }

        setCurrentIndex(index);
        document.getElementById("interesting_inner")!.style.transform = `translateX(-${index * 21.5}rem)`;
        console.log(index, currentIndex);
    }
    
    const goToNextSlide = () => {
        const newIndex = currentIndex + 5;
        goToSlide(newIndex);
    }
    
    const goToPrevSlide = () => {
        const newIndex = currentIndex - 5;
        goToSlide(newIndex);
    }

    if (fetchDiscoverInteresting.status === "pending") {
        return (
            <div className="loader-container">	
                <i className="loader-circle"></i>
            </div>
        )
    }

    if (fetchDiscoverInteresting.status === "error") {
        return ('An error has occurred: ' + fetchDiscoverInteresting.error.message);
    }
    
    return(
        <div className={styles.discover_page_wrap}>

            <div className={styles.discover_page}>

                <div className={styles.discover_interesting}>
                    <div className="carousel">
                        <div id="interesting_inner" className="carousel-inner">
                            {
                                interestingReleases?.map((
                                    el: IRelease) => 
                                    el.id && 
                                    <InterestingCard 
                                        key={el.id} 
                                        release={el}
                                        setCurrentChoosenRelease={props.setCurrentChoosenRelease}
                                        currentIndex={currentIndex}
                                    />
                                ) 
                            }
                        </div>
                    </div>
                    <div className={styles.carousel_buttons}>
                        <button className={styles.carousel_prev_button} style={currentIndex <= 0 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToPrevSlide()}>
                            <IoIosArrowBack className={styles.arrow_ico}/>
                        </button>

                        <button className={styles.carousel_next_button} style={currentIndex >= ((interestingReleases.length / 5) - (interestingReleases.length / 5) % 1) * 5 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToNextSlide()}>
                            <IoIosArrowForward className={styles.arrow_ico}/>
                        </button>

                    </div>
                </div>

                <div className={styles.discover_buttons}>
                    
                </div>            

            </div>

        </div>
    );
}