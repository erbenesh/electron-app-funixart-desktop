import { Bookmarks } from '../../sections/Bookmarks/Bookmarks';

export const metadata = {
  title: 'Закладки | Anixart Desktop',
  description: '...',
};

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <Bookmarks />
    </>
  );
}
