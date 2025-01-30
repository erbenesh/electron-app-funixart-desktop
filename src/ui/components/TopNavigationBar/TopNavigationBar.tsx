import { GoHome, GoSearch } from "react-icons/go";
import { IoBookmarkOutline, IoSettingsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsWindow } from "react-icons/bs";
import { BsCollectionPlay } from "react-icons/bs";
import styles from './TopNavigationBar.module.css'
import { NavLink } from "react-router-dom";

export const TopNavigationBar = (props) => {

    return (
        <div className={styles.top_tools_wrap}>

            <div className={styles.top_tools} style={props.isHeaderHidden ? {transform: "translateY(-5rem)"} : {}}>
                <div className={styles.header_wrap}>

                    <div className={styles.buttons_wraper}>
                        
                        <NavLink to="/"
                        className={({ isActive }) =>
                                    isActive ? styles.toptools__active_button : styles.toptools__button
                                }
                        >
                            <GoHome className={styles.menu_ico}/>
                        </NavLink>

                        <NavLink to="/bookmarks"
                        className={({ isActive }) =>
                                    isActive ? styles.toptools__active_button : styles.toptools__button
                                }
                        >
                            <IoBookmarkOutline className={styles.menu_ico}/>
                        </NavLink>

                        <NavLink to="/collections"
                        className={({ isActive }) =>
                                    isActive ? styles.toptools__active_button : styles.toptools__button
                                }
                        >
                            <BsCollectionPlay className={styles.menu_ico}/>
                        </NavLink>

                        <NavLink to="/feed"
                        className={({ isActive }) =>
                                    isActive ? styles.toptools__active_button : styles.toptools__button
                                }
                        >
                            <BsWindow className={styles.menu_ico}/>
                        </NavLink>

                        <button onClick={() => {}} className={styles.toptools_search_button}>
                                <GoSearch className={styles.menu_ico}/>
                        </button>

                        <input type="search" placeholder='Поиск...' className={styles.toptools_search_input}/>

                        <NavLink to="/notifications"
                        className={({ isActive }) =>
                                    isActive ? styles.toptools__active_button : styles.toptools__button
                                }
                        >
                            <IoMdNotificationsOutline className={styles.menu_ico}/>
                        </NavLink>

                        <NavLink to="/settings"
                        className={({ isActive }) =>
                                    isActive ? styles.toptools__active_button : styles.toptools__button
                                }
                        >
                            <IoSettingsOutline className={styles.menu_ico}/>
                        </NavLink>

                        <NavLink to="/profile"
                        className={({ isActive }) =>
                                    isActive ? styles.toptools__active_button : styles.toptools__button
                                }
                        >
                            <img src={props.avatar} alt="" className={styles.nav_avatar}/>
                        </NavLink>

                    </div>
                    
                </div>
            </div>

        </div>
    )
}