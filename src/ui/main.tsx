import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from './App'
import './index.css'
import { Provider } from '../Provider'
import { Routes, Route, HashRouter as Router } from 'react-router-dom'
import { Feed } from './pages/Feed/Feed';
import { Collections } from './pages/Collections/Collections'
import { Home } from './pages/Home/Home'
import { Profile } from './pages/Profile/Profile'
import { Release } from './pages/Release/Release'
import { Bookmarks } from './pages/Bookmarks/Bookmarks'
import { CollectionPage } from './pages/Collection/Collection'
import { BookmarksList } from './components/BookmarksList/BookmarksList'
import { CollectionsList } from './components/CollectionsList/CollectionsList'
import { LastReleasesList } from './components/LastReleasesList/LastReleasesList'
import { LastReleases } from './pages/LastReleases/LastReleases'
import { Recommendations } from './pages/Recommendations/Recommendations'
import { PopularList } from './components/PopularList/PopularList'
import { Popular } from './pages/Popular/Popular'
import { Watching } from './pages/Watching/Watching'
import { Discussing } from './pages/Discussing/Discussing'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <Router>
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

              <Route path="/bookmarks/favorite" element={<BookmarksList />}/>

              <Route path="/bookmarks/watching" element={<BookmarksList />}/>

              <Route path="/bookmarks/planned" element={<BookmarksList />}/>

              <Route path="/bookmarks/watched" element={<BookmarksList />}/>

              <Route path="/bookmarks/delayed" element={<BookmarksList />}/>

              <Route path="/bookmarks/abandoned" element={<BookmarksList />}/>
            
            </Route>
            
            <Route path="/profile" element={<Profile />} />

            <Route path="/settings" element={<Profile />} />

            <Route path='/recommendations/all' element={<Recommendations />} />

            <Route path='/discussing/all' element={<Discussing />} />

            <Route path='/watching/all' element={<Watching />} />

            <Route path="/release/:releaseId" element={<Release />} />

            <Route path="/collection/:collectionId" element={<CollectionPage />} />

          </Route>
        </Routes>
      </Router>
    </Provider>
  </StrictMode>,
)
