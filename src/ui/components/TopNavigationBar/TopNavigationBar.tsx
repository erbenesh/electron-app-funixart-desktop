import { GoSearch } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import styles from './TopNavigationBar.module.css'
import { NavLink, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchService } from "../../services/SearchService";
import { useUserStore } from "../../services/api/auth";
import { useState } from "react";
import { ReleaseCard } from "../ReleaseCard/ReleaseCard";

export const TopNavigationBar = (props) => {

    const location = useLocation();

    const token = useUserStore((state) => state.token);

    const [ searchInputValue, setSearchInputValue ] = useState('');

    const getSearchResult = useQuery({
        queryKey: ['search results', token, searchInputValue],
        queryFn: () => searchService.searchResults(token, searchInputValue, null, location.pathname),
    });

    return (
        <div className={styles.top_tools_wrap}>

            <div className={styles.top_tools} style={props.isHeaderHidden ? {transform: "translateY(-5rem)"} : {}}>
                <div className={styles.header_wrap}>

                    <div className={styles.buttons_wraper}>
                        
                        <NavLink to="/" button-name-ru="Главная"
                        className={({ isActive }) =>
                                    isActive ? styles.toptools__active_button : styles.toptools__button
                                }
                        >
                            {/* <GoHome className={styles.menu_ico}/> */}
                            Главная
                        </NavLink>

                        <NavLink to="/bookmarks" button-name-ru="Закладки"
                        className={({ isActive }) =>
                                    isActive ? styles.toptools__active_button : styles.toptools__button
                                }
                        >
                            {/* <IoBookmarkOutline className={styles.menu_ico}/> */}
                            Закладки
                        </NavLink>

                        <NavLink to="/collections" button-name-ru="Коллекции"
                        className={({ isActive }) =>
                                    isActive ? styles.toptools__active_button : styles.toptools__button
                                }
                        >
                            {/* <BsCollectionPlay className={styles.menu_ico}/> */}
                            Коллекции
                        </NavLink>

                        <NavLink to="/feed" button-name-ru="Лента"
                        className={({ isActive }) =>
                                    isActive ? styles.toptools__active_button : styles.toptools__button
                                }
                        >
                            {/* <BsWindow className={styles.menu_ico}/> */}
                            Лента
                        </NavLink>

                        {/* <button onClick={() => {}} className={styles.toptools_search_button}>
                                <GoSearch className={styles.menu_ico}/>
                        </button> */}

                        <div className={styles.serach_input_wrapper}>
                            <input onChange={el => setSearchInputValue(el.currentTarget.value)} value={searchInputValue} type="search" placeholder='Поиск аниме' className={styles.toptools_search_input}/>
                            <GoSearch className={styles.menu_ico}/>
                        </div>

                        <NavLink to="/profile" button-name-ru="Профиль"
                        className={({ isActive }) =>
                                    isActive ? styles.toptools__active_button : styles.toptools__button
                                }
                        >
                            <img src={props.avatar} alt="" className={styles.nav_avatar}/>
                        
                            <div className={styles.profile_btn_context_menu}>
                                <NavLink to="/settings" button-name-ru="Настройки"
                                className={({ isActive }) =>
                                            isActive ? styles.toptools__active_button : styles.toptools__button
                                        }
                                >
                                    <IoSettingsOutline className={styles.menu_ico}/>
                                </NavLink>
                                <NavLink to="/notifications" button-name-ru="Уведомления"
                                className={({ isActive }) =>
                                            isActive ? styles.toptools__active_button : styles.toptools__button
                                        }
                                >
                                    <IoMdNotificationsOutline className={styles.menu_ico}/>
                                </NavLink>
                            </div>
                        </NavLink>

                    </div>
                    
                </div>

                { 
                searchInputValue !== '' && getSearchResult.data?.data &&
                <div className={styles.search_results_wrap}>
                    <div className={styles.search_results}>
                        
                        <h2>Результаты поиска</h2>
                        
                        <div className={styles.results}>
                            {
                                getSearchResult.data?.data.content.map(el => el.id && <ReleaseCard key={el.id} release={el}/>)
                            }
                        </div>
                        
                    </div>
                </div>
                }

            </div>

        </div>
    )
}