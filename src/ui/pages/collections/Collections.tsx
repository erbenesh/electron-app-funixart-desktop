import { Collections } from '../../sections/Collections/Collections';

export const metadata = {
  title: 'Коллекции | Anixart Desktop',
  description: '...',
};

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <Collections />
    </>
  );
}
