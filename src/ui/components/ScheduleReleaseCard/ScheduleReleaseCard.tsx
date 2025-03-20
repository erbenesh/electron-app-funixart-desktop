import { Link } from 'react-router-dom';
import styles from './ScheduleReleaseCard.module.css'
import { unixToDate } from '../../services/utils';

const yearSeason = ["_", "Зима", "Весна", "Лето", "Осень"];

export const ScheduleReleaseCard = (props) => {
    const grade = props.release.grade ? props.release.grade.toFixed(1) : null;
    // console.log(props.release);

    return (
        <Link to={`/release/${props.release.id}`} id="vert_card" className={styles.card} 
        //style={{backgroundImage: `linear-gradient(rgba(36, 36, 36, 0.5) 0%,  rgba(36, 36, 36, 1)100%), url(${props.release.image})`}}
        >

            <div className={styles.release_image_border}>
                <img className={styles.release_image} src={props.release.image} alt={props.release.title_ru + " image"} loading='lazy'/>
            </div>

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
                
        </Link>
    )
}