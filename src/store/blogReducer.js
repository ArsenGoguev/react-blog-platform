import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  page: 1
}

const blogReducer = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setPage: (state, action) => ({ ...state, page: action.payload })
  }
})

export const { setPage } = blogReducer.actions

export default blogReducer.reducer
