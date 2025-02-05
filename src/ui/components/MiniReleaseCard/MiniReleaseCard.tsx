import { Link } from 'react-router-dom';
import { unixToDate } from '../../services/api/utils';
import styles from './MiniReleaseCard.module.css'
import { IoBookmark } from "react-icons/io5";;

const profile_lists = {
    // 0: "Не смотрю",
    1: { name: "Смотрю", bg_color: "rgb(26, 212, 85, 0.8)" },
    2: { name: "В планах", bg_color: "rgb(140, 119, 197, 0.8)" },
    3: { name: "Просмотрено", bg_color: "rgb(91, 93, 207, 0.8)" },
    4: { name: "Отложено", bg_color: "rgb(233, 196, 47, 0.8)" },
    5: { name: "Брошено", bg_color: "rgb(231, 115, 80, 0.8)" },
};

const yearSeason = ["_", "Зима", "Весна", "Лето", "Осень"];

export const MiniReleaseCard = (props) => {
    const grade = props.release.grade ? props.release.grade.toFixed(1) : null;
    const profile_list_status = props.release.profile_list_status;
    let user_list = null;
  
    if (profile_list_status != null || profile_list_status != 0) {
      user_list = profile_lists[profile_list_status];
    }

    return (
        <Link to={`/release/${props.release.id}`} id="vert_card" className={styles.card}>

            <div className={styles.release_image_border}>
                <img className={styles.release_image} src={props.release.image} alt={props.release.title_ru + " image"} loading='lazy'/>
                {user_list && <div className={styles.user_list_name} style={{background: user_list.bg_color}}>{user_list.name}</div>}
            </div>

            <div className={styles.anime_title}>{props.release.title_ru}</div>

            <div className={styles.bottom_info}>
                <span>
                    <p className={styles.anime_subinfo}>
                        {/*Сколько эпизодов*/}
                        { props.release.episodes_released && props.release.episodes_released + " из "}
                        {/*Из скольки эпизодов*/}
                        { props.release.status && props.release.status.id === 3 ? "" : props.release.episodes_total ? props.release.episodes_total + " эп" : "? эп" }
                        {/*Оценка или это анонс?*/}
                        { grade ? " • " + grade 
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
                    </p>
                </span>
                <span>{props.release.is_favorite? <IoBookmark style={{color:"goldenrod"}}/> : ""}</span>

            </div>
                
        </Link>
    )
}