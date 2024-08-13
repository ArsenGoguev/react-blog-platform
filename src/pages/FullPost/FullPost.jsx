import React from 'react'
import { useLocation } from 'react-router-dom'
import Markdown from 'markdown-to-jsx'
import { Alert } from 'antd'

import { PostContent } from '../../components/Post/Post.jsx'
import { useGetPostQuery } from '../../store/blogApi.js'
import Spinner from '../../components/Spinner/Spinner.jsx'

import styles from './FullPost.module.scss'

export default function FullPost() {
  const loc = useLocation()
  const { slug } = loc.state
  const { data, isLoading, error } = useGetPostQuery(slug)

  if (isLoading) return <Spinner />
  if (error) return <Alert type="error" message="Error" description="Something went wrong" showIcon />

  return (
    <div className={styles.post}>
      <div className={styles.preview}>
        <PostContent post={data.article} />
      </div>
      <div className={styles.markdown}>
        <Markdown>{data.article.body}</Markdown>
      </div>
    </div>
  )
}
