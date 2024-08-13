import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  page: 1,
  user: {},
  auth: false
}

const blogReducer = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setPage: (state, action) => ({ ...state, page: action.payload }),
    setUser: (state, action) => ({ ...state, user: action.payload, auth: true }),
    removeUserInfo: (state) => ({ ...state, user: {}, auth: false })
  }
})

export const { setPage, setUser, removeUserInfo } = blogReducer.actions

export default blogReducer.reducer
