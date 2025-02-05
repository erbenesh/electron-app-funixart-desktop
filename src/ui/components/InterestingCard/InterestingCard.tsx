
import { Link } from 'react-router-dom'
import styles from './InterestingCard.module.css'

export const InterestingCard = ({...props}) => {

    return (
        <Link to={`/release/${props.release.action}`} id="inter_card" className={styles.card}>

            <div className={styles.release_image_border}>
                <img className={styles.release_image} src={props.release.image} alt="" />
                
                {
                props.release.title &&
                <div className={styles.release_info_border}>
                    <p className={styles.anime_title}>{props.release.title}</p>
                    <p className={styles.anime_subinfo}>{props.release.description}</p>
                </div>  
                }
            
            </div>

        </Link>
    )
}