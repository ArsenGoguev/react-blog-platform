/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import { blogApi } from './blogApi.js'
import blogReducer from './blogReducer.js'

const rootReducer = combineReducers({
  [blogApi.reducerPath]: blogApi.reducer,
  blog: blogReducer
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware)
})

export default store
