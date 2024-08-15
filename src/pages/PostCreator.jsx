import React from 'react'
import { Form } from 'antd'

import { useCreateArticleMutation } from '../store/blogApi.js'
import PostForm from '../components/PostForm/PostForm.jsx'

export default function PostCreator() {
  const [form] = Form.useForm()
  const [createArticle, { isLoading, error, isSuccess }] = useCreateArticleMutation()

  const handleCreate = (values) => {
    createArticle(values).then(() => {
      form.resetFields(['title', 'description', 'body', 'tagList'])
    })
  }

  return <PostForm handle={handleCreate} form={form} isLoading={isLoading} error={error} isSuccess={isSuccess} />
}
