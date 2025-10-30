import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react'
import styles from './Carousel.module.css'

export type CarouselProps = {
  className?: string
  /** Show navigation arrows */
  showArrows?: boolean
  /** Show pagination dots */
  showDots?: boolean
  /** Gap between items in pixels (fallback to CSS var) */
  gap?: number
  /** Scroll by viewport width multiplier (0..1) */
  scrollStep?: number
  /** Optional aria-label for accessibility */
  ariaLabel?: string
}

export function Carousel(props: PropsWithChildren<CarouselProps>) {
  const { className, children, showArrows = true, showDots = false, gap, scrollStep = 0.9, ariaLabel } = props
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const [progress, setProgress] = useState(0)
  const items = useMemo(() => (Array.isArray(children) ? children : [children]).filter(Boolean), [children])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const update = () => {
      setCanPrev(viewport.scrollLeft > 0)
      setCanNext(viewport.scrollLeft + viewport.clientWidth < viewport.scrollWidth - 1)
      const denom = Math.max(1, viewport.scrollWidth - viewport.clientWidth)
      setProgress(viewport.scrollLeft / denom)
    }
    update()
    viewport.addEventListener('scroll', update)
    window.addEventListener('resize', update)
    return () => {
      viewport.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [items.length])

  const scrollBy = (dir: -1 | 1) => {
    const viewport = viewportRef.current
    if (!viewport) return
    const delta = Math.max(1, Math.round(viewport.clientWidth * scrollStep)) * dir
    viewport.scrollBy({ left: delta, behavior: 'smooth' })
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); scrollBy(-1) }
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollBy(1) }
  }

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      aria-label={ariaLabel || 'Карусель'}
      role="region"
      onKeyDown={onKeyDown}
    >
      {showArrows && (
        <button
          className={styles.navBtn + ' ' + styles.left}
          onClick={() => scrollBy(-1)}
          aria-label="Предыдущие"
          disabled={!canPrev}
        >
          ‹
        </button>
      )}
      <div ref={viewportRef} className={styles.viewport}>
        <div className={styles.track} style={gap ? { columnGap: gap } : undefined}>
          {items.map((child, i) => (
            <div className={styles.item} key={i}>
              {child}
            </div>
          ))}
        </div>
      </div>
      {showArrows && (
        <button
          className={styles.navBtn + ' ' + styles.right}
          onClick={() => scrollBy(1)}
          aria-label="Следующие"
          disabled={!canNext}
        >
          ›
        </button>
      )}
      {showDots && (
        <div className={styles.dots} aria-hidden>
          <div className={styles.progress} style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>
      )}
    </div>
  )
}

export default Carousel


