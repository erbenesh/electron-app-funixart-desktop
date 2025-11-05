import { IoShuffle } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import styles from './RandomReleaseCard.module.css'

export const RandomReleaseCard = (props) => {
    const navigate = useNavigate();
    
    const handleNavigateToRelease = () => {
        if (props.randomRelease?.id) {
            navigate(`/release/${props.randomRelease.id}`);
        }
    };

    return (
        <div className={styles.title}>
            <div 
                className={styles.image_border}
                onClick={handleNavigateToRelease}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleNavigateToRelease();
                    }
                }}
            >
                <img className={styles.title_image} src={props.randomRelease?.image} alt="" />
            </div>

            <div className={styles.title_title}>
                <div className={styles.title_with_button}>
                    <div 
                        className={styles.random_release_title}
                        onClick={handleNavigateToRelease}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleNavigateToRelease();
                            }
                        }}
                    >
                        {props.randomRelease?.title_ru}
                    </div>
                    <button className={styles.random_button} onClick={() => props.queryClient.refetchQueries({queryKey: ['get randomRelease']})} type="button">
                        <IoShuffle className={styles.random_ico}/>
                    </button>
                </div>
                <p className={styles.random_description}>{props.randomRelease?.description}</p>
            </div>
        
        </div>
    )
}