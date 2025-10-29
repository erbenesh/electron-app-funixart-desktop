import { TbArrowBackUp } from 'react-icons/tb'
import styles from './Toolbar.module.css'
import { useNavigate } from 'react-router-dom'

export const Toolbar = () => {

    const navigate = useNavigate();

    return (
        <div className={styles.toolbar}>

            <button className={styles.back_button} onClick={() => { navigate(-1) }}>
                <TbArrowBackUp className={styles.back_ico} />
            </button>

            {/* <button className={styles.back_button}>
                <RxCardStackPlus className={styles.back_ico} />
            </button> */}

        </div>
    )
}