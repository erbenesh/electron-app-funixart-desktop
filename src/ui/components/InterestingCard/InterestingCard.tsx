
import styles from './InterestingCard.module.css'

export const InterestingCard = ({...props}) => {

    return (
        <div id="inter_card" className={props.release["@id"] === ( props.currentIndex + 1 ) ? styles.card_first : styles.card} onClick={() => props.setCurrentChoosenRelease(props.release.action)}>

            <div className={styles.release_image_border}>
                <img className={styles.release_image} src={props.release.image} alt="" />
                
                <div className={styles.release_info_border}>
                    <p className={styles.anime_title}>{props.release.title}</p>
                    <p className={styles.anime_subinfo}>{props.release.description}</p>

                </div>  
            </div>

        </div>
    )
}