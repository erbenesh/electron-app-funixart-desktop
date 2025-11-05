import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/responsive.css'
import { Provider } from './providers/Provider'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { Spinner } from 'ui-kit/components/Spinner/Spinner'

// Telegram platform detection → add attribute/class to <html>
(function assignTelegramPlatformClass() {
  try {
    const html = document.documentElement;
    const tg = (window as any).Telegram?.WebApp;
    let platform: string | undefined = tg?.platform;

    if (!platform) {
      const ua = navigator.userAgent || '';
      if (/iPhone|iPad|iPod/i.test(ua)) platform = 'ios';
      else if (/Android/i.test(ua)) platform = 'android';
      else platform = 'web';
    }

    html.setAttribute('data-tg-platform', platform);
    html.classList.add(`tg-platform-${platform}`);
  } catch (_) {
    // no-op
  }
})();

const router = createBrowserRouter(routes, { basename: import.meta.env.BASE_URL })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <Suspense
        fallback={
          <div className="loader-container">
            <Spinner />
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  </StrictMode>,
)
