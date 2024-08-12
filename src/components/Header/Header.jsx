import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Alert, Spin } from 'antd'

import { removeUserInfo, setUser } from '../../store/blogReducer.js'
import { useGetUserQuery } from '../../store/blogApi.js'
import defaultPicture from '../../styles/images/user.png'

import styles from './Header.module.scss'

export default function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.blog.user)
  const token = localStorage.getItem('token')
  const { data, isLoading, error, refetch } = useGetUserQuery(undefined, { skip: !token })

  useEffect(() => {
    if (token) {
      refetch()
    }
  }, [token, refetch])

  useEffect(() => {
    if (data) {
      const { username, email, image } = data.user
      dispatch(setUser({ username, email, image }))
    }
  }, [data, dispatch])

  const onLogOut = () => {
    localStorage.removeItem('token')
    dispatch(removeUserInfo())
    navigate('/articles')
  }

  const notAuthHeader = (
    <>
      <Link to="/login-in" className={styles.login}>
        Login In
      </Link>
      <Link to="/sign-up" className={styles.reg}>
        Sign In
      </Link>
    </>
  )

  const authHeader = (
    <>
      <Link to="/" className={styles.create}>
        Create article
      </Link>
      <Link to="/profile" className={styles.user}>
        <span className={styles.username}>{user.username}</span>
        <img className={styles.image} src={user.image || defaultPicture} alt="avatar" />
      </Link>
      <button type="button" onClick={onLogOut} className={styles.logout}>
        Log Out
      </button>
    </>
  )

  return (
    <div className={styles.header}>
      <Link to="/" className={styles['site-name']}>
        Realworld Blog
      </Link>
      <div className={styles['account-block']}>
        {isLoading ? <Spin /> : null}
        {error ? <Alert message="Что-то пошло не так" type="error" /> : null}
        {Object.keys(user).length === 0 ? notAuthHeader : authHeader}
      </div>
    </div>
  )
}
