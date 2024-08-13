import React, { useEffect } from 'react'
import { Form, Input, Button, Spin, Alert } from 'antd'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useHandleUserResponse, getMargin, editProfileForm } from '../../utils/utils.js'
import { useUpdateUserMutation } from '../../store/blogApi.js'

import styles from './ProfileEditor.module.scss'

export default function ProfileEditor() {
  const navigate = useNavigate()
  const { username, email } = useSelector((state) => state.blog.user)
  const [updateUser, { data, isLoading, error, isSuccess }] = useUpdateUserMutation()
  const [form] = Form.useForm()

  useHandleUserResponse(data, navigate, true)

  useEffect(() => {
    form.setFieldsValue({ username, email })
  }, [username, email, form])

  const handleEdit = (values) => {
    updateUser(values).then(() => {
      form.resetFields(['password'])
    })
  }

  return (
    <div className={styles.form}>
      {isLoading ? <Spin size="large" fullscreen /> : null}
      {error ? (
        <Alert banner closable style={{ marginBottom: 21 }} message="Something went wrong, try again" type="error" />
      ) : null}
      <div className={styles.header}>Edit Profile</div>
      <Form form={form} layout="vertical" onFinish={handleEdit}>
        <Form.Item style={getMargin(12)} label="Username" name="username" rules={editProfileForm.username}>
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item style={getMargin(12)} label="Email address" name="email" rules={editProfileForm.email}>
          <Input placeholder="Email address" />
        </Form.Item>

        <Form.Item style={getMargin(12)} label="New password" name="password" rules={editProfileForm.password}>
          <Input.Password placeholder="New password" />
        </Form.Item>

        <Form.Item style={getMargin(21)} label="Avatar image (url)" name="image" rules={editProfileForm.avatarImage}>
          <Input placeholder="Avatar image" />
        </Form.Item>

        <Form.Item style={getMargin(0)}>
          <Button className={styles.button} type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
      {isSuccess && <Alert style={{ marginTop: 12 }} type="success" message="Данные успешно обновлены" showIcon />}
    </div>
  )
}
