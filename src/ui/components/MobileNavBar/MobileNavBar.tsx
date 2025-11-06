import { NavLink } from 'react-router-dom';
import { IoHomeOutline, IoBookmarksOutline, IoAlbumsOutline, IoNewspaperOutline, IoPersonOutline } from 'react-icons/io5';
import styles from './MobileNavBar.module.css';
import { useTelegramHaptic } from '../../hooks/useTelegramHaptic';

export const MobileNavBar: React.FC = () => {
    const { impact } = useTelegramHaptic();
    
    const handleNavClick = () => {
        // Medium haptic feedback on navigation
        impact('medium');
    };
    
    return (
        <nav className={styles.mobile_nav}>
            <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? styles.nav_item_active : styles.nav_item} 
                aria-label="Главная"
                onClick={handleNavClick}
            >
                <IoHomeOutline className={styles.icon} />
                <span className={styles.label}>Главная</span>
            </NavLink>
            <NavLink 
                to="/bookmarks" 
                className={({ isActive }) => isActive ? styles.nav_item_active : styles.nav_item} 
                aria-label="Закладки"
                onClick={handleNavClick}
            >
                <IoBookmarksOutline className={styles.icon} />
                <span className={styles.label}>Закладки</span>
            </NavLink>
            <NavLink 
                to="/collections" 
                className={({ isActive }) => isActive ? styles.nav_item_active : styles.nav_item} 
                aria-label="Коллекции"
                onClick={handleNavClick}
            >
                <IoAlbumsOutline className={styles.icon} />
                <span className={styles.label}>Коллекции</span>
            </NavLink>
            <NavLink 
                to="/feed" 
                className={({ isActive }) => isActive ? styles.nav_item_active : styles.nav_item} 
                aria-label="Лента"
                onClick={handleNavClick}
            >
                <IoNewspaperOutline className={styles.icon} />
                <span className={styles.label}>Лента</span>
            </NavLink>
            <NavLink 
                to="/profile" 
                className={({ isActive }) => isActive ? styles.nav_item_active : styles.nav_item} 
                aria-label="Профиль"
                onClick={handleNavClick}
            >
                <IoPersonOutline className={styles.icon} />
                <span className={styles.label}>Профиль</span>
            </NavLink>
        </nav>
    );
}


