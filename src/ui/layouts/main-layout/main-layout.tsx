import { ReactNode, useEffect, useState } from "react"
import styles from './main-layout.module.css'
import { useLocation, useParams } from "react-router-dom";
import { Toolbar } from "../navigation/Toolbar/Toolbar";
import { NavigationBar } from "../navigation/NavigationBar/NavigationBar";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { useAuthStore } from "../../auth/store/authStore";

interface MainLayoutProps {
    children?: ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    
    const userStore = useAuthStore((state) => state);
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

    return (
        <div className='wrapper'>

            <NavigationBar isHeaderHidden={isHeaderHidden} avatar={userStore.user.avatar}/>

            { location.pathname === `/release/${params.releaseId}` && <Toolbar /> }
            { location.pathname === `/collection/${params.collectionId}` && <Toolbar /> }


            <div className={styles.content_wrap}>

            <div className={styles.content}>

                { children }
            </div>

            </div>

      </div>
    )
}