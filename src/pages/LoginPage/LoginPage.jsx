import React, { useEffect } from 'react'
import { Form, Input, Button, Spin } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { useLoginInMutation } from '../../store/blogApi.js'
import { setUser } from '../../store/blogReducer.js'

import styles from './LoginPage.module.scss'

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loginIn, { data, isLoading, error }] = useLoginInMutation()

  const signIn = (event) => {
    const { email, password, image } = event
    loginIn({ email, password, image })
  }

  useEffect(() => {
    if (data) {
      const { username, email, image, token } = data.user
      localStorage.setItem('token', token)
      dispatch(setUser({ username, email, image }))
      navigate('/')
    }
  }, [data, dispatch, navigate])

  const getMargin = (num) => ({ marginBottom: num })

  if (error) return <div>Error</div>
  return (
    <div className={styles.form}>
      {isLoading ? <Spin size="large" fullscreen /> : null}
      <div className={styles.header}>Sign In</div>
      <Form onFinish={signIn} layout="vertical">
        <Form.Item style={getMargin(12)} label="Email address" name="email">
          <Input placeholder="Email address" />
        </Form.Item>

        <Form.Item style={getMargin(21)} label="Password" name="password">
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item style={getMargin(8)}>
          <Button className={styles.button} type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>

      <div className={styles.alert}>
        Don&apos;t have an account?
        <Link to="/sign-up" className={styles.signin}>
          {' '}
          Sign Up
        </Link>
        .
      </div>
    </div>
  )
}
