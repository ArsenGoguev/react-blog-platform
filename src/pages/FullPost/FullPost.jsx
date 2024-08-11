import React from 'react'
import { useLocation } from 'react-router-dom'
import Markdown from 'markdown-to-jsx'

import { PostContent } from '../../components/Post/Post.jsx'

import styles from './FullPost.module.scss'

export default function FullPost() {
  const loc = useLocation()
  const { data } = loc.state

  return (
    <div className={styles.post}>
      <div className={styles.preview}>
        <PostContent post={data} />
      </div>
      <Markdown className={`${styles.markdown} markdown`}>{data.body}</Markdown>
    </div>
  )
}
