import styles from './Recommendations.module.css'
import { RecommendationsList } from '../lists/RecommendationsList/RecommendationsList';

export const Recommendations = () => {

    return (
        <div className={styles.recommendations_page_wrap}>

            <div className={styles.recommendations_page}>
                   
                <RecommendationsList />

            </div>
        </div>
    )
}