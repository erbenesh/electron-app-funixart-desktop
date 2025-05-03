import { Navigate, createBrowserRouter } from 'react-router-dom';

import { App } from '../app';
import Auth from '../pages/auth/Auth';
import Home from '../pages/home/Home';
import Feed from '../pages/feed/Feed';
import PrivateRoute from './private-route';
import { feedRoutes } from './feed-routes';
import Popular from '../pages/popular/Popular';
import Profile from '../pages/profile/Profile';
import Release from '../pages/release/Release';
import { popularRoutes } from './popular-routes';
import Schedule from '../pages/schedule/Schedule';
import Watching from '../pages/watching/Watching';
import Bookmarks from '../pages/bookmarks/Bookmarks';
import { bookmarksRoutes } from './bookmarks-routes';
import Discussing from '../pages/discussing/Discussing';
import Collection from '../pages/collection/Collection';
import { collectionsRoutes } from './collections-routes';
import Collections from '../pages/collections/Collections';
import { lastReleasesRoutes } from './last-releases-routes';
import LastReleases from '../pages/last-releases/LastReleases';
import Recommendations from '../pages/recommendations/Recommendations';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: '/login',
        element: <Auth />,
        // action: loginAction
      },
      {
        path: '/home',
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
        // loader: dashboardLoader
      },
      {
        path: '/feed',
        element: (
          <PrivateRoute>
            <Feed />
          </PrivateRoute>
        ),
        // loader: dashboardLoader
      },
      {
        path: '/last-releases',
        element: (
          <PrivateRoute>
            <LastReleases />
          </PrivateRoute>
        ),
        children: lastReleasesRoutes,
        // loader: dashboardLoader
      },
      {
        path: '/popular',
        element: (
          <PrivateRoute>
            <Popular />
          </PrivateRoute>
        ),
        children: popularRoutes,
        // loader: dashboardLoader
      },
      {
        path: '/collections',
        element: (
          <PrivateRoute>
            <Collections />
          </PrivateRoute>
        ),
        children: collectionsRoutes,
        // loader: dashboardLoader
      },
      {
        path: '/bookmarks',
        element: (
          <PrivateRoute>
            <Bookmarks />
          </PrivateRoute>
        ),
        children: bookmarksRoutes,
        // loader: dashboardLoader
      },
      {
        path: '/feed',
        element: (
          <PrivateRoute>
            <Feed />
          </PrivateRoute>
        ),
        children: feedRoutes,
        // loader: dashboardLoader
      },
      {
        path: '/profile/:profileId',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
        // loader: dashboardLoader
      },
      {
        path: '/settings',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
        // loader: dashboardLoader
      },
      {
        path: '/recommendations',
        element: (
          <PrivateRoute>
            <Recommendations />
          </PrivateRoute>
        ),
        // loader: dashboardLoader
      },
      {
        path: '/discussing',
        element: (
          <PrivateRoute>
            <Discussing />
          </PrivateRoute>
        ),
        // loader: dashboardLoader
      },
      {
        path: '/schedule',
        element: (
          <PrivateRoute>
            <Schedule />
          </PrivateRoute>
        ),
        // loader: dashboardLoader
      },
      {
        path: '/watching',
        element: (
          <PrivateRoute>
            <Watching />
          </PrivateRoute>
        ),
        // loader: dashboardLoader
      },
      {
        path: '/release/:releaseId',
        element: (
          <PrivateRoute>
            <Release />
          </PrivateRoute>
        ),
        // loader: dashboardLoader
      },
      {
        path: '/collection/:collectionId',
        element: (
          <PrivateRoute>
            <Collection />
          </PrivateRoute>
        ),
        // loader: dashboardLoader
      },
      {
        path: '*',
        element: <>NOT FOUND</>,
      },
    ],
  },
]);
