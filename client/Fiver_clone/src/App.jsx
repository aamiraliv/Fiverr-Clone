import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './components/Layout'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: []
  }
])

const App = () => {
  return <RouterProvider router={router}/>
}

export default App