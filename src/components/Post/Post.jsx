import React from 'react'
import { Alert, Flex, Spin, Tag } from 'antd'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { v4 as generateId } from 'uuid'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'

import { useFavoritePostMutation, useUnfavoritePostMutation } from '../../store/blogApi.js'

import styles from './Post.module.scss'

export default function Post({ post }) {
  return (
    <div className={styles.post}>
      <PostContent post={post} />
    </div>
  )
}

export function PostContent({ post }) {
  const [favoritePost, { isFavLoading, favError }] = useFavoritePostMutation()
  const [unfavoritePost, { isRemLoading, remError }] = useUnfavoritePostMutation()

  if (isFavLoading) console.log('ku')

  const handleFavorite = () => {
    if (post.favorited) {
      unfavoritePost(post.slug)
    } else {
      favoritePost(post.slug)
    }
  }

  const avatar = post.author.image
  const tags = post.tagList
    ? post.tagList.map((tag) => {
        if (tag && tag.trim()) {
          return (
            <Tag className={styles.tag} key={generateId()}>
              {tag}
            </Tag>
          )
        }
        return null
      })
    : []

  const date = new Date(post.createdAt)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const formattedDate = date.toLocaleDateString('en-US', options)

  return (
    <>
      <div className={styles.main}>
        {(favError || remError) && <Alert type="error" message=" возникла ошибка" />}
        <div className={styles.header}>
          <Link className={styles.title} to={`/articles/${post.slug}`} state={{ data: post }}>
            {post.title}
          </Link>
          <button type="button" className={styles.likes} onClick={handleFavorite}>
            {post.favorited ? <HeartFilled style={{ color: '#f44336' }} /> : <HeartOutlined />}
            <span className={styles.count}>{post.favoritesCount}</span>
          </button>
          {(isFavLoading || isRemLoading) && <Spin />}
        </div>

        <Flex wrap gap={8} className={styles.tags}>
          {tags.map((tag) => tag)}
        </Flex>
        <p className={styles.text}>{post.description}</p>
      </div>

      <div className={styles.author}>
        <div>
          <div className={styles.name}>{post.author.username}</div>
          <div className={styles.date}>{formattedDate}</div>
        </div>
        <img className={styles.avatar} src={avatar} alt="avatar" />
      </div>
    </>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired
}

PostContent.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    tagList: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string.isRequired,
    favorited: PropTypes.bool.isRequired,
    favoritesCount: PropTypes.number.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}
