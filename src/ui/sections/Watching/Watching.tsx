
import styles from './Watching.module.css'
import { FakeHeader } from "../../components/FakeHeader/FakeHeader";
import { WatchingList } from '../lists/WatchingList/WatchingList';

export const Watching = () => {

    return (
        <div className={styles.watching_page_wrap}>

            <div className={styles.watching_page}>   

                <FakeHeader />
                <FakeHeader />

                <WatchingList />

            </div>
        </div>
    )
}