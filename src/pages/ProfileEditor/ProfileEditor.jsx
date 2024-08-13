import React from 'react'
import { Form, Input, Button, Spin, Alert } from 'antd'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useHandleUserResponse, getMargin } from '../../utils/utils.js'
import { useUpdateUserMutation } from '../../store/blogApi.js'

import styles from './ProfileEditor.module.scss'

export default function ProfileEditor() {
  const navigate = useNavigate()
  const { username, email } = useSelector((state) => state.blog.user)
  const [updateUser, { data, isLoading, error }] = useUpdateUserMutation()

  useHandleUserResponse(data, navigate)

  const handleEdit = (values) => {
    updateUser(values)
  }

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
      <div className={styles.header}>Edit Profile</div>
      <Form layout="vertical" onFinish={handleEdit}>
        <Form.Item style={getMargin(12)} initialValue={username} label="Username" name="username">
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item style={getMargin(12)} initialValue={email} label="Email address" name="email">
          <Input placeholder="Email address" />
        </Form.Item>

        <Form.Item style={getMargin(12)} initialValue="" label="New password" name="password">
          <Input.Password placeholder="New password" />
        </Form.Item>

        <Form.Item style={getMargin(21)} label="Avatar image (url)" name="image">
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
