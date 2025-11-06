import { IoSettingsOutline } from "react-icons/io5";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "ui-kit/components/Button/Button";
import { useUserStore } from "../../auth/store/auth";
import { NotificationBell } from "../NotificationBell/NotificationBell";
import styles from './TopNavigationBar.module.css';
import { GlobalSearch } from './GlobalSearch';
import { useTelegramHaptic } from "../../hooks/useTelegramHaptic";

export const TopNavigationBar = (props) => {

    const location = useLocation();
    const navigate = useNavigate();
    const { impact } = useTelegramHaptic();

    const token = useUserStore((state) => state.token);
    
    const handleNavClick = () => {
        // Medium haptic on navigation
        impact('medium');
    };
    
    const handleActionClick = () => {
        // Light haptic on action buttons
        impact('light');
    };

    return (
        <div className={styles.top_tools_wrap}>

            <div className={styles.top_tools} style={props.isHeaderHidden ? {transform: "translateY(-5rem)"} : {}}>
                <div className={styles.header_wrap}>

                    <div className={styles.buttons_wraper}>
                        
                        {/* Navigation buttons - Desktop only */}
                        <div className={styles.nav_buttons}>
                            <NavLink to="/" onClick={handleNavClick}>
                                {({ isActive }) => (
                                    <Button variant={isActive ? 'primary' : 'ghost'}>
                                        Главная
                                    </Button>
                                )}
                            </NavLink>

                            <NavLink to="/bookmarks" onClick={handleNavClick}>
                                {({ isActive }) => (
                                    <Button variant={isActive ? 'primary' : 'ghost'}>
                                        Закладки
                                    </Button>
                                )}
                            </NavLink>

                            <NavLink to="/collections" onClick={handleNavClick}>
                                {({ isActive }) => (
                                    <Button variant={isActive ? 'primary' : 'ghost'}>
                                        Коллекции
                                    </Button>
                                )}
                            </NavLink>

                            <NavLink to="/feed" onClick={handleNavClick}>
                                {({ isActive }) => (
                                    <Button variant={isActive ? 'primary' : 'ghost'}>
                                        Лента
                                    </Button>
                                )}
                            </NavLink>
                        </div>

                        {/* Search and actions */}
                        <GlobalSearch token={token} />

                        <button 
                            className={styles.iconButton}
                            onClick={() => {
                                handleActionClick();
                                navigate('/settings');
                            }}
                            aria-label="Настройки"
                        >
                            <IoSettingsOutline className={styles.menu_ico} />
                        </button>

                        <NotificationBell onNotificationClick={handleActionClick} />

                    </div>
                    
                </div>

                

            </div>

        </div>
    )
}