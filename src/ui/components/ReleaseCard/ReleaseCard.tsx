import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MediaCard } from 'ui-kit/components/MediaCard/MediaCard';
import { unixToDate } from '../../api/utils';
import styles from './ReleaseCard.module.css';


const profile_lists = {
    // 0: "Не смотрю",
    1: { name: "Смотрю", bg_color: "rgba(26, 212, 85, 0.5)" },
    2: { name: "В планах", bg_color: "rgba(140, 119, 197, 0.5)" },
    3: { name: "Просмотрено", bg_color: "rgba(91, 93, 207, 0.5)" },
    4: { name: "Отложено", bg_color: "rgba(233, 196, 47, 0.5)" },
    5: { name: "Брошено", bg_color: "rgba(231, 115, 80, 0.5)" },
};

const yearSeason = ["_", "Зима", "Весна", "Лето", "Осень"];

export const ReleaseCard = (props) => {

    const grade = props.release.grade ? props.release.grade.toFixed(1) : null;

    const profile_list_status = props.release.profile_list_status;
    
    let user_list = null;
  
    if (profile_list_status != null || profile_list_status != 0) {
      user_list = profile_lists[profile_list_status];
    }

    const [dominantColor, setDominantColor] = useState('rgba(36, 36, 36, 1)');

    // Dominant color calculation removed to avoid external dependency

    return (
        <div id="vert_card" className={styles.vert_card}>

            <div className={styles.release_image_border}>
            <MediaCard
                imageUrl={props.release.image}
                link={
                    <Link 
                        to={`/release/${props.release.id}`} 
                        onClick={() => props.clickCallBack && props.clickCallBack("")}
                    />
                }
                bottomOverlay={
                    <div className={styles.release_info}>

                        <div className={styles.anime_title}>{props.release.title_ru}</div>

                        <div className={styles.anime_subinfo_noborder}>
                            {/*Жанры*/}
                            # { props.release.genres }
                        </div>

                        <div className={styles.bottom_info}>
                        
                            { props.release.category &&
                            <>
                                <span className={styles.anime_subinfo}>
                                    {/*Категория*/}
                                    { props.release.category.name }
                                </span>
                                •
                            </>
                            }
                    
                            { props.release.status &&
                            <>
                                <span className={styles.anime_subinfo}>
                                    {/*Статус*/}
                                    { props.release.status.name }
                                </span>
                                •
                            </>
                            }
                
                            <span className={styles.anime_subinfo}>
                                {/*Сколько эпизодов*/}
                                { props.release.episodes_released && props.release.episodes_released + " из "}
                                {/*Из скольки эпизодов*/}
                                { 
                                    // props.release.status && props.release.status.id !== 3 && 
                                    props.release.episodes_total ? props.release.episodes_total + " эп" : "? эп" 
                                }
                            </span>
                        •        
                            <span className={styles.anime_subinfo}>
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

                            {/* <div className={styles.bookmark}>
                                {
                                props.release.is_favorite? 
                                <IoBookmark style={{color:"rgb(189, 78, 44)", width: '1.2rem', height: '1.2rem'}}/> 
                                : <IoBookmarkOutline style={{color:"rgb(160, 160, 160)", width: '1.2rem', height: '1.2rem'}}/>
                                }
                            </div> */}

                            
                        </div>
                                    
                        <div className={styles.release_lists_info}>

                            {user_list && 
                            <span className={styles.user_list_name} style={{background: user_list.bg_color}}>
                                {user_list.name}
                            </span>
                            }

                        </div>

                    </div>
                }
                overlayStyle={{
                    background: `linear-gradient(to top, ${dominantColor.replace('1)', '0.95)')} 0%, ${dominantColor.replace('1)', '0.75)')} 40%, ${dominantColor.replace('1)', '0.3)')} 70%, ${dominantColor.replace('1)', '0)')} 100%)`
                }}
            />
            </div>
                
        </div>
    )
}

{/* <div className="glowing-elements">
<div className="glow-1"></div>
<div className="glow-2"></div>
<div className="glow-3"></div>
</div>
<div className="card-particles">
<span></span><span></span><span></span> <span></span><span>
  </span><span></span>
</div> */}


{/* <div data-position="top" className="carousel">
<span className="carousel__text">• card component • card component • card component • card component •
  card component • card component</span>
</div>

<div data-direction="right" data-position="bottom" className="carousel">
<span className="carousel__text">• card component • card component • card component • card component •
  card component • card component</span>
</div> */}