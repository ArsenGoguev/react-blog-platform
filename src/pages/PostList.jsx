import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from 'antd'

import Spinner from '../components/Spinner/Spinner.jsx'
import Post from '../components/Post/Post.jsx'
import CustomPagination from '../components/CustomPagination/CustomPagination.jsx'
import { useGetPostsQuery } from '../store/blogApi.js'
import { setPage } from '../store/blogReducer.js'

export default function PostList() {
  const dispatch = useDispatch()
  const page = useSelector((state) => state.blog.page)
  const { data, error, isLoading } = useGetPostsQuery(page)

  const handlePageChange = useCallback(
    (newPage) => {
      dispatch(setPage(newPage))
    },
    [dispatch]
  )

  if (isLoading) return <Spinner margin={108} />
  if (error) {
    return <Alert type="error" message="Error" description="Something went wrong. Try to reload the page." showIcon />
  }
  const posts = data.articles.map((post) => <Post key={post.slug} post={post} />)

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
