import { TbArrowBackUp } from 'react-icons/tb'
import { IoShareOutline } from 'react-icons/io5'
import styles from './Toolbar.module.css'
import { useNavigate } from 'react-router-dom'

export const Toolbar = () => {

    const navigate = useNavigate();

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: document.title,
                    url: window.location.href
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
        }
    };

    return (
        <div className={styles.toolbar}>

            <button className={styles.back_button} onClick={() => { navigate(-1) }} aria-label="Назад">
                <TbArrowBackUp className={styles.back_ico} />
            </button>

            <button className={styles.share_button} onClick={handleShare} aria-label="Поделиться">
                <IoShareOutline className={styles.share_ico} />
            </button>

        </div>
    )
}