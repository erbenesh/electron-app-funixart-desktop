import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from './App'
import './index.css'
import { Provider } from '../Provider'
import { Routes, Route, HashRouter as Router } from 'react-router-dom'
import { Feed } from './pages/Feed/Feed';
import { Collections } from './pages/Collections/Collections'
import { NewHome } from './pages/NewHome/NewHome'
import { Profile } from './pages/Profile/Profile'
import { ReleasePage } from './pages/ReleasePage/ReleasePage'
import { Bookmarks } from './pages/Bookmarks/Bookmarks'
import { CollectionPage } from './pages/CollectionPage/CollectionPage'
import { BookmarksList } from './components/BookmarksList/BookmarksList'
import { Schedule } from './pages/Schedule/Schedule'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>

            <Route index element={<NewHome />} />

            <Route path="/schedule" element={<Schedule />}/>

            <Route path="/feed" element={<Feed />} />

            <Route path="/collections" element={<Collections />} />

            <Route path="/bookmarks" element={<Bookmarks />}>

              <Route path="/bookmarks/favorite" element={<BookmarksList />}></Route>

              <Route path="/bookmarks/watching" element={<BookmarksList />}></Route>

              <Route path="/bookmarks/planned" element={<BookmarksList />}></Route>

              <Route path="/bookmarks/watched" element={<BookmarksList />}></Route>

              <Route path="/bookmarks/delayed" element={<BookmarksList />}></Route>

              <Route path="/bookmarks/abandoned" element={<BookmarksList />}></Route>
            
            </Route>

            <Route path="/profile" element={<Profile />} />

            <Route path="/settings" element={<Profile />} />

            <Route path="/release/:releaseId" element={<ReleasePage />} />

            <Route path="/collection/:collectionId" element={<CollectionPage />} />

          </Route>
        </Routes>
      </Router>
    </Provider>
  </StrictMode>,
)
