import { Outlet } from 'react-router-dom';
import { QueryProvider } from '../QueryProvider';
import { MainLayout } from './layouts/main-layout/main-layout';

export const App: React.FC = ()=> {

  return (
    <QueryProvider>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </QueryProvider>
  )
}
