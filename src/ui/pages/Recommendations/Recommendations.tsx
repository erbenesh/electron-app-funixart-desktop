
import styles from './Recommendations.module.css'
import { FakeHeader } from "../../components/FakeHeader/FakeHeader";
import { RecommendationsList } from '../../components/RecommendationsList/RecommendationsList';

export const Recommendations = () => {

    return (
        <div className={styles.recommendations_page_wrap}>

            <div className={styles.recommendations_page}>   

                <FakeHeader />
                <FakeHeader />

                <RecommendationsList />

            </div>
        </div>
    )
}