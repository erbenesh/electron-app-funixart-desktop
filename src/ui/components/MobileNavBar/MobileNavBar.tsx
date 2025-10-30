import { NavLink } from 'react-router-dom';
import { IoHomeOutline, IoBookmarksOutline, IoAlbumsOutline, IoNewspaperOutline, IoPersonOutline } from 'react-icons/io5';
import styles from './MobileNavBar.module.css';

export const MobileNavBar: React.FC = () => {
    return (
        <nav className={styles.mobile_nav}>
            <NavLink to="/" className={({ isActive }) => isActive ? styles.nav_item_active : styles.nav_item} aria-label="Главная">
                <IoHomeOutline className={styles.icon} />
                <span className={styles.label}>Главная</span>
            </NavLink>
            <NavLink to="/bookmarks" className={({ isActive }) => isActive ? styles.nav_item_active : styles.nav_item} aria-label="Закладки">
                <IoBookmarksOutline className={styles.icon} />
                <span className={styles.label}>Закладки</span>
            </NavLink>
            <NavLink to="/collections" className={({ isActive }) => isActive ? styles.nav_item_active : styles.nav_item} aria-label="Коллекции">
                <IoAlbumsOutline className={styles.icon} />
                <span className={styles.label}>Коллекции</span>
            </NavLink>
            <NavLink to="/feed" className={({ isActive }) => isActive ? styles.nav_item_active : styles.nav_item} aria-label="Лента">
                <IoNewspaperOutline className={styles.icon} />
                <span className={styles.label}>Лента</span>
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => isActive ? styles.nav_item_active : styles.nav_item} aria-label="Профиль">
                <IoPersonOutline className={styles.icon} />
                <span className={styles.label}>Профиль</span>
            </NavLink>
        </nav>
    );
}


