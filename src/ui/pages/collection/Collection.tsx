import { CollectionPage } from '../../sections/Collection/Collection';

export const metadata = {
  title: 'Коллекция | Anixart Desktop',
  description: '...',
};

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <CollectionPage />
    </>
  );
}
