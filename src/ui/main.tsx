import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { router } from './routes/router'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
    <ReactQueryDevtools initialIsOpen={false} />
  </StrictMode>,
)
