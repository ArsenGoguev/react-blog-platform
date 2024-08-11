import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import PostList from '../pages/PostList.jsx'
import Layout from '../components/Layout.jsx'

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<PostList />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}
