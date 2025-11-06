import { useEffect } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { Spinner } from 'ui-kit/components/Spinner/Spinner';
import { usePreferencesStore } from './api/preferences';
import styles from './App.module.css';
import { useUserStore } from './auth/store/auth';
import { AuthPage } from './auth/view/AuthPage';
import { MobileNavBar } from './components/MobileNavBar/MobileNavBar';
import { Toolbar } from './components/Toolbar/Toolbar';
import { TopNavigationBar } from './components/TopNavigationBar/TopNavigationBar';
import { useHeaderVisibility } from './hooks/useHeaderVisibility';
import { useSwipeNavigation } from './hooks/useSwipeNavigation';

export const App: React.FC = ()=> {

  const preferencesStore = usePreferencesStore();
  const userStore = useUserStore((state) => state);

  const location = useLocation();
  const params = useParams();

  // Use custom hooks for complex logic
  const { isHeaderHidden } = useHeaderVisibility();
  useSwipeNavigation();

  useEffect(() => {
    if (preferencesStore._hasHydrated) {
      userStore.checkAuth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferencesStore._hasHydrated]);

  if (!preferencesStore._hasHydrated && !userStore._hasHydrated || userStore.state === "loading") {
    return (
        <div className="loader-container">
          <Spinner />
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
        { location.pathname === `/release/${params.releaseId}/videos` && <Toolbar /> }
        { location.pathname === `/collection/${params.collectionId}` && <Toolbar /> }


        <div className={styles.content_wrap}>

          <div className={styles.content}>
            <Outlet context={[isHeaderHidden]}/>
          </div>

        </div>

        <MobileNavBar />

      </div>
  )
}
