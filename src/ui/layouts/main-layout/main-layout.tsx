import styles from './main-layout.module.css';

import type { ReactNode } from 'react';

import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect, useContext, createContext } from 'react';

import { Toolbar } from '../navigation/Toolbar/Toolbar';
import { useScrollToTop } from './hooks/useScrollToTop ';
import { useAuthStore } from '../../auth/store/authStore';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { NavigationBar } from '../navigation/NavigationBar/NavigationBar';

interface MainLayoutProps {
  children?: ReactNode;
}

type RouteContextType = {
  isHeaderHidden: boolean;
};

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const location = useLocation();
  const params = useParams();

  const { checkAuth } = useAuthStore();

  const scrollPosition = useScrollPosition();
  const [lastScrolledPos, setLastScrolledPos] = useState(0);
  const [lastShowPos, setLastShowPos] = useState(0);
  const [isHeaderHidden, setHeaderHidden] = useState(false);

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
    checkAuth(); // Проверяем токен при каждом переходе
  }, []);

  useScrollToTop([location]);

  return (
    <RouteContext.Provider value={{ isHeaderHidden }}>
      <div className="wrapper">
        {token && <NavigationBar isHeaderHidden={isHeaderHidden} avatar={user.avatar} />}

        {location.pathname === `/release/${params.releaseId}` && <Toolbar />}
        {location.pathname === `/collection/${params.collectionId}` && <Toolbar />}

        <div className={styles.content_wrap}>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </RouteContext.Provider>
  );
};

// Хук для удобного использования контекста
export function useRouteContext() {
  const context = useContext(RouteContext);
  if (context === undefined) {
    throw new Error('useRouteContext must be used within a RouteProvider');
  }
  return context;
}
