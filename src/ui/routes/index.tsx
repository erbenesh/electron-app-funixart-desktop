import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import { App } from '../App';
import { AuthPage } from '../auth/view/AuthPage';

const ArticlePage = lazy(() => import('#/pages/ArticlePage'));
const BookmarksList = lazy(() => import('../components/BookmarksList/BookmarksList'));
const CollectionsList = lazy(() => import('../components/CollectionsList/CollectionsList'));
const FavoriteList = lazy(() => import('../components/FavoriteList/FavoriteList'));
const FeedList = lazy(() => import('../components/FeedList/FeedList'));
const LastReleasesList = lazy(() => import('../components/LastReleasesList/LastReleasesList'));
const PopularList = lazy(() => import('../components/PopularList/PopularList'));
const ArticlesPage = lazy(() => import('../pages/ArticlesPage'));
const BookmarksPage = lazy(() => import('../pages/BookmarksPage'));
const ChannelPage = lazy(() => import('../pages/ChannelPage'));
const ChannelsPage = lazy(() => import('../pages/ChannelsPage'));
const CollectionPage = lazy(() => import('../pages/CollectionPage'));
const CollectionsPage = lazy(() => import('../pages/CollectionsPage'));
const DiscussingPage = lazy(() => import('../pages/DiscussingPage'));
const FeedPage = lazy(() => import('../pages/FeedPage'));
const FriendsPage = lazy(() => import('../pages/FriendsPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
const LastReleasesPage = lazy(() => import('../pages/LastReleasesPage'));
const NotificationsPage = lazy(() => import('../pages/NotificationsPage'));
const PopularPage = lazy(() => import('../pages/PopularPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const RecommendationsPage = lazy(() => import('../pages/RecommendationsPage'));
const ReleasePage = lazy(() => import('../pages/ReleasePage'));
const SchedulePage = lazy(() => import('../pages/SchedulePage'));
const SettingsPage = lazy(() => import('../pages/SettingsPage'));
const WatchingPage = lazy(() => import('../pages/WatchingPage'));
const WatchEpisodePage = lazy(() => import('../pages/mobile/WatchEpisodePage'));
const WatchSourcePage = lazy(() => import('../pages/mobile/WatchSourcePage'));
const WatchVoicePage = lazy(() => import('../pages/mobile/WatchVoicePage'));
const WatchPlayPage = lazy(() => import('../pages/mobile/WatchPlayPage'));
import { ComponentsShowcasePage } from '../pages/ComponentsShowcasePage';

// Главная страница
const homeRoutes: RouteObject = {
  index: true,
  element: <HomePage />,
};

// Маршруты последних релизов
const lastReleasesRoutes: RouteObject = {
  path: '/last',
  element: <LastReleasesPage />,
  children: [
    {
      path: 'last',
      element: <LastReleasesList />,
    },
    {
      path: 'ongoing',
      element: <LastReleasesList />,
    },
    {
      path: 'announce',
      element: <LastReleasesList />,
    },
    {
      path: 'finished',
      element: <LastReleasesList />,
    },
    {
      path: 'films',
      element: <LastReleasesList />,
    },
  ],
};

// Маршруты популярного
const popularRoutes: RouteObject = {
  path: '/popular',
  element: <PopularPage />,
  children: [
    {
      path: 'ongoing',
      element: <PopularList />,
    },
    {
      path: 'finished',
      element: <PopularList />,
    },
    {
      path: 'films',
      element: <PopularList />,
    },
    {
      path: 'ova',
      element: <PopularList />,
    },
  ],
};

// Маршруты коллекций
const collectionsRoutes: RouteObject = {
  path: '/collections',
  element: <CollectionsPage />,
  children: [
    {
      index: true,
      element: <CollectionsList />,
    },
    {
      path: 'all',
      element: <CollectionsList />,
    },
    {
      path: 'my',
      element: <CollectionsList />,
    },
    {
      path: 'favorite',
      element: <CollectionsList />,
    },
  ],
};

// Маршруты закладок
const bookmarksRoutes: RouteObject = {
  path: '/bookmarks',
  element: <BookmarksPage />,
  children: [
    {
      path: 'favorite',
      element: <FavoriteList />,
    },
    {
      path: 'watching',
      element: <BookmarksList />,
    },
    {
      path: 'planned',
      element: <BookmarksList />,
    },
    {
      path: 'watched',
      element: <BookmarksList />,
    },
    {
      path: 'delayed',
      element: <BookmarksList />,
    },
    {
      path: 'abandoned',
      element: <BookmarksList />,
    },
  ],
};

// Маршруты ленты
const feedRoutes: RouteObject = {
  path: '/feed',
  element: <FeedPage />,
  children: [
    {
      path: 'news',
      element: <FeedList />,
    },
    {
      path: 'latest',
      element: <FeedList />,
    },
  ],
};

// Маршруты профиля
const profileRoutes: RouteObject[] = [
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/profile/:id',
    element: <ProfilePage />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
  },
  {
    path: '/friends',
    element: <FriendsPage />,
  },
  {
    path: '/channels',
    element: <ChannelsPage />,
  },
  {
    path: '/articles',
    element: <ArticlesPage />,
  },
  {
    path: '/notifications',
    element: <NotificationsPage />,
  },
];

// Прочие маршруты
const otherRoutes: RouteObject[] = [
  {
    path: '/recommendations/all',
    element: <RecommendationsPage />,
  },
  {
    path: '/components',
    element: <ComponentsShowcasePage />,
  },
  {
    path: '/discussing/all',
    element: <DiscussingPage />,
  },
  {
    path: '/schedule',
    element: <SchedulePage />,
  },
  {
    path: '/watching/all',
    element: <WatchingPage />,
  },
];

// Динамические маршруты
const dynamicRoutes: RouteObject[] = [
  {
    path: '/release/:releaseId',
    element: <ReleasePage />,
  },
  // Mobile watching flow
  { path: '/release/:releaseId/watch/episode', element: <WatchEpisodePage /> },
  { path: '/release/:releaseId/watch/source', element: <WatchSourcePage /> },
  { path: '/release/:releaseId/watch/voice', element: <WatchVoicePage /> },
  { path: '/release/:releaseId/watch/play', element: <WatchPlayPage /> },
  {
    path: '/article/:articleId',
    element: <ArticlePage />,
  },
  {
    path: '/collection/:collectionId',
    element: <CollectionPage />,
  },
  {
    path: '/channel/:channelId',
    element: <ChannelPage />,
  },
];

// Основной роутер
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      homeRoutes,
      lastReleasesRoutes,
      popularRoutes,
      collectionsRoutes,
      bookmarksRoutes,
      feedRoutes,
      ...profileRoutes,
      ...otherRoutes,
      ...dynamicRoutes,
    ],
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/auth/sign-up',
    element: <AuthPage />,
  },
  {
    path: '/auth/restore',
    element: <AuthPage />,
  },
];

