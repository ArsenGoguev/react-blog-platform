import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Post from '../components/Post/Post.jsx'
import CustomPagination from '../components/CustomPagination/CustomPagination.jsx'
import { useGetPostsQuery } from '../store/blogApi.js'
import { setPage } from '../store/blogReducer.js'

export default function PostList() {
  const dispatch = useDispatch()
  const page = useSelector((state) => state.blog.page)
  const { data, error, isLoading } = useGetPostsQuery(page)

  useEffect(() => {
    dispatch(setPage(1))
  }, [dispatch])

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  const posts = data.articles.map((post) => <Post key={post.slug} post={post} />)

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage))
  }

  return (
    <>
      <div>{posts}</div>
      <CustomPagination
        currentPage={page}
        onPageChange={handlePageChange}
        totalPages={Math.ceil(data.articlesCount / 5)}
      />
    </>
  )
}
