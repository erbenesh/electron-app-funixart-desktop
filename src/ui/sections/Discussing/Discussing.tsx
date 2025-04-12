
import styles from './Discussing.module.css'
import { DiscussingList } from '../lists/DiscussingList/DiscussingList';

export const Discussing = () => {

    return (
        <div className={styles.discussing_page_wrap}>

            <div className={styles.discussing_page}>   

                <DiscussingList />

            </div>
        </div>
    )
}