import { TopNavigationBar } from './components/TopNavigationBar/TopNavigationBar';
import styles from './App.module.css'
import { useEffect, useState } from 'react';
import { AuthPage } from './pages/Auth/AuthPage';
import { useUserStore } from './services/api/auth';
import { usePreferencesStore } from './services/api/preferences';
import { useScrollPosition } from './hooks/useScrollPosition';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { Toolbar } from './components/Toolbar/Toolbar';

export const App: React.FC = ()=> {

  const preferencesStore = usePreferencesStore();
  const userStore = useUserStore((state) => state);

  const location = useLocation();
  const params = useParams();

  const scrollPosition = useScrollPosition();
  const [ lastScrolledPos, setLastScrolledPos ] = useState(0);
  const [ lastShowPos, setLastShowPos ] = useState(0);
  const [ isHeaderHidden, setHeaderHidden ] = useState(false);

  useEffect(() => {
    if (scrollPosition > 1 && scrollPosition > lastScrolledPos) {
      setLastShowPos(scrollPosition);
      setHeaderHidden(true);
    } else if (scrollPosition <= Math.max(lastShowPos - 2, 0)) {
      setHeaderHidden(false);
    }
    
    setLastScrolledPos(scrollPosition);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollPosition]);

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

        <TopNavigationBar isHeaderHidden={isHeaderHidden} avatar={userStore.user.avatar}/>

        { location.pathname === `/release/${params.releaseId}` && <Toolbar /> }
        { location.pathname === `/collection/${params.collectionId}` && <Toolbar /> }


        <div className={styles.content_wrap}>

          <div className={styles.content}>
            <Outlet context={[isHeaderHidden]}/>
          </div>

        </div>

      </div>
  )
}
