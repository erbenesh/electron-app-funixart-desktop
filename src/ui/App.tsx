import { Outlet } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { QueryProvider } from './providers/QueryProvider';
import { MainLayout } from './layouts/main-layout/main-layout';

export const App: React.FC = () => (
  <QueryProvider>
    <MainLayout>
      <Outlet />
    </MainLayout>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryProvider>
);
