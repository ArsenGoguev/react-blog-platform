import React, { useCallback } from 'react'
import { Form } from 'antd'
import { useLocation } from 'react-router-dom'

import { useUpdateArticleMutation } from '../store/blogApi.js'
import PostForm from '../components/PostForm/PostForm.jsx'

export default function PostEditor() {
  const loc = useLocation()
  const post = loc.state
  const [form] = Form.useForm()

  const [updateArticle, { isLoading, error, isSuccess }] = useUpdateArticleMutation()

  const handleEdit = useCallback(
    (values) => {
      updateArticle({ slug: post.slug, articleData: values })
    },
    [updateArticle, post.slug]
  )

  return (
    <PostForm post={post} handle={handleEdit} form={form} isLoading={isLoading} error={error} isSuccess={isSuccess} />
  )
}
