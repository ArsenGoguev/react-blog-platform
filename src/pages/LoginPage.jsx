import React from 'react'
import { Form, Input, Button, Alert } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

import { useHandleUserResponse } from '../utils/hooks.js'
import { getMarginBottom } from '../utils/service.js'
import { userFormRules } from '../utils/formRules.js'
import { useLoginInMutation } from '../store/blogApi.js'
import styles from '../styles/modules/Form.module.scss'
import Spinner from '../components/Spinner/Spinner.jsx'

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
      {isLoading ? <Spinner fullscreen={true} /> : null}
      {error ? (
        <Alert banner closable style={{ marginBottom: 21 }} message="Invalid e-mail or password" type="error" />
      ) : null}
      <div className={styles.header}>Sign In</div>
      <Form onFinish={signIn} layout="vertical">
        <Form.Item style={getMarginBottom(12)} label="Email address" name="email" rules={userFormRules.email}>
          <Input placeholder="Email address" />
        </Form.Item>

        <Form.Item style={getMarginBottom(21)} label="Password" name="password" rules={userFormRules.password}>
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item style={getMarginBottom(8)}>
          <Button block className={styles.button} type="primary" htmlType="submit">
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
