import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import { Alert } from 'antd'
import { useSelector } from 'react-redux'

import PostList from '../pages/PostList.jsx'
import FullPost from '../pages/FullPost.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import RegistrationPage from '../pages/RegistrationPage.jsx'
import ProfileEditor from '../pages/ProfileEditor.jsx'
import PostCreator from '../pages/PostCreator.jsx'
import PostEditor from '../pages/PostEditor.jsx'
import Layout from '../components/Layout.jsx'

export default function App() {
  const { auth } = useSelector((state) => state.blog)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<PostList />} />
        <Route path="articles" element={<Navigate to="/" replace />} />
        <Route path="articles/:slug" element={<FullPost />} />
        <Route path="login-in" element={auth ? <Navigate to="/" replace /> : <LoginPage />} />
        <Route path="sign-up" element={auth ? <Navigate to="/" replace /> : <RegistrationPage />} />
        <Route path="profile" element={auth ? <ProfileEditor /> : <Navigate to="/" replace />} />
        <Route path="new-article" element={auth ? <PostCreator /> : <Navigate to="/" replace />} />
        <Route path="articles/:slug/edit" element={auth ? <PostEditor /> : <Navigate to="/" replace />} />
        <Route
          path="*"
          element={
            <Alert
              style={{ width: '500px', margin: '108px auto 30px' }}
              type="warning"
              message="The page was not found"
              description="You may have entered the wrong page address."
              showIcon
            />
          }
        />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}
