import { LastReleases } from 'src/ui/sections/LastReleases/LastReleases';

export const metadata = {
  title: 'Последние релизы -  | Anixart Desktop',
  description: '...',
};

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <LastReleases />
    </>
  );
}
