import React from 'react'
import { Flex, Tag } from 'antd'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { v4 as generateId } from 'uuid'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'

import defaultAvatar from '../../styles/images/user.png'

import styles from './Post.module.scss'

export default function Post({ post }) {
  const avatar = post.author.image || defaultAvatar
  const tags = post.tagList
    ? post.tagList.map((tag) => (
        <Tag className={styles.tag} key={generateId()}>
          {tag}
        </Tag>
      ))
    : []

  const date = new Date(post.createdAt)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const formattedDate = date.toLocaleDateString('en-US', options)

  return (
    <div className={styles.post}>
      <div className={styles.main}>
        <div className={styles.header}>
          <Link to="/" className={styles.title}>
            {post.title}
          </Link>
          <div className={styles.likes}>
            {post.favorited ? <HeartFilled style={{ color: '#f44336' }} /> : <HeartOutlined />}
            <span className={styles.count}>{post.favoritesCount}</span>
          </div>
        </div>

        <Flex>{tags.map((tag) => tag)}</Flex>
        <p className={styles.text}>{post.description}</p>
      </div>

      <div className={styles.author}>
        <div>
          <div className={styles.name}>{post.author.username}</div>
          <div className={styles.date}>{formattedDate}</div>
        </div>
        <img className={styles.avatar} src={avatar} alt="avatar" />
      </div>
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    tagList: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    favorited: PropTypes.bool.isRequired,
    favoritesCount: PropTypes.number.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
      bio: PropTypes.string,
      image: PropTypes.string.isRequired,
      following: PropTypes.bool.isRequired
    }).isRequired
  }).isRequired
}
