import { IoShuffle } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import styles from './RandomReleaseCard.module.css'

export const RandomReleaseCard = (props) => {

    return (
        <div className={styles.title}>
            <Link to={`/release/${props.randomRelease?.id}`} className={styles.image_border}>
                <img className={styles.title_image} src={props.randomRelease?.image} alt="" />
            </Link>

            <div className={styles.title_title}>
                <div className={styles.title_with_button}>
                    <Link to={`/release/${props.randomRelease?.id}`} className={styles.random_release_title}>{props.randomRelease?.title_ru}</Link>
                    <button className={styles.random_button} onClick={() => props.queryClient.refetchQueries({queryKey: ['get randomRelease']})} type="button">
                        <IoShuffle className={styles.random_ico}/>
                    </button>
                </div>
                <p className={styles.random_description}>{props.randomRelease?.description}</p>
            </div>
        
        </div>
    )
}