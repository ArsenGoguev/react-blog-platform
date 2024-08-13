import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Spin } from 'antd'

import Post from '../components/Post/Post.jsx'
import CustomPagination from '../components/CustomPagination/CustomPagination.jsx'
import { useGetPostsQuery } from '../store/blogApi.js'
import { setPage } from '../store/blogReducer.js'

export default function PostList() {
  const dispatch = useDispatch()
  const page = useSelector((state) => state.blog.page)
  const { data, error, isLoading } = useGetPostsQuery(page)

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '108px' }}>
        <Spin size="large" />
      </div>
    )
  }
  if (error) {
    return <Alert type="error" message="Error" description="Something went wrong. Try to reload the page." showIcon />
  }
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
