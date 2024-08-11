import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'articles?limit=5'
    }),
    getPost: builder.query({
      query: (id) => `articles/${id}`
    })
  })
})

export const { useGetPostsQuery, useGetPostQuery } = blogApi
