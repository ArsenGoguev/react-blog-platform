import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  page: 1,
  user: {}
}

const blogReducer = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setPage: (state, action) => ({ ...state, page: action.payload }),
    setUser: (state, action) => ({ ...state, user: action.payload }),
    removeUserInfo: (state) => ({ ...state, user: {} })
  }
})

export const { setPage, setUser, removeUserInfo } = blogReducer.actions

export default blogReducer.reducer
