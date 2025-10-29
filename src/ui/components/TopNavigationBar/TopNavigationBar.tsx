import { useRef, useState } from "react";
import { GoSearch } from "react-icons/go";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "ui-kit/components/Button/Button";
import { SearchInput } from "ui-kit/components/SearchInput/SearchInput";
import { useSearchResults } from "../../api/hooks/useSearch";
import { useUserStore } from "../../auth/store/auth";
import { useClickOutside } from "../../hooks/useClickOutside";
import { NotificationBell } from "../NotificationBell/NotificationBell";
import { ReleaseCard } from "../ReleaseCard/ReleaseCard";
import styles from './TopNavigationBar.module.css';

export const TopNavigationBar = (props) => {

    const location = useLocation();

    const token = useUserStore((state) => state.token);

    const [ searchInputValue, setSearchInputValue ] = useState('');

    const getSearchResult = useSearchResults({ token, query: searchInputValue, searchBy: null, location: location.pathname });

    const searchInputRef = useRef(null);

    useClickOutside(searchInputRef, () => setSearchInputValue(''));

    return (
        <div className={styles.top_tools_wrap}>

            <div className={styles.top_tools} style={props.isHeaderHidden ? {transform: "translateY(-5rem)"} : {}}>
                <div className={styles.header_wrap}>

                    <div className={styles.buttons_wraper}>
                        
                        <NavLink to="/" button-name-ru="Главная" onClick={() => setSearchInputValue('')}>
                            {({ isActive }) => (
                                <Button variant={isActive ? 'primary' : 'ghost'}>
                                    Главная
                                </Button>
                            )}
                        </NavLink>

                        <NavLink to="/bookmarks" button-name-ru="Закладки" onClick={() => setSearchInputValue('')}>
                            {({ isActive }) => (
                                <Button variant={isActive ? 'primary' : 'ghost'}>
                                    Закладки
                                </Button>
                            )}
                        </NavLink>

                        <NavLink to="/collections" button-name-ru="Коллекции" onClick={() => setSearchInputValue('')}>
                            {({ isActive }) => (
                                <Button variant={isActive ? 'primary' : 'ghost'}>
                                    Коллекции
                                </Button>
                            )}
                        </NavLink>

                        <NavLink to="/feed" button-name-ru="Лента" onClick={() => setSearchInputValue('')}>
                            {({ isActive }) => (
                                <Button variant={isActive ? 'primary' : 'ghost'}>
                                    Лента
                                </Button>
                            )}
                        </NavLink>

                        {/* <button onClick={() => {}} className={styles.toptools_search_button}>
                                <GoSearch className={styles.menu_ico}/>
                        </button> */}

                        <div className={styles.serach_input_wrapper} ref={searchInputRef}>
                            <SearchInput
                                placeholder='Поиск аниме'
                                value={searchInputValue}
                                onChange={el => setSearchInputValue(el.currentTarget.value)}
                            />
                            <GoSearch className={styles.menu_ico}/>
                        </div>

                        <NotificationBell />

                        <NavLink to="/profile" button-name-ru="Профиль" onClick={() => setSearchInputValue('')}>
                            {({ isActive }) => (
                                <Button variant={isActive ? 'primary' : 'ghost'}>
                                    <img src={props.avatar} alt="" className={styles.nav_avatar}/>
                                    <div className={styles.profile_btn_context_menu}>
                                        <NavLink to="/settings" button-name-ru="Настройки" onClick={() => setSearchInputValue('')}>
                                            {({ isActive: isSettingsActive }) => (
                                                <Button variant={isSettingsActive ? 'primary' : 'ghost'}>
                                                    <IoSettingsOutline className={styles.menu_ico}/>
                                                </Button>
                                            )}
                                        </NavLink>
                                        <NavLink to="/notifications" button-name-ru="Уведомления" onClick={() => setSearchInputValue('')}>
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

                { 
                searchInputValue !== '' && getSearchResult.data?.data &&
                <div ref={searchInputRef} className={styles.search_results_wrap}>
                    <div className={styles.search_results}>
                        
                        <h2>Результаты поиска</h2>
                        
                        <div className={styles.results}>
                            {
                                getSearchResult.data?.data.content.map(el => el.id && <ReleaseCard key={el.id} release={el} clickCallBack={setSearchInputValue}/>)
                            }
                        </div>
                        
                    </div>
                </div>
                }

            </div>

        </div>
    )
}