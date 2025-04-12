import { Outlet } from 'react-router-dom';
import { QueryProvider } from '../QueryProvider';
import { MainLayout } from './layouts/main-layout/main-layout';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const App: React.FC = ()=> {

  return (
    <QueryProvider>
      <MainLayout>
        <Outlet />
      </MainLayout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryProvider>
  )
}
