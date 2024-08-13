import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const blogApi = createApi({
  reducerPath: 'blogApi',
  tagTypes: ['Posts', 'User'],
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
      query: (page) => `articles?limit=5&offset=${(page - 1) * 5}`,
      providesTags: (result) =>
        result
          ? [...result.articles.map(({ slug }) => ({ type: 'Posts', id: slug })), { type: 'Posts', id: 'LIST' }]
          : [{ type: 'Posts', id: 'LIST' }]
    }),
    getPost: builder.query({
      query: (slug) => `articles/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Posts', id: slug }]
    }),
    getUser: builder.query({
      query: () => 'user',
      providesTags: [{ type: 'User', id: 'CURRENT' }]
    }),
    loginIn: builder.mutation({
      query: (credentials) => ({
        url: 'users/login',
        method: 'POST',
        body: { user: credentials }
      }),
      invalidatesTags: [{ type: 'User', id: 'CURRENT' }]
    }),
    signUp: builder.mutation({
      query: (credentials) => ({
        url: 'users',
        method: 'POST',
        body: { user: credentials }
      }),
      invalidatesTags: [{ type: 'User', id: 'CURRENT' }]
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: 'user',
        method: 'PUT',
        body: { user: userData }
      }),
      invalidatesTags: [
        { type: 'User', id: 'CURRENT' },
        { type: 'Posts', id: 'LIST' }
      ]
    }),
    favoritePost: builder.mutation({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'POST'
      }),
      invalidatesTags: (result, error, slug) => [{ type: 'Posts', id: slug }]
    }),
    unfavoritePost: builder.mutation({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, slug) => [{ type: 'Posts', id: slug }]
    })
  })
})

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetUserQuery,
  useLoginInMutation,
  useSignUpMutation,
  useUpdateUserMutation,
  useFavoritePostMutation,
  useUnfavoritePostMutation
} = blogApi
