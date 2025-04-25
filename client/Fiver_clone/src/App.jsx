import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Landing } from './pages/Landing'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/home",
        element: <Landing />
      }
    ]
  }
])

const App = () => {
  return <RouterProvider router={router}/>
}

export default App