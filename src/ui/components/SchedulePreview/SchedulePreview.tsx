import { useState, useEffect } from 'react';
import styles from './SchedulePreview.module.css';
import { ScheduleReleaseCard } from '../ScheduleReleaseCard/ScheduleReleaseCard';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export const SchedulePreview = (props) => {

    const [ schedulePreview, setSchedulePreview ] = useState(null);

    const [ currentDay, setCurrentDay ] = useState(new Date().getDay());

    useEffect(() => {
        async function _loadInitialReleases() {
            const data = props.schedule.data?.data;

            for(let key in data) {
                if(key !== "code"){
                    if(key == dayNames[currentDay]){
                        setSchedulePreview(data[key]);
                    }
                }
            }
            
        }

        _loadInitialReleases();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.schedule.status, currentDay]);

    return (
        <div className={styles.schedule_preview_wrap}>

            <div className={styles.schedule}>
            <Link to={`${props.link}`} className={styles.section_title_link}>{props.sectionTitle} <IoIosArrowForward className={styles.title_arrow_ico}/></Link>
                <div className={styles.day_filters}>
                    <button className={styles.bookmarks_button_title} type="button" onClick={() => setCurrentDay(new Date().getDay() - 1)}>Вчера</button>
                    <button className={styles.bookmarks_button_title} type="button" onClick={() => setCurrentDay(new Date().getDay())}>Сегодня</button>
                    <button className={styles.bookmarks_button_title} type="button" onClick={() => setCurrentDay(new Date().getDay() + 1)}>Завтра</button>
                </div>

                { props.schedule.isPending || !schedulePreview ?
                (
                <div className="loader-container_home">	
                    <i className="loader-circle"></i>
                </div>
                ) : (

                    <div className={styles.today_releases_preview}>
                        {schedulePreview.map(el => el.id && <ScheduleReleaseCard key={el.id} release={el}/>)}
                    </div>

                )}
            </div>
        </div>
    )
}