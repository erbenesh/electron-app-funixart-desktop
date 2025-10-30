import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useUserStore } from '#/auth/store/auth';
import { useGetEpisodeTypes } from '#/api/hooks/usePlayer';

export const WatchSourcePage: React.FC = () => {
  const { releaseId } = useParams();
  const [params] = useSearchParams();
  const typeId = params.get('type');
  const token = useUserStore((s) => s.token);
  const { data, isPending } = useGetEpisodeTypes(releaseId!, token);
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | number | null>(null);

  useEffect(() => {
    const list = data?.types ?? [];
    if (list.length) setSelected(list[0].id);
  }, [data]);

  if (!typeId) return null;
  if (isPending) return <div className="loader-container"><i className="loader-circle"/></div>;

  const types = data?.types ?? [];

  return (
    <div className="wrapper" style={{ paddingTop: 'var(--header-height)' }}>
      <h2 style={{ padding: '0.75rem 1rem' }}>Выберите озвучку</h2>
      <div style={{ display: 'grid', gap: '0.5rem', padding: '0 1rem' }}>
        {types.map((t: any) => (
          <button
            key={t.id}
            onClick={() => navigate(`/release/${releaseId}/watch/voice?type=${t.id}&source=${typeId}`)}
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              border: '1px solid #4a4a4a',
              background: 'rgba(36,36,36,0.8)',
              color: 'var(--color-text)'
            }}
          >{t.title ?? t.name ?? `Озвучка ${t.id}`}</button>
        ))}
      </div>
    </div>
  );
}


