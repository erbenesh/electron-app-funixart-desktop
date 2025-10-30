import { useRef, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "ui-kit/components/Button/Button";
import { useUserStore } from "../../auth/store/auth";
import { useClickOutside } from "../../hooks/useClickOutside";
import { NotificationBell } from "../NotificationBell/NotificationBell";
import { ReleaseCard } from "../ReleaseCard/ReleaseCard";
import styles from './TopNavigationBar.module.css';
import { GlobalSearch } from './GlobalSearch';

export const TopNavigationBar = (props) => {

    const location = useLocation();

    const token = useUserStore((state) => state.token);

    return (
        <div className={styles.top_tools_wrap}>

            <div className={styles.top_tools} style={props.isHeaderHidden ? {transform: "translateY(-5rem)"} : {}}>
                <div className={styles.header_wrap}>

                    <div className={styles.buttons_wraper}>
                        
                        <NavLink to="/" button-name-ru="Главная" onClick={() => {}}>
                            {({ isActive }) => (
                                <Button variant={isActive ? 'primary' : 'ghost'}>
                                    Главная
                                </Button>
                            )}
                        </NavLink>

                        <NavLink to="/bookmarks" button-name-ru="Закладки" onClick={() => {}}>
                            {({ isActive }) => (
                                <Button variant={isActive ? 'primary' : 'ghost'}>
                                    Закладки
                                </Button>
                            )}
                        </NavLink>

                        <NavLink to="/collections" button-name-ru="Коллекции" onClick={() => {}}>
                            {({ isActive }) => (
                                <Button variant={isActive ? 'primary' : 'ghost'}>
                                    Коллекции
                                </Button>
                            )}
                        </NavLink>

                        <NavLink to="/feed" button-name-ru="Лента" onClick={() => {}}>
                            {({ isActive }) => (
                                <Button variant={isActive ? 'primary' : 'ghost'}>
                                    Лента
                                </Button>
                            )}
                        </NavLink>

                        {/* <button onClick={() => {}} className={styles.toptools_search_button}>
                                <GoSearch className={styles.menu_ico}/>
                        </button> */}

                        <GlobalSearch token={token} />

                        <NotificationBell />

                        <NavLink to="/profile" button-name-ru="Профиль" onClick={() => {}}>
                            {({ isActive }) => (
                                <Button variant={isActive ? 'primary' : 'ghost'}>
                                    <img src={props.avatar} alt="" className={styles.nav_avatar}/>
                                    <div className={styles.profile_btn_context_menu}>
                                        <NavLink to="/settings" button-name-ru="Настройки" onClick={() => {}}>
                                            {({ isActive: isSettingsActive }) => (
                                                <Button variant={isSettingsActive ? 'primary' : 'ghost'}>
                                                    <IoSettingsOutline className={styles.menu_ico}/>
                                                </Button>
                                            )}
                                        </NavLink>
                                        <NavLink to="/notifications" button-name-ru="Уведомления" onClick={() => {}}>
                                            {({ isActive: isNotifActive }) => (
                                                <Button variant={isNotifActive ? 'primary' : 'ghost'}>
                                                    <IoMdNotificationsOutline className={styles.menu_ico}/>
                                                </Button>
                                            )}
                                        </NavLink>
                                    </div>
                                </Button>
                            )}
                        </NavLink>

                    </div>
                    
                </div>

                

            </div>

        </div>
    )
}