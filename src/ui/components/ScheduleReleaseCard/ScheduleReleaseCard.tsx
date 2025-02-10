import { Link } from 'react-router-dom';
import styles from './ScheduleReleaseCard.module.css'
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";

export const ScheduleReleaseCard = (props) => {

    // console.log(props.release);

    return (
        <Link to={`/release/${props.release.id}`} id="vert_card" className={styles.card} 
        //style={{backgroundImage: `linear-gradient(rgba(36, 36, 36, 0.5) 0%,  rgba(36, 36, 36, 1)100%), url(${props.release.image})`}}
        >

            <div className={styles.bg_blur}/>

            <div className={styles.release_image_border}>
                <img className={styles.release_image} src={props.release.image} alt={props.release.title_ru + " image"} loading='lazy'/>
            </div>

            <div className={styles.release_info}>

                <div className={styles.anime_title}>{props.release.title_ru}</div>

                <div className={styles.anime_subinfo_noborder}>
                    <p>{Number(props.release.episodes_released) + 1} серия</p>
                </div>

                <div className={styles.bottom_info}>

                </div>
                
            </div>
                
        </Link>
    )
}