import React, { useEffect, useState } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import styles from './Lightbox.module.css';
import Portal from '../Portal/Portal';

export interface LightboxProps {
  open: boolean;
  onClose: () => void;
  src?: string; // single image source (legacy support)
  alt?: string;
  children?: React.ReactNode; // custom content (e.g., iframe video)
  images?: string[]; // array of image URLs for gallery
  initialIndex?: number; // starting index in gallery
}

export const Lightbox: React.FC<LightboxProps> = ({ 
  open, 
  onClose, 
  src, 
  alt, 
  children,
  images,
  initialIndex = 0
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // Use images array if provided, otherwise fallback to single src
  const imageList = images || (src ? [src] : []);
  const hasMultipleImages = imageList.length > 1;
  
  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;
  
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, open]);
  
  useEffect(() => {
    if (!open) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasMultipleImages) {
        goToPrevious();
      } else if (e.key === 'ArrowRight' && hasMultipleImages) {
        goToNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, hasMultipleImages, currentIndex]);
  
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % imageList.length);
  };
  
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };
  
  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || !hasMultipleImages) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };
  
  if (!open) return null;
  
  const currentSrc = imageList[currentIndex];
  
  return (
    <Portal>
      <div className={styles.backdrop} onClick={onClose}>
        <div className={styles.center}>
          <div 
            className={styles.box} 
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {children ? (
              children
            ) : (
              <>
                <img className={styles.image} src={currentSrc} alt={alt || `Image ${currentIndex + 1}`} />
                
                {/* Navigation zones (VK style - invisible click areas) */}
                {hasMultipleImages && (
                  <>
                    <div 
                      className={`${styles.nav_zone} ${styles.nav_zone_prev}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        goToPrevious();
                      }}
                      aria-label="Previous image"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          goToPrevious();
                        }
                      }}
                    />
                    
                    <div 
                      className={`${styles.nav_zone} ${styles.nav_zone_next}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        goToNext();
                      }}
                      aria-label="Next image"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          goToNext();
                        }
                      }}
                    />
                    
                    {/* Counter */}
                    <div className={styles.counter}>
                      {currentIndex + 1} / {imageList.length}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
};


