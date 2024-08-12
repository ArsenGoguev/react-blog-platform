import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog.kata.academy/api/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (page) => `articles?limit=5&offset=${(page - 1) * 5}`
    }),
    getPost: builder.query({
      query: (id) => `articles/${id}`
    }),
    getUser: builder.query({
      query: () => 'user'
    }),
    loginIn: builder.mutation({
      query: (credentials) => ({
        url: 'users/login',
        method: 'POST',
        body: { user: credentials }
      })
    }),
    signUp: builder.mutation({
      query: (credentials) => ({
        url: 'users',
        method: 'POST',
        body: { user: credentials }
      })
    })
  })
})

export const { useGetPostsQuery, useGetPostQuery, useGetUserQuery, useLoginInMutation, useSignUpMutation } = blogApi
