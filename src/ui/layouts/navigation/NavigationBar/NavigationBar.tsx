import styles from './NavigationBar.module.css';

import { useRef, useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { useQuery } from '@tanstack/react-query';
import { NavLink, matchPath, useLocation } from 'react-router-dom';

import { useAuthStore } from '../../../auth/store/authStore';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { searchService } from '../../../api/search/SearchService';
import { ReleaseCard } from '../../../components/ReleaseCard/ReleaseCard';
import { ProfileCard } from '../../../components/ProfileCard/ProfileCard';
import { CollectionCard } from '../../../components/CollectionCard/CollectionCard';

export const NavigationBar = (props) => {
  const location = useLocation();

  const user = useAuthStore((state) => state.user);

  const [searchInputValue, setSearchInputValue] = useState('');

  const getSearchResult = useQuery({
    queryKey: ['search results', searchInputValue],
    queryFn: () => searchService.searchResults(searchInputValue, null, location.pathname),
  });

  const searchInputRef = useRef(null);

  useClickOutside(searchInputRef, () => setSearchInputValue(''));

  const isProfile = matchPath('/profile/*', window.location.pathname);
  const isCollections = matchPath('/collections/*', window.location.pathname);

  return (
    <div className={styles.top_tools_wrap}>
      <div
        className={styles.top_tools}
        style={props.isHeaderHidden ? { transform: 'translateY(-5rem)' } : {}}
      >
        <div className={styles.header_wrap}>
          <div className={styles.buttons_wraper}>
            <NavLink
              to="/home"
              button-name-ru="Главная"
              className={({ isActive }) =>
                isActive ? styles.toptools__active_button : styles.toptools__button
              }
              onClick={() => setSearchInputValue('')}
            >
              {/* <GoHome className={styles.menu_ico}/> */}
              Главная
            </NavLink>

            <NavLink
              to="/bookmarks"
              button-name-ru="Закладки"
              className={({ isActive }) =>
                isActive ? styles.toptools__active_button : styles.toptools__button
              }
              onClick={() => setSearchInputValue('')}
            >
              {/* <IoBookmarkOutline className={styles.menu_ico}/> */}
              Закладки
            </NavLink>

            <NavLink
              to="/collections"
              button-name-ru="Коллекции"
              className={({ isActive }) =>
                isActive ? styles.toptools__active_button : styles.toptools__button
              }
              onClick={() => setSearchInputValue('')}
            >
              {/* <BsCollectionPlay className={styles.menu_ico}/> */}
              Коллекции
            </NavLink>

            <NavLink
              to="/feed"
              button-name-ru="Лента"
              className={({ isActive }) =>
                isActive ? styles.toptools__active_button : styles.toptools__button
              }
              onClick={() => setSearchInputValue('')}
            >
              {/* <BsWindow className={styles.menu_ico}/> */}
              Лента
            </NavLink>

            {/* <button onClick={() => {}} className={styles.toptools_search_button}>
                                <GoSearch className={styles.menu_ico}/>
                        </button> */}

            <div className={styles.serach_input_wrapper} ref={searchInputRef}>
              <input
                onChange={(el) => setSearchInputValue(el.currentTarget.value)}
                value={searchInputValue}
                type="search"
                placeholder="Поиск аниме"
                className={styles.toptools_search_input}
              />
              <GoSearch className={styles.menu_ico} />
            </div>

            <NavLink
              to={`/profile/${user.id}`}
              button-name-ru="Профиль"
              className={({ isActive }) =>
                isActive ? styles.toptools__active_button : styles.toptools__button
              }
              onClick={() => setSearchInputValue('')}
            >
              <img src={props.avatar} alt="" className={styles.nav_avatar} />

              {/* <div className={styles.profile_btn_context_menu}>
                                <Link to="/settings" button-name-ru="Настройки" className={ styles.toptools__button } onClick={() => setSearchInputValue('')}>
                                    <IoSettingsOutline className={styles.menu_ico}/>
                                </Link>
                                <Link to="/notifications" button-name-ru="Уведомления" className={ styles.toptools__button } onClick={() => setSearchInputValue('')}>
                                    <IoMdNotificationsOutline className={styles.menu_ico}/>
                                </Link>
                            </div> */}
            </NavLink>
          </div>
        </div>

        {searchInputValue !== '' && getSearchResult.data?.data && (
          <div ref={searchInputRef} className={styles.search_results_wrap}>
            <div className={styles.search_results}>
              <h2>Результаты поиска</h2>

              <div className={styles.results}>
                {isProfile
                  ? getSearchResult.data?.data.content.map(
                      (el) =>
                        el.id && (
                          <ProfileCard
                            key={el.id}
                            profile={el}
                            clickCallBack={setSearchInputValue}
                          />
                        )
                    )
                  : isCollections
                    ? getSearchResult.data?.data.content.map(
                        (el) =>
                          el.id && (
                            <CollectionCard
                              key={el.id}
                              collection={el}
                              clickCallBack={setSearchInputValue}
                            />
                          )
                      )
                    : getSearchResult.data?.data.content.map(
                        (el) =>
                          el.id && (
                            <ReleaseCard
                              key={el.id}
                              release={el}
                              clickCallBack={setSearchInputValue}
                            />
                          )
                      )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
