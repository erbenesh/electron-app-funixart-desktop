import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react'
import styles from './Carousel.module.css'

export type CarouselProps = {
  className?: string
  showArrows?: boolean
  showDots?: boolean
  gap?: number
  /** Gap on mobile (<=768px), px. Defaults to gap */
  mobileGap?: number
  ariaLabel?: string
  mobilePeek?: number
  desktopColumns?: number
  autoplayMs?: number
}

export function Carousel(props: PropsWithChildren<CarouselProps>) {
  const { className, children, showArrows = true, showDots = false, gap = 12, mobileGap, ariaLabel, mobilePeek = 0.04, desktopColumns = 3, autoplayMs = 0 } = props

  const viewportRef = useRef<HTMLDivElement | null>(null)
  const items = useMemo(() => (Array.isArray(children) ? children : [children]).filter(Boolean), [children])

  const [cols, setCols] = useState(3)
  const [pageIndex, setPageIndex] = useState(0)
  const [maxPage, setMaxPage] = useState(0)

  // Recalculate columns and pages on resize or items change
  useEffect(() => {
    const compute = () => {
      const isDesktop = window.innerWidth >= 769
      const c = isDesktop ? desktopColumns : 1
      setCols(c)
      const pages = Math.max(0, Math.ceil(items.length / c) - 1)
      setMaxPage(pages)
      setPageIndex((prev) => Math.min(prev, pages))
      // align to page start after layout changes
      requestAnimationFrame(() => scrollToPage(0))
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [items.length, desktopColumns])

  // Autoplay by page
  useEffect(() => {
    if (!autoplayMs) return
    const id = setInterval(() => go(1), autoplayMs)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplayMs, cols, maxPage])

  const getStep = () => {
    const viewport = viewportRef.current
    if (!viewport) return
    const isDesktop = window.innerWidth >= 769
    return isDesktop ? viewport.clientWidth : Math.round(viewport.clientWidth * (1 - mobilePeek))
  }

  const scrollToPage = (index: number) => {
    const viewport = viewportRef.current
    if (!viewport) return
    const step = getStep() || 0
    const clamped = Math.min(Math.max(0, index), maxPage)
    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth)
    const target = Math.min(maxScroll, Math.round(clamped * step))
    viewport.scrollTo({ left: target, behavior: 'smooth' })
  }

  const go = (dir: -1 | 1) => {
    const next = Math.min(Math.max(0, pageIndex + dir), maxPage)
    setPageIndex(next)
    scrollToPage(next)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
  }

  const canPrev = pageIndex > 0
  const canNext = pageIndex < maxPage

  // Keep page index in sync when пользователь скроллит вручную колесом/тачпадом
  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const onScroll = () => {
      const step = getStep() || 1
      const idx = Math.round(viewport.scrollLeft / step)
      if (idx !== pageIndex) setPageIndex(Math.min(Math.max(0, idx), maxPage))
    }
    viewport.addEventListener('scroll', onScroll, { passive: true })
    return () => viewport.removeEventListener('scroll', onScroll)
  }, [pageIndex, maxPage, cols])

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
          onClick={() => go(-1)}
          aria-label="Предыдущие"
          disabled={!canPrev}
        >
          ‹
        </button>
      )}
      <div ref={viewportRef} className={styles.viewport}>
        <div
          className={styles.track}
          style={{
            ['--gap' as any]: gap + 'px',
            ['--gapM' as any]: (mobileGap ?? gap) + 'px',
            ['--cols' as any]: String(cols),
            ['--peek' as any]: Math.round(mobilePeek * 100) + '%',
          }}
        >
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
          onClick={() => go(1)}
          aria-label="Следующие"
          disabled={!canNext}
        >
          ›
        </button>
      )}
      {showDots && (
        <div className={styles.dots} aria-hidden>
          <div className={styles.progress} style={{ width: `${Math.round(((pageIndex) / Math.max(1, maxPage)) * 100)}%` }} />
        </div>
      )}
    </div>
  )
}

export default Carousel


