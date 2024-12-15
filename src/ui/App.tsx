import { TopNavigationBar } from './components/TopNavigationBar/TopNavigationBar';
import styles from './App.module.css'
import { Home } from './pages/Home/Home';
import { useEffect, useState } from 'react';
import { ReleasePage } from './pages/ReleasePage/ReleasePage';
import { Discover } from './pages/Discover/Discover';
import { Profile } from './pages/Profile/Profile';
import { AuthPage } from './pages/Auth/AuthPage';
import { useUserStore } from './services/auth';
import { usePreferencesStore } from './services/preferences';
import { Bookmarks } from './pages/Bookmarks/Bookmarks';
import { useScrollPosition } from './hooks/useScrollPosition';

function App() {

  const preferencesStore = usePreferencesStore();
  const userStore = useUserStore((state) => state);

  const scrollPosition = useScrollPosition();
  const [ lastScrolledPos, setLastScrolledPos ] = useState(0);
  const [ lastShowPos, setLastShowPos ] = useState(0);
  const [ isHeaderHidden, setHeaderHidden ] = useState(false);

  useEffect(() => {
    if (scrollPosition > 2 && scrollPosition > lastScrolledPos) {
      setLastShowPos(scrollPosition);
      setHeaderHidden(true);
    } else if (scrollPosition <= Math.max(lastShowPos - 2, 0)) {
      setHeaderHidden(false);
    }
    
    setLastScrolledPos(scrollPosition);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollPosition]);

  // console.log("SCROLL", scrollPosition, lastScrolledPos, lastShowPos);

  const [ currentPage, setCurrentPage ] = useState("home");

  const [ currentChoosenRelease, setCurrentChoosenRelease ] = useState(null);

  const setNextCurrentPage = (page: string) => {
    setCurrentPage(page);
    if (currentChoosenRelease !== null) {
      setCurrentChoosenRelease(null);
    }
  }

  useEffect(() => {
    if (preferencesStore._hasHydrated) {
      userStore.checkAuth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferencesStore._hasHydrated]);

  if (!preferencesStore._hasHydrated && !userStore._hasHydrated || userStore.state === "loading") {
    return (
        <div className="loader-container">	
          <i className="loader-circle"></i>
        </div>
    );
  }

  if ( !userStore.isAuth ) {
      return(
        <div className='wrapper'>
          <AuthPage />
        </div>
      )
  }

  return (
      <div className='wrapper'>

        <TopNavigationBar currentPage={currentPage} setNextCurrentPage={setNextCurrentPage} isHeaderHidden={isHeaderHidden}/>

        <div className={styles.content_wrap}>

          <div className={styles.content}>

            { currentChoosenRelease !== null && <ReleasePage currentChoosenRelease={currentChoosenRelease} setCurrentChoosenRelease={setCurrentChoosenRelease}/> }

            { currentChoosenRelease === null && currentPage === "home" ? <Home setCurrentChoosenRelease={setCurrentChoosenRelease} isHeaderHidden={isHeaderHidden}/>
              : currentChoosenRelease === null && currentPage === "discover" ? <Discover setCurrentChoosenRelease={setCurrentChoosenRelease}/> 
              : currentChoosenRelease === null && currentPage === "bookmarks" ? <Bookmarks setCurrentChoosenRelease={setCurrentChoosenRelease} isHeaderHidden={isHeaderHidden}/> 
              : currentChoosenRelease === null && currentPage === "profile" ? <Profile setCurrentChoosenRelease={setCurrentChoosenRelease} id={userStore.user.id}/> 
              : currentChoosenRelease === null && currentPage === "settings" && <Discover setCurrentChoosenRelease={setCurrentChoosenRelease}/> 
            }
            
          </div>

        </div>

      </div>
  )
}

export default App
