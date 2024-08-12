import React from 'react'
import { Form, Input, Button } from 'antd'
import { useSelector } from 'react-redux'

import styles from './ProfileEditor.module.scss'

export default function ProfileEditor() {
  const { username, email } = useSelector((state) => state.blog.user)

  const handleEdit = () => {}

  const getMargin = (num) => ({ marginBottom: num })

  return (
    <div className={styles.form}>
      <div className={styles.header}>Edit Profile</div>
      <Form layout="vertical" onFinish={handleEdit}>
        <Form.Item style={getMargin(12)} label="Username" name="username">
          <Input defaultValue={username} placeholder="Username" />
        </Form.Item>

        <Form.Item style={getMargin(12)} label="Email address" name="email">
          <Input defaultValue={email} placeholder="Email address" />
        </Form.Item>

        <Form.Item style={getMargin(12)} label="New password" name="password">
          <Input.Password placeholder="New password" />
        </Form.Item>

        <Form.Item style={getMargin(21)} label="Avatar image (url)" name="avatar">
          <Input placeholder="Avatar image" />
        </Form.Item>

        <Form.Item style={getMargin(0)}>
          <Button className={styles.button} type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
