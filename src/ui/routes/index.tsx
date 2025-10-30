import { RouteObject } from 'react-router-dom';
import { App } from '../App';
import { AuthPage } from '../auth/view/AuthPage';

import { ArticlePage } from '#/pages/ArticlePage';
import { BookmarksList } from '../components/BookmarksList/BookmarksList';
import { CollectionsList } from '../components/CollectionsList/CollectionsList';
import { FavoriteList } from '../components/FavoriteList/FavoriteList';
import { FeedList } from '../components/FeedList/FeedList';
import { LastReleasesList } from '../components/LastReleasesList/LastReleasesList';
import { PopularList } from '../components/PopularList/PopularList';
import { ArticlesPage } from '../pages/ArticlesPage';
import { BookmarksPage } from '../pages/BookmarksPage';
import { ChannelPage } from '../pages/ChannelPage';
import { ChannelsPage } from '../pages/ChannelsPage';
import { CollectionPage } from '../pages/CollectionPage';
import { CollectionsPage } from '../pages/CollectionsPage';
import { DiscussingPage } from '../pages/DiscussingPage';
import { FeedPage } from '../pages/FeedPage';
import { FriendsPage } from '../pages/FriendsPage';
import { HomePage } from '../pages/HomePage';
import { LastReleasesPage } from '../pages/LastReleasesPage';
import { NotificationsPage } from '../pages/NotificationsPage';
import { PopularPage } from '../pages/PopularPage';
import { ProfilePage } from '../pages/ProfilePage';
import { RecommendationsPage } from '../pages/RecommendationsPage';
import { ReleasePage } from '../pages/ReleasePage';
import { SchedulePage } from '../pages/SchedulePage';
import { SettingsPage } from '../pages/SettingsPage';
import { WatchingPage } from '../pages/WatchingPage';

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

