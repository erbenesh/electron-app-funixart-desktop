import { Home } from '../../sections/Home/Home';

export const metadata = {
  title: 'Главная | Anixart Desktop',
  description: '...',
};

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <Home />
    </>
  );
}
