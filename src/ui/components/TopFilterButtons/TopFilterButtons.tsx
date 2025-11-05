import { useOutletContext, useLocation } from 'react-router-dom';
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
    const containerRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);

    // Find current tab index
    const currentIndex = buttonsArray.findIndex(btn => btn.link === location.pathname);

    // Update sliding indicator position
    useEffect(() => {
        const updateIndicator = () => {
            if (containerRef.current && indicatorRef.current && currentIndex >= 0) {
                const buttons = containerRef.current.querySelectorAll('a');
                const activeButton = buttons[currentIndex];
                
                if (activeButton) {
                    const buttonElement = activeButton.querySelector('button');
                    if (buttonElement) {
                        const buttonRect = buttonElement.getBoundingClientRect();
                        const containerRect = containerRef.current.getBoundingClientRect();
                        const left = buttonRect.left - containerRect.left + containerRef.current.scrollLeft;
                        const width = buttonRect.width;
                        
                        // Center the indicator under the button
                        indicatorRef.current.style.transform = `translateX(${left + width * 0.2}px)`;
                        indicatorRef.current.style.width = `${width * 0.6}px`;
                        indicatorRef.current.style.opacity = '1';
                    }
                }
            }
        };

        updateIndicator();
        
        // Re-calculate on window resize
        window.addEventListener('resize', updateIndicator);
        
        // Re-calculate after a short delay to ensure DOM is ready
        const timer = setTimeout(updateIndicator, 100);
        
        return () => {
            window.removeEventListener('resize', updateIndicator);
            clearTimeout(timer);
        };
    }, [currentIndex]);

    // Auto-scroll active button into view
    useEffect(() => {
        if (containerRef.current && currentIndex >= 0) {
            const activeButton = containerRef.current.children[currentIndex] as HTMLElement;
            if (activeButton) {
                activeButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, [currentIndex]);

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
                    {/* Sliding indicator */}
                    <div className={styles.sliding_indicator} ref={indicatorRef} />
                </div>
            </div>
        </div>
    );
}