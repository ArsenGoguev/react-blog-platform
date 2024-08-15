import React, { useEffect } from 'react'
import { Form, Input, Button, Alert } from 'antd'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useHandleUserResponse } from '../utils/hooks.js'
import { getMarginBottom, handleEmailChange, getErrorMessage } from '../utils/service.js'
import { editProfileForm } from '../utils/formRules.js'
import { useUpdateUserMutation } from '../store/blogApi.js'
import styles from '../styles/modules/Form.module.scss'
import Spinner from '../components/Spinner/Spinner.jsx'

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

  const errorFields = getErrorMessage(error)

  return (
    <div className={styles.form}>
      {isLoading ? <Spinner fullscreen={true} /> : null}
      {errorFields.length > 0 ? (
        <Alert banner closable style={getMarginBottom(21)} message="You entered incorrect data" type="error" />
      ) : null}
      <div className={styles.header}>Edit Profile</div>
      <Form form={form} layout="vertical" onFinish={handleEdit}>
        <Form.Item style={getMarginBottom(12)} label="Username" name="username" rules={editProfileForm.username}>
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item style={getMarginBottom(12)} label="Email address" name="email" rules={editProfileForm.email}>
          <Input onChange={(e) => handleEmailChange(e, form)} placeholder="Email address" />
        </Form.Item>

        <Form.Item style={getMarginBottom(12)} label="New password" name="password" rules={editProfileForm.password}>
          <Input.Password placeholder="New password" />
        </Form.Item>

        <Form.Item
          style={getMarginBottom(21)}
          label="Avatar image (url)"
          name="image"
          rules={editProfileForm.avatarImage}
        >
          <Input placeholder="Avatar image" />
        </Form.Item>

        <Form.Item style={getMarginBottom(0)}>
          <Button block className={styles.button} type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
      {isSuccess && <Alert style={{ marginTop: 12 }} type="success" message="Данные успешно обновлены" showIcon />}
      {errorFields.length > 0 && form.setFields(errorFields)}
    </div>
  )
}
