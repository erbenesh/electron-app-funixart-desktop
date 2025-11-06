import { IoOpenOutline } from 'react-icons/io5';
import styles from './ExternalServiceButton.module.css';

interface ExternalServiceButtonProps {
    name: string;
    logo: string;
    url: string;
}

export const ExternalServiceButton = ({ name, logo, url }: ExternalServiceButtonProps) => {
    const handleClick = () => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <button 
            className={styles.button}
            onClick={handleClick}
            type="button"
        >
            <img src={logo} alt={name} className={styles.logo} />
            <span className={styles.name}>{name}</span>
            <IoOpenOutline className={styles.icon} />
        </button>
    );
};

