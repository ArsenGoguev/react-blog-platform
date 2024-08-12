import React from 'react'
import { Form, Input, Checkbox, Button, Divider } from 'antd'
import { Link } from 'react-router-dom'

import styles from './RegistrationPage.module.scss'

export default function RegistrationPage() {
  const marginBottom = { marginBottom: 12 }

  return (
    <div className={styles.form}>
      <div className={styles.header}>Create new account</div>
      <Form layout="vertical">
        <Form.Item style={marginBottom} label="Username" name="username">
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item style={marginBottom} label="Email address" name="email">
          <Input placeholder="Email address" />
        </Form.Item>

        <Form.Item style={marginBottom} label="Password" name="password">
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item style={marginBottom} label="Repeat password" name="repeat password">
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Divider className={styles.divider} />

        <Form.Item style={{ marginBottom: 21 }} name="agreement">
          <Checkbox className={styles.checkbox}>I agree to the processing of my personal information</Checkbox>
        </Form.Item>

        <Form.Item style={{ marginBottom: 8 }}>
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
