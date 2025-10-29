import { PopularCommentCard } from '../PopularCommentCard/PopularCommentCard';
import styles from './PopularComments.module.css';

export const PopularComments = (props) => {

    return (
        <div className={styles.schedule_preview_wrap}>

            <h2 style={{alignSelf:"start"}}>Комментарии недели</h2>

            <div className={styles.schedule}>

                { props.popularComments.data?.content?.map(com => <PopularCommentCard key={com.id} comment={com} array={props.popularComments.data?.content}/>) }
            
            </div>

        </div>
    )
}