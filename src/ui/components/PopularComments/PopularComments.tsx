import styles from './PopularComments.module.css';
import { PopularCommentCard } from '../PopularCommentCard/PopularCommentCard';

export const PopularComments = (props) => {

    return (
        <div className={styles.schedule_preview_wrap}>

            <h2 style={{alignSelf:"start"}}>Комментарии недели</h2>

            <div className={styles.schedule}>

                { props.popularComments.data?.data.content.map(com => <PopularCommentCard key={com.id} comment={com} array={props.popularComments.data?.data.content}/>) }
            
            </div>

        </div>
    )
}