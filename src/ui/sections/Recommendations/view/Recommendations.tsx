import { RecommendationsList } from '#/components/RecommendationsList/RecommendationsList';
import '../styles/Recommendations.css';

export const Recommendations = () => {

    return (
        <div className="recommendations_page_wrap">

            <div className="recommendations_page">
                   
                <RecommendationsList />

            </div>
        </div>
    )
}