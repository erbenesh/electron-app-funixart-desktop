
import { useEffect, useRef } from 'react';
import styles from './NavigationTopButtons.module.css';
import { SegmentedControl } from 'ui-kit/components/SegmentedControl/SegmentedControl';

const SectionTitleMapping = {
    last: "Последнее",
    finished: "Завершенные",
    ongoing: "Онгоинги",
    announce: "Анонсы",
    films: "Фильмы",
};

const sections = ['last', 'ongoing', 'announce', 'finished', 'films'];

interface NavigationTopButtonsProps {
    isHeaderHidden: boolean;
    currentSection: string;
    setCurrentSection: (section: string) => void;
}

export const NavigationTopButtons = ({ 
    isHeaderHidden, 
    currentSection, 
    setCurrentSection 
}: NavigationTopButtonsProps) => {
    const touchStartX = useRef<number>(0);
    const touchStartY = useRef<number>(0);
    const isSwiping = useRef<boolean>(false);

    const currentIndex = sections.indexOf(currentSection);

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
            
            // Horizontal swipe (not from left edge)
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
                    setCurrentSection(sections[currentIndex - 1]);
                } else if (deltaX < 0 && currentIndex < sections.length - 1) {
                    // Swipe left -> next tab
                    setCurrentSection(sections[currentIndex + 1]);
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
    }, [currentIndex, setCurrentSection]);

    return (
        <div className={styles.buttons_empty_wrap}>
            <div 
                className={styles.buttons_bg_wrap} 
                style={isHeaderHidden ? { transform: "translateY(calc(-1 * (var(--header-height) + 4rem)))" } : {}}
            >
                <div className={styles.buttons_list}>
                    <SegmentedControl
                        items={[
                            { key: 'last', label: SectionTitleMapping.last },
                            { key: 'ongoing', label: SectionTitleMapping.ongoing },
                            { key: 'announce', label: SectionTitleMapping.announce },
                            { key: 'finished', label: SectionTitleMapping.finished },
                            { key: 'films', label: SectionTitleMapping.films },
                        ]}
                        value={currentSection}
                        onChange={setCurrentSection}
                    />
                </div>
            </div>
        </div>
    );
}