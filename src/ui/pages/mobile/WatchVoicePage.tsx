import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useUserStore } from '#/auth/store/auth';
import { useGetEpisodes, useGetEpisodeSources } from '#/api/hooks/usePlayer';

export const WatchVoicePage: React.FC = () => {
  const { releaseId } = useParams();
  const [params] = useSearchParams();
  const typeId = params.get('type');
  const initialSourceId = params.get('source');
  const token = useUserStore((s) => s.token);
  // Подтягиваем список источников для выбранного типа, чтобы валидировать source
  const { data: sourcesData, isPending: isSourcesPending } = useGetEpisodeSources(releaseId!, typeId, token);
  const [sourceId, setSourceId] = useState<string | number | null>(initialSourceId);

  useEffect(() => {
    const list = sourcesData?.sources ?? [];
    if (!list.length) return;
    const exists = list.some((s: any) => String(s.id) === String(initialSourceId));
    setSourceId(exists ? initialSourceId : list[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourcesData]);

  // Здесь выбираем серию
  const { data, isPending } = useGetEpisodes(releaseId!, typeId, sourceId, token);
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const eps = data?.episodes ?? [];
    if (eps.length) setSelected(0);
  }, [data]);

  if (!typeId) return null;
  if (isSourcesPending || !sourceId || isPending) return <div className="loader-container"><i className="loader-circle"/></div>;

  const episodes = data?.episodes ?? [];

  return (
    <div className="wrapper" style={{ paddingTop: 'var(--header-height)' }}>
      <h2 style={{ padding: '0.75rem 1rem' }}>Выберите серию</h2>
      <div style={{ display: 'grid', gap: '0.5rem', padding: '0 1rem' }}>
        {episodes.map((e: any, idx: number) => (
          <button
            key={e.id ?? idx}
            onClick={() => navigate(`/release/${releaseId}/watch/play?type=${typeId}&source=${sourceId}&episode=${idx}`)}
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              border: '1px solid #4a4a4a',
              background: 'rgba(36,36,36,0.8)',
              color: 'var(--color-text)'
            }}
          >{e.title ?? e.name ?? `${idx + 1} серия`}</button>
        ))}
      </div>
    </div>
  );
}


