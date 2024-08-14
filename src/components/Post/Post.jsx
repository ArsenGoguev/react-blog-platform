import React, { useEffect } from 'react'
import { Alert, Button, Flex, Popconfirm, Spin, Tag } from 'antd'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as generateId } from 'uuid'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

import { useFavoritePostMutation, useUnfavoritePostMutation, useDeleteArticleMutation } from '../../store/blogApi.js'

import styles from './Post.module.scss'

export default function Post({ post }) {
  return (
    <div className={styles.post}>
      <PostContent post={post} />
    </div>
  )
}

export function PostContent({ post, full = false }) {
  const { auth, user } = useSelector((state) => state.blog)
  const { username } = user
  const navigate = useNavigate()
  const [deleteArticle, { isDeleteLoading, deleteError, isSuccess }] = useDeleteArticleMutation()
  const [favoritePost, { isFavLoading, favError }] = useFavoritePostMutation()
  const [unfavoritePost, { isRemLoading, remError }] = useUnfavoritePostMutation()

  useEffect(() => {
    if (isSuccess) navigate('/articles')
  }, [isSuccess, navigate])

  const handleFavorite = () => {
    if (post.favorited) {
      unfavoritePost(post.slug)
    } else {
      favoritePost(post.slug)
    }
  }

  const onDeleteArticle = () => {
    deleteArticle(post.slug)
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

  if (isDeleteLoading) return <Spin size="large" fullscreen />

  return (
    <>
      <div className={styles.main}>
        {(favError || remError || deleteError) && (
          <Alert type="error" message="Error" description="Something went wrong." />
        )}
        <div className={styles.header}>
          <Link className={styles.title} to={`/articles/${post.slug}`} state={{ slug: post.slug }}>
            {post.title}
          </Link>
          <button type="button" disabled={!auth} className={styles.likes} onClick={handleFavorite}>
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

      <div>
        <div className={styles.author}>
          <div>
            <div className={styles.name}>{post.author.username}</div>
            <div className={styles.date}>{formattedDate}</div>
          </div>
          <img className={styles.avatar} src={avatar} alt="avatar" />
        </div>
        {full && username === post.author.username && (
          <div className={styles.buttonsWrapper}>
            <Popconfirm
              description="Are you sure to delete this article?"
              okText="Yes"
              cancelText="No"
              onConfirm={onDeleteArticle}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
            <Link to="/" className={styles.editButton}>
              Edit
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired
}

PostContent.propTypes = {
  full: PropTypes.bool,
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
