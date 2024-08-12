import React, { useEffect } from 'react'
import { Form, Input, Checkbox, Button, Divider, Spin, Alert } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { useSignUpMutation } from '../../store/blogApi.js'
import { setUser } from '../../store/blogReducer.js'

import styles from './RegistrationPage.module.scss'

export default function RegistrationPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [signUp, { data, isLoading, error }] = useSignUpMutation()

  const handleSignUp = ({ username, email, password }) => {
    signUp({ username, email, password })
  }

  useEffect(() => {
    if (data) {
      const { username, email, token, image } = data.user
      localStorage.setItem('token', token)
      dispatch(setUser({ username, email, image }))
      navigate('/')
    }
  }, [data, dispatch, navigate])

  const getMargin = (num) => ({ marginBottom: num })

  return (
    <div className={styles.form}>
      {isLoading ? <Spin size="large" fullscreen /> : null}
      {error ? (
        <Alert
          style={{ marginBottom: 21 }}
          message="Ошибка"
          type="error"
          description="Что-то пошло не так. Попробуйте еще раз."
        />
      ) : null}

      <div className={styles.header}>Create new account</div>
      <Form layout="vertical" onFinish={handleSignUp}>
        <Form.Item style={getMargin(12)} label="Username" name="username">
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item style={getMargin(12)} label="Email address" name="email">
          <Input placeholder="Email address" />
        </Form.Item>

        <Form.Item style={getMargin(12)} label="Password" name="password">
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item style={getMargin(12)} label="Repeat password" name="repeatPassword">
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Divider className={styles.divider} />

        <Form.Item style={getMargin(21)} name="agreement" valuePropName="checked">
          <Checkbox className={styles.checkbox}>I agree to the processing of my personal information</Checkbox>
        </Form.Item>

        <Form.Item style={getMargin(8)}>
          <Button className={styles.button} type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>

      <div className={styles.alert}>
        Already have an account?
        <Link to="/login-in" className={styles.signin}>
          {' '}
          Sign In
        </Link>
        .
      </div>
    </div>
  )
}
