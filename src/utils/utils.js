import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setUser } from '../store/blogReducer.js'

export const useHandleUserResponse = (data, navigate) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      const { username, email, image, token } = data.user
      localStorage.setItem('token', token)
      dispatch(setUser({ username, email, image }))
      navigate('/')
    }
  }, [data, dispatch, navigate])
}

export const getMargin = (num) => ({ marginBottom: num })
