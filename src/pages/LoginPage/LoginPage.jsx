import React from 'react'
import { Form, Input, Button, Spin, Alert } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

import { useHandleUserResponse, getMargin, formRules } from '../../utils/utils.js'
import { useLoginInMutation } from '../../store/blogApi.js'

import styles from './LoginPage.module.scss'

export default function LoginPage() {
  const navigate = useNavigate()
  const [loginIn, { data, isLoading, error }] = useLoginInMutation()

  useHandleUserResponse(data, navigate)

  const signIn = (event) => {
    const { email, password, image } = event
    loginIn({ email, password, image })
  }

  return (
    <div className={styles.form}>
      {isLoading ? <Spin size="large" fullscreen /> : null}
      {error ? (
        <Alert banner closable style={{ marginBottom: 21 }} message="Invalid e-mail or password" type="error" />
      ) : null}
      <div className={styles.header}>Sign In</div>
      <Form onFinish={signIn} layout="vertical">
        <Form.Item style={getMargin(12)} label="Email address" name="email" rules={formRules.email}>
          <Input placeholder="Email address" />
        </Form.Item>

        <Form.Item style={getMargin(21)} label="Password" name="password" rules={formRules.password}>
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item style={getMargin(8)}>
          <Button className={styles.button} type="primary" htmlType="submit">
            Login
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
