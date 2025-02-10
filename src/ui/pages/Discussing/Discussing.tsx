
import styles from './Discussing.module.css'
import { FakeHeader } from "../../components/FakeHeader/FakeHeader";
import { DiscussingList } from '../../components/DiscussingList/DiscussingList';

export const Discussing = () => {

    return (
        <div className={styles.discussing_page_wrap}>

            <div className={styles.discussing_page}>   

                <FakeHeader />
                <FakeHeader />

                <DiscussingList />

            </div>
        </div>
    )
}