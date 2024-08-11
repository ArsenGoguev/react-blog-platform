import React from 'react'

import Post from '../components/Post/Post.jsx'
import { useGetPostsQuery } from '../store/blogApi.js'

export default function PostList() {
  const { data, error, isLoading } = useGetPostsQuery()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  const posts = data.articles.map((post) => <Post key={post.slug} post={post} />)

  return <div>{posts}</div>
}
