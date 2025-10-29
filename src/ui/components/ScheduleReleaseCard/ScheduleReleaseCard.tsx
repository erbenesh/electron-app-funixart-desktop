import { Link } from 'react-router-dom';
import { MediaCard } from 'ui-kit/components/MediaCard/MediaCard';
import { unixToDate } from '../../api/utils';
import styles from './ScheduleReleaseCard.module.css';

const yearSeason = ["_", "Зима", "Весна", "Лето", "Осень"];

export const ScheduleReleaseCard = (props) => {
    const grade = props.release.grade ? props.release.grade.toFixed(1) : null;
    // console.log(props.release);

    return (
        <div id="vert_card" className={styles.card}>
            <div className={styles.release_image_border}>
                <MediaCard
                    className={styles.media_card}
                    mediaClassName={styles.media_img}
                    imageUrl={props.release.image}
                    link={
                        <Link to={`/release/${props.release.id}`} />
                    }
                    bottomOverlay={
                        <div className={styles.release_info}>

                            <p className={styles.anime_title}>{props.release.title_ru}</p>

                            <div className={styles.anime_subinfo}>
                                <p>{Number(props.release.episodes_released) + 1} серия</p>
                                <div className={styles.bottom_info}>
            
                                    <div className={styles.anime_subinfo_noborder} style={{width: "100%"}}>
                                        {/*Жанры*/}
                                       # { props.release.genres }
                                    </div>
                                    
                                    <div className={styles.bottom_info}>

                                        { props.release.category &&
                                            <span className={styles.anime_subinfo_noborder}>
                                                {/*Категория*/}
                                                { props.release.category.name }
                                            </span>
                                        }

                                        { props.release.status &&
                                            <span className={styles.anime_subinfo_noborder}>
                                                {/*Статус*/}
                                                { props.release.status.name }
                                            </span>
                                        }

                                        <span className={styles.anime_subinfo_noborder}>
                                            {/*Сколько эпизодов*/}
                                            { props.release.episodes_released && props.release.episodes_released + " из "}
                                            {/*Из скольки эпизодов*/}
                                            { 
                                                // props.release.status && props.release.status.id !== 3 && 
                                                props.release.episodes_total ? props.release.episodes_total + " эп" : "? эп" 
                                            }
                                        </span>

                                        <span className={styles.anime_subinfo_noborder}>
                                            {/*Оценка или это анонс?*/}
                                            { grade ? <>&#9733; {grade}</> 
                                            : props.release.status 
                                            && props.release.status.id === 0
                                            && props.release.aired_on_date !== 0 ? (
                                                unixToDate(props.release.aired_on_date, "dayMonthYear")
                                            ) : props.release.year ? (
                                                <>
                                                    {props.release.season && props.release.season != 0
                                                    ? `${yearSeason[props.release.season]} `
                                                    : ""}
                                                    {props.release.year && `${props.release.year} г.`}
                                                </>
                                            ) : (
                                                "Скоро"
                                            )}
                                        </span>

                                    </div>

                                  
                                </div>
                            </div>

                        </div>
                    }
                />
            </div>
                
        </div>
    )
}