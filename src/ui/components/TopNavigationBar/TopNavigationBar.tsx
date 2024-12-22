import { GoHome, GoSearch } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { BsWindow } from "react-icons/bs";
import { BsCollectionPlay } from "react-icons/bs";
import styles from './TopNavigationBar.module.css'

export const TopNavigationBar = (props) => {

    return (
        <div className={styles.top_tools_wrap}>

            <div className={styles.top_tools} style={props.isHeaderHidden ? {transform: "translateY(-5rem)"} : {}}>
                <div className={styles.header_wrap}>

                    <div className={styles.buttons_wraper}>
                        <button onClick={() => props.setNextCurrentPage("home")} className={props.currentPage === "home" ? styles.toptools__active_button : styles.toptools__button}>
                            <GoHome className={styles.menu_ico}/>
                        </button>
                        <button onClick={() => props.setNextCurrentPage("bookmarks")} className={props.currentPage === "bookmarks" ? styles.toptools__active_button : styles.toptools__button}>
                            <BsCollectionPlay className={styles.menu_ico}/>
                        </button>
                        <button onClick={() => props.setNextCurrentPage("feed")} className={props.currentPage === "feed" ? styles.toptools__active_button : styles.toptools__button}>
                            <BsWindow className={styles.menu_ico}/>
                        </button>

                        <button onClick={() => {}} className={styles.toptools_search_button}>
                                <GoSearch className={styles.menu_ico}/>
                        </button>
                        <input type="search" placeholder='Поиск...' className={styles.toptools_search_input}/>
                        
                        <button className={props.currentPage === "notifications" ? styles.toptools__active_button : styles.toptools__button}>
                            <IoMdNotificationsOutline className={styles.menu_ico}/>
                        </button>
                        <button onClick={() => props.setNextCurrentPage("profile")} className={props.currentPage === "profile" ? styles.toptools__active_button : styles.toptools__button}>
                            <HiOutlineUserCircle className={styles.menu_ico}/>
                        </button>
                        <button onClick={() => props.setNextCurrentPage("settings")} className={props.currentPage === "settings" ? styles.toptools__active_button : styles.toptools__button}>
                            <IoSettingsOutline className={styles.menu_ico}/>
                        </button>

                    </div>

                </div>
            </div>

        </div>
    )
}