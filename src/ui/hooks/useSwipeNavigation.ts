import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SwipeNavigationOptions {
  edgeThreshold?: number;
  minDistance?: number;
  maxAngleDeg?: number;
  minDurationMs?: number;
  disabled?: boolean;
}

export function useSwipeNavigation(options: SwipeNavigationOptions = {}) {
  const {
    edgeThreshold = 24,
    minDistance = 120,
    maxAngleDeg = 25,
    minDurationMs = 120,
    disabled = false,
  } = options;

  const navigate = useNavigate();
  const location = useLocation();

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchStartTime, setTouchStartTime] = useState<number>(0);
  const [isTrackingSwipe, setIsTrackingSwipe] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile || disabled) return;

    const maxAngleTan = Math.tan((maxAngleDeg * Math.PI) / 180);

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
  }, [
    location.pathname,
    navigate,
    touchStartX,
    touchStartY,
    touchStartTime,
    isTrackingSwipe,
    edgeThreshold,
    maxAngleDeg,
    minDurationMs,
    disabled,
  ]);

  return { isTrackingSwipe };
}

