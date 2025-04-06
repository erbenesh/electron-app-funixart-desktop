import { createBrowserRouter, Navigate } from "react-router-dom";
import Auth from "../pages/auth/Auth";
import PrivateRoute from "./private-route";
import Home from "../pages/home/Home";

export const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/home" replace />,
      children: [
        {
          path: '/login',
          element: <Auth />,
          // action: loginAction
        },
        {
          path: '/home',
          element: <PrivateRoute><Home /></PrivateRoute>,
          // loader: dashboardLoader
        },
        {
          path: '*',
          element: <>NOT FOUND</>
        }
      ]
    }
  ]);

  /* <Router>
        <Routes>
          <Route path="/" element={<App />}>

            <Route index element={<Home />} />

            <Route path="/feed" element={<Feed />} />

            <Route path="/last" element={<LastReleases />}>

              <Route path="last" element={<LastReleasesList />} />

              <Route path="ongoing" element={<LastReleasesList />} />

              <Route path="announce" element={<LastReleasesList />} />

              <Route path="finished" element={<LastReleasesList />} />

              <Route path="films" element={<LastReleasesList />} />

            </Route>

            <Route path="/popular" element={<Popular />}>

              <Route path="ongoing" element={<PopularList />} />

              <Route path="finished" element={<PopularList />} />

              <Route path="films" element={<PopularList />} />

              <Route path="ova" element={<PopularList />} />

            </Route>

            <Route path="/collections" element={<Collections />}>

              <Route path="/collections/all" element={<CollectionsList />} />

              <Route path="/collections/my" element={<CollectionsList />} />
              
              <Route path="/collections/favorite" element={<CollectionsList />} />
            
            </Route>

            <Route path="/bookmarks" element={<Bookmarks />}>

              <Route path="/bookmarks/favorite" element={<FavoriteList />}/>

              <Route path="/bookmarks/watching" element={<BookmarksList />}/>

              <Route path="/bookmarks/planned" element={<BookmarksList />}/>

              <Route path="/bookmarks/watched" element={<BookmarksList />}/>

              <Route path="/bookmarks/delayed" element={<BookmarksList />}/>

              <Route path="/bookmarks/abandoned" element={<BookmarksList />}/>
            
            </Route>

            <Route path="/feed" element={<Feed />}>

              <Route path="/feed/news" element={<FeedList />}/>

              <Route path="/feed/latest" element={<FeedList />}/>

            </Route>
            
            <Route path="/profile" element={<Profile />} />

            <Route path="/settings" element={<Profile />} />

            <Route path='/recommendations/all' element={<Recommendations />} />

            <Route path='/discussing/all' element={<Discussing />} />

            <Route path='/schedule' element={<Schedule />} />

            <Route path='/watching/all' element={<Watching />} />

            <Route path="/release/:releaseId" element={<Release />} />

            <Route path="/collection/:collectionId" element={<CollectionPage />} />

          </Route>
        </Routes>
      </Router> */