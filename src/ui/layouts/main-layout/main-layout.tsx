import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import styles from './main-layout.module.css'
import { useLocation, useParams } from "react-router-dom";
import { Toolbar } from "../navigation/Toolbar/Toolbar";
import { NavigationBar } from "../navigation/NavigationBar/NavigationBar";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { useAuthStore } from "../../auth/store/authStore";
import { useScrollToTop } from "./hooks/useScrollToTop ";

interface MainLayoutProps {
    children?: ReactNode
}

type RouteContextType = {
  isHeaderHidden: boolean
};

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const user = useAuthStore((state) => state.user);
    const token = useAuthStore((state) => state.token);
    const location = useLocation();
    const params = useParams();

    const { checkAuth } = useAuthStore();

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
      checkAuth(); // Проверяем токен при каждом переходе
    }, [])

    useScrollToTop([location]);

    return (
    <RouteContext.Provider value={{isHeaderHidden}}>
      <div className='wrapper'>

          { token && <NavigationBar isHeaderHidden={isHeaderHidden} avatar={user.avatar}/> }

          { location.pathname === `/release/${params.releaseId}` && <Toolbar /> }
          { location.pathname === `/collection/${params.collectionId}` && <Toolbar /> }


          <div className={styles.content_wrap}>

            <div className={styles.content}>
              { children }
            </div>

          </div>

      </div>
    </RouteContext.Provider>
    )
}

// Хук для удобного использования контекста
export function useRouteContext() {
  const context = useContext(RouteContext);
  if (context === undefined) {
    throw new Error('useRouteContext must be used within a RouteProvider');
  }
  return context;
}