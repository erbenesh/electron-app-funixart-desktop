
import { Link } from 'react-router-dom'
import styles from './InterestingCard.module.css'
import { MediaCard } from '#/components/MediaCard/MediaCard'

export const InterestingCard = ({...props}) => {

    return (
        <Link to={props.release.type !== 3 ? `/release/${props.release.action}` : `/collection/${props.release.action}`} id="inter_card" className={styles.card}>
            <div className={styles.release_image_border}>
                <MediaCard
                    imageUrl={props.release.image}
                    bottomOverlay={
                        props.release.title ? (
                            <div className={styles.release_info_border}>
                                <p className={styles.anime_title}>{props.release.title}</p>
                                <p className={styles.anime_subinfo}>{props.release.description}</p>
                            </div>
                        ) : null
                    }
                />
            </div>
        </Link>
    )
}