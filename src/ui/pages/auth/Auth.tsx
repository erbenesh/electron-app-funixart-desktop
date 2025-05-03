import { AuthPage } from 'src/ui/auth/auth-section/AuthPage';

export const metadata = {
  title: 'Авторизация | Anixart Desktop',
  description: '...',
};

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <AuthPage />
    </>
  );
}
