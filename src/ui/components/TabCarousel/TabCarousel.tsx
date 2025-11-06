import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import styles from './TabCarousel.module.css';

interface TabCarouselProps {
    tabs: Array<{
        id: string | number;
        content: ReactElement;
    }>;
    activeIndex: number;
    onChange: (index: number) => void;
}

export const TabCarousel: React.FC<TabCarouselProps> = ({ tabs, activeIndex, onChange }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [transitioning, setTransitioning] = useState(false);
    
    // Use refs to avoid stale closures
    const touchStartRef = useRef({ x: 0, y: 0 });
    const isHorizontalRef = useRef(false);

    const resetDrag = useCallback(() => {
        setDragOffset(0);
        setIsDragging(false);
        isHorizontalRef.current = false;
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (!isMobile) return;

        let rafId: number | null = null;

        const handleTouchStart = (e: TouchEvent) => {
            if (transitioning) return;
            
            const touch = e.touches[0];
            const target = e.target as HTMLElement;
            
            // Check if touch started inside a horizontally scrollable element (like channels)
            const isInsideScrollable = target.closest('.feed_channels');
            
            // Don't handle if inside scrollable element
            if (isInsideScrollable) {
                return;
            }
            
            touchStartRef.current = { x: touch.clientX, y: touch.clientY };
            isHorizontalRef.current = false;
            setDragOffset(0);
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (transitioning) return;
            
            const touch = e.touches[0];
            const deltaX = touch.clientX - touchStartRef.current.x;
            const deltaY = touch.clientY - touchStartRef.current.y;
            const absDeltaX = Math.abs(deltaX);
            const absDeltaY = Math.abs(deltaY);

            // Determine horizontal swipe with stricter conditions
            if (!isHorizontalRef.current && (absDeltaX > 15 || absDeltaY > 15)) {
                // Only allow horizontal swipe if:
                // 1. Horizontal movement is significantly more than vertical
                // 2. Not starting from very edge (for Telegram gestures)
                if (absDeltaX > absDeltaY * 1.5 && 
                    touchStartRef.current.x > 60 && 
                    touchStartRef.current.x < window.innerWidth - 60) {
                    isHorizontalRef.current = true;
                    setIsDragging(true);
                } else if (absDeltaY > absDeltaX * 1.2) {
                    // Vertical scroll detected - do not interfere
                    return;
                }
            }

            if (isHorizontalRef.current) {
                // Prevent default only after confirming horizontal swipe
                e.preventDefault();
                e.stopPropagation();
                
                // Apply edge resistance
                let limitedDeltaX = deltaX;
                
                if (activeIndex === 0 && deltaX > 0) {
                    // First tab, swiping right - resistance
                    limitedDeltaX = Math.log(Math.abs(deltaX) + 1) * 30;
                } else if (activeIndex === tabs.length - 1 && deltaX < 0) {
                    // Last tab, swiping left - resistance
                    limitedDeltaX = -Math.log(Math.abs(deltaX) + 1) * 30;
                }

                if (rafId) cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(() => {
                    setDragOffset(limitedDeltaX);
                });
            }
        };

        const handleTouchEnd = () => {
            if (rafId) cancelAnimationFrame(rafId);

            if (!isHorizontalRef.current || !isDragging) {
                resetDrag();
                return;
            }

            const threshold = window.innerWidth * 0.25;
            let newIndex = activeIndex;

            if (Math.abs(dragOffset) > threshold) {
                if (dragOffset > 0 && activeIndex > 0) {
                    newIndex = activeIndex - 1;
                } else if (dragOffset < 0 && activeIndex < tabs.length - 1) {
                    newIndex = activeIndex + 1;
                }
            }

            setTransitioning(true);
            resetDrag();
            
            if (newIndex !== activeIndex) {
                onChange(newIndex);
            }
            
            setTimeout(() => setTransitioning(false), 300);
        };

        container.addEventListener('touchstart', handleTouchStart, { passive: true });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        container.addEventListener('touchend', handleTouchEnd, { passive: true });
        container.addEventListener('touchcancel', handleTouchEnd, { passive: true });

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            container.removeEventListener('touchstart', handleTouchStart as any);
            container.removeEventListener('touchmove', handleTouchMove as any);
            container.removeEventListener('touchend', handleTouchEnd as any);
            container.removeEventListener('touchcancel', handleTouchEnd as any);
        };
    }, [activeIndex, tabs.length, onChange, transitioning, isDragging, dragOffset, resetDrag]);

    // Calculate transform based on active index and drag
    const baseOffset = -activeIndex * 100; // Each tab is 100% width
    const dragOffsetPercent = isDragging 
        ? (dragOffset / window.innerWidth) * 100 
        : 0;
    
    const totalOffset = baseOffset + dragOffsetPercent;
    
    const transform = `translateX(${totalOffset}%)`;
    const transition = isDragging
        ? 'none' 
        : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

    return (
        <div className={styles.carousel_viewport} ref={containerRef}>
            <div 
                className={styles.carousel_track}
                style={{
                    transform,
                    transition,
                }}
            >
                {tabs.map((tab, index) => (
                    <div 
                        key={tab.id}
                        className={styles.carousel_slide}
                        style={{
                            // Optimize: only render nearby slides
                            visibility: Math.abs(index - activeIndex) <= 1 ? 'visible' : 'hidden',
                        }}
                    >
                        {/* Always render active and adjacent tabs for smooth transitions */}
                        {Math.abs(index - activeIndex) <= 1 && tab.content}
                    </div>
                ))}
            </div>
        </div>
    );
};

