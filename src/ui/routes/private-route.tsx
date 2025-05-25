import type { ReactNode } from 'react';

import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuthStore } from '../auth/store/authStore';

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { user, checkAuth } = useAuthStore();
  // const test = useAuthStore();

  useEffect(() => {
    // initialize();
    checkAuth(); // Проверяем токен при каждом переходе
  }, []);
  // console.log(test.user, test.token)
  if (user === null)
    return (
      <div className="loader-container">
        <i className="loader-circle" />
      </div>
    );

  return user ? <>{children}</> : <Navigate to="/login" state={{ from: location }} replace />;
}
