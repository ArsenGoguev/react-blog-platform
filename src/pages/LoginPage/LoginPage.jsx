import React from 'react'
import { Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'

import styles from './LoginPage.module.scss'

export default function LoginPage() {
  const marginBottom = { marginBottom: 12 }

  return (
    <div className={styles.form}>
      <div className={styles.header}>Sign In</div>
      <Form layout="vertical">
        <Form.Item style={marginBottom} label="Email address" name="email">
          <Input placeholder="Email address" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 21 }} label="Password" name="password">
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 8 }}>
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
