import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (page) => `articles?limit=5&offset=${(page - 1) * 5}`
    }),
    getPost: builder.query({
      query: (id) => `articles/${id}`
    }),
    loginIn: builder.mutation({
      query: (credentials) => ({
        url: 'users/login',
        method: 'POST',
        body: { user: credentials }
      })
    })
  })
})

export const { useGetPostsQuery, useGetPostQuery, useLoginInMutation } = blogApi

/*

  POST /users/login
  $ curl \
    -X POST /api/users/login \
    -H "Content-Type: application/json" \
    -d '{"user":{"email":"string","password":"string"}}'

  Request example
    {
      "user": {
        "email": "string",
        "password": "string"
      }
    }

  Response example
    {
    "user": {
      "email": "jake@jake.jake",
      "token": "jwt.token.here",
      "username": "jake",
      "bio": "I work at State Farm.",
      "image": null,
      }
    }

*/
