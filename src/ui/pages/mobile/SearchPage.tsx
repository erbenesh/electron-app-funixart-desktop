import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useUserStore } from '#/auth/store/auth';
import { useSearchReleasesInfinite, useSearchResults } from '#/api/hooks/useSearch';
import { Page } from 'ui-kit/components/Page/Page';
import { Container } from 'ui-kit/components/Container/Container';
import { Title } from 'ui-kit';
import { Spinner } from 'ui-kit/components/Spinner/Spinner';
import { ReleaseCard } from '#/components/ReleaseCard/ReleaseCard';

export default function SearchPage() {
  const token = useUserStore((s) => s.token);
  const [params] = useSearchParams();
  const query = (params.get('q') || '').trim();

  const isEnabled = Boolean(token && query);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 768px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);
  const {
    data,
    isPending,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useSearchReleasesInfinite({ token, query });

  // Fallback to legacy search results if releases are empty (different API shape)
  const legacy = useSearchResults({ token, query, searchBy: null, location: '/search' });

  const releases = useMemo(() => {
    const v1 = data?.pages || [];
    if (v1.length > 0) return v1;
    const v2 = (legacy.data as any)?.data?.content || [];
    return Array.isArray(v2) ? v2 : [];
  }, [data, legacy.data]);

  // Use IntersectionObserver to avoid multiple fetches on scroll
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!isEnabled) return;
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    }, { root: null, rootMargin: '300px 0px', threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [isEnabled, hasNextPage, isFetchingNextPage, fetchNextPage, releases.length]);

  useEffect(() => {
    function onScroll() {
      if (!hasNextPage || isFetchingNextPage) return;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const viewport = window.innerHeight;
      const full = document.documentElement.scrollHeight;
      if (scrollY + viewport + 300 >= full) {
        fetchNextPage();
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll as any);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const hasResults = (releases?.length || 0) > 0;

  return (
    <Page topOffset="md">
      <Container>
        <section>
          <Title level={2}>Поиск</Title>
          {!isEnabled && <div>Введите запрос</div>}
          {isEnabled && isPending && (
            <div style={{ minHeight: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Spinner />
            </div>
          )}
          {isEnabled && !isPending && hasResults && (
            <div style={{ display: 'grid', gap: isMobile ? '0.5rem' : '0.75rem', gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat( auto-fill, minmax(14rem, 1fr) )' }}>
              {releases.map((el: any) => el?.id ? <ReleaseCard key={el.id} release={el} /> : null)}
              <div ref={sentinelRef} />
            </div>
          )}
          {isEnabled && !isPending && !hasResults && (
            <div style={{ padding: '1rem 0', color: 'rgb(178,186,194)' }}>Ничего не найдено</div>
          )}
          {isFetchingNextPage && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
              <Spinner />
            </div>
          )}
        </section>
      </Container>
    </Page>
  );
}


