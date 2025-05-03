import { Profile } from '../../sections/Profile/Profile';

export const metadata = {
  title: 'Профиль | Anixart Desktop',
  description: '...',
};

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <Profile />
    </>
  );
}
