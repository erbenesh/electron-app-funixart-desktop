import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserStore } from '#/auth/store/auth';
import { useGetEpisodeSources, useGetEpisodeTypes } from '#/api/hooks/usePlayer';

export const WatchEpisodePage: React.FC = () => {
  const { releaseId } = useParams();
  const token = useUserStore((s) => s.token);
  const { data: typesData, isPending: isTypesPending } = useGetEpisodeTypes(releaseId!, token);
  const firstTypeId = useMemo(() => typesData?.types?.[0]?.id, [typesData]);
  const { data: sourcesData, isPending: isSourcesPending } = useGetEpisodeSources(releaseId!, firstTypeId, token);
  const navigate = useNavigate();

  if (isTypesPending || isSourcesPending) return <div className="loader-container"><i className="loader-circle"/></div>;

  const sources = sourcesData?.sources ?? [];

  return (
    <div className="wrapper" style={{ paddingTop: 'var(--header-height)' }}>
      <h2 style={{ padding: '0.75rem 1rem' }}>Выберите плеер</h2>
      <div style={{ display: 'grid', gap: '0.5rem', padding: '0 1rem' }}>
        {sources.map((s: any) => (
          <button
            key={s.id}
            onClick={() => navigate(`/release/${releaseId}/watch/source?type=${firstTypeId}&source=${s.id}`)}
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              border: '1px solid #4a4a4a',
              background: 'rgba(36,36,36,0.8)',
              color: 'var(--color-text)'
            }}
          >{s.title ?? s.name ?? `Источник ${s.id}`}</button>
        ))}
      </div>
    </div>
  );
}


