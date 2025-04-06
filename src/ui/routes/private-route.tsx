import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import { useAuthStore } from '../auth/store/authStore';

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { isAuth, initialize } = useAuthStore();
  
  useEffect(() => { initialize(); }, [initialize]);

  if (isAuth === null) return null; // или лоадер
  
  return isAuth ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}