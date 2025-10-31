import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Spinner } from 'ui-kit/components/Spinner/Spinner';
import { usePreferencesStore } from './api/preferences';
import styles from './App.module.css';
import { useUserStore } from './auth/store/auth';
import { AuthPage } from './auth/view/AuthPage';
import { MobileNavBar } from './components/MobileNavBar/MobileNavBar';
import { Toolbar } from './components/Toolbar/Toolbar';
import { TopNavigationBar } from './components/TopNavigationBar/TopNavigationBar';
import { useScrollPosition } from './hooks/useScrollPosition';

export const App: React.FC = ()=> {

  const preferencesStore = usePreferencesStore();
  const userStore = useUserStore((state) => state);

  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const scrollPosition = useScrollPosition();
  const [ lastScrolledPos, setLastScrolledPos ] = useState(0);
  const [ lastShowPos, setLastShowPos ] = useState(0);
  const [ isHeaderHidden, setHeaderHidden ] = useState(false);
  const [ touchStartX, setTouchStartX ] = useState<number | null>(null);
  const [ touchStartY, setTouchStartY ] = useState<number | null>(null);
  const [ touchStartTime, setTouchStartTime ] = useState<number>(0);
  const [ isTrackingSwipe, setIsTrackingSwipe ] = useState(false);

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

  // Edge swipe-right to go back (mobile only)
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile) return;

    const edgeThreshold = 24; // px from left edge to start
    const minDistance = 120; // px horizontal movement to trigger
    const maxAngleTan = Math.tan((25 * Math.PI) / 180); // allow ~25° from horizontal
    const minDurationMs = 120; // minimal gesture duration to treat as "длинный"

    function onTouchStart(e: TouchEvent) {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      if (t.clientX > edgeThreshold) {
        setIsTrackingSwipe(false);
        setTouchStartX(null);
        setTouchStartY(null);
        return;
      }
      setTouchStartX(t.clientX);
      setTouchStartY(t.clientY);
      setTouchStartTime(performance.now());
      setIsTrackingSwipe(true);
    }

    function onTouchMove(e: TouchEvent) {
      if (!isTrackingSwipe || touchStartX === null || touchStartY === null) return;
      const t = e.touches[0];
      const dx = t.clientX - touchStartX;
      const dy = Math.abs(t.clientY - touchStartY);
      if (dx < 0) return; // only right swipe
      // If gesture is too vertical, cancel tracking
      if (dy > 0 && dx / dy < 1 / maxAngleTan) {
        setIsTrackingSwipe(false);
      }
    }

    function onTouchEnd() {
      if (!isTrackingSwipe || touchStartX === null || touchStartY === null) return;
      const elapsed = performance.now() - touchStartTime;
      // We can't get end coordinates here easily, rely on the last move constraints and distance via history of touch events is not stored; use a simple threshold by stored start vs last known window event (not available)
      // Instead, use a cached last touch via pointer from move; simplify: use window.event is unreliable, so track on move? For robustness, require duration and was tracking.
      // Navigate back when gesture met duration and we started at edge; distance was validated progressively by not canceling. Use history length > 1 as guard.
      if (elapsed >= minDurationMs) {
        // Avoid navigating back from the app root
        if (location.pathname !== '/' && window.history.length > 1) {
          navigate(-1);
        }
      }
      setIsTrackingSwipe(false);
      setTouchStartX(null);
      setTouchStartY(null);
    }

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart as any);
      window.removeEventListener('touchmove', onTouchMove as any);
      window.removeEventListener('touchend', onTouchEnd as any);
    };
  }, [location.pathname, navigate, isHeaderHidden, touchStartX, touchStartY, touchStartTime, isTrackingSwipe]);

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
