import { useOutletContext, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import styles from './TopFilterButtons.module.css';
import { FilterButton } from '../FilterButton/FilterButton';

interface FilterButtonData {
    id: string | number;
    link: string;
    [key: string]: any;
}

interface TopFilterButtonsProps {
    buttonsArray: FilterButtonData[];
}

export const TopFilterButtons = ({ buttonsArray }: TopFilterButtonsProps) => {
    const [isHeaderHidden] = useOutletContext<[boolean]>();
    const location = useLocation();
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef<number>(0);
    const touchStartY = useRef<number>(0);
    const isSwiping = useRef<boolean>(false);

    // Find current tab index
    const currentIndex = buttonsArray.findIndex(btn => btn.link === location.pathname);

    // Auto-scroll active button into view
    useEffect(() => {
        if (containerRef.current && currentIndex >= 0) {
            const activeButton = containerRef.current.children[currentIndex] as HTMLElement;
            if (activeButton) {
                activeButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, [currentIndex]);

    // Swipe navigation (mobile only)
    useEffect(() => {
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (!isMobile) return;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartX.current = e.touches[0].clientX;
            touchStartY.current = e.touches[0].clientY;
            isSwiping.current = false;
        };

        const handleTouchMove = (e: TouchEvent) => {
            const deltaX = e.touches[0].clientX - touchStartX.current;
            const deltaY = Math.abs(e.touches[0].clientY - touchStartY.current);
            const absDeltaX = Math.abs(deltaX);
            
            // Determine if horizontal swipe (not from left edge - that's for back navigation)
            if (absDeltaX > 20 && absDeltaX > deltaY * 1.5 && touchStartX.current > 50) {
                isSwiping.current = true;
            }
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (!isSwiping.current) return;
            
            const deltaX = e.changedTouches[0].clientX - touchStartX.current;
            const minSwipeDistance = 80;

            if (Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0 && currentIndex > 0) {
                    // Swipe right -> previous tab
                    navigate(buttonsArray[currentIndex - 1].link);
                } else if (deltaX < 0 && currentIndex < buttonsArray.length - 1) {
                    // Swipe left -> next tab
                    navigate(buttonsArray[currentIndex + 1].link);
                }
            }
            
            isSwiping.current = false;
        };

        const contentArea = document.querySelector('.content') || document.body;
        contentArea.addEventListener('touchstart', handleTouchStart, { passive: true });
        contentArea.addEventListener('touchmove', handleTouchMove, { passive: true });
        contentArea.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            contentArea.removeEventListener('touchstart', handleTouchStart as any);
            contentArea.removeEventListener('touchmove', handleTouchMove as any);
            contentArea.removeEventListener('touchend', handleTouchEnd as any);
        };
    }, [currentIndex, buttonsArray, navigate]);

    return (
        <div className={styles.bookmarks_nav_buttons_wrap}>
            <div 
                className={styles.bookmarks_nav_buttons_fixed} 
                style={isHeaderHidden ? { transform: "translateY(calc(-1 * var(--header-height)))" } : {}}
            >
                <div className={styles.buttons_container} ref={containerRef}>
                    {buttonsArray.map(button => 
                        <FilterButton key={button.id} button={button} />
                    )}
                </div>
            </div>
        </div>
    );
}