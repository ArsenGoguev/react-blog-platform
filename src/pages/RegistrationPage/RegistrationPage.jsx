import React from 'react'
import { Form, Input, Checkbox, Button, Divider, Spin, Alert } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

import { useHandleUserResponse } from '../../utils/hooks.js'
import { getMarginBottom, handleEmailChange, getErrorMessage } from '../../utils/service.js'
import { userFormRules } from '../../utils/formRules.js'
import { useSignUpMutation } from '../../store/blogApi.js'

import styles from './RegistrationPage.module.scss'

export default function RegistrationPage() {
  const navigate = useNavigate()
  const [signUp, { data, isLoading, error }] = useSignUpMutation()
  const [form] = Form.useForm()

  useHandleUserResponse(data, navigate)

  const handleSignUp = ({ username, email, password }) => {
    signUp({ username, email, password })
  }

  const errorFields = getErrorMessage(error)

  return (
    <div className={styles.form}>
      {isLoading ? <Spin size="large" fullscreen /> : null}
      {errorFields.length > 0 ? (
        <Alert banner closable style={{ marginBottom: 21 }} message="You entered incorrect data" type="error" />
      ) : null}

      <div className={styles.header}>Create new account</div>
      <Form form={form} layout="vertical" onFinish={handleSignUp}>
        <Form.Item style={getMarginBottom(12)} label="Username" name="username" rules={userFormRules.username}>
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item style={getMarginBottom(12)} label="Email address" name="email" rules={userFormRules.email}>
          <Input onChange={(e) => handleEmailChange(e, form)} placeholder="Email address" />
        </Form.Item>

        <Form.Item style={getMarginBottom(12)} label="Password" name="password" rules={userFormRules.password}>
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          style={getMarginBottom(12)}
          label="Repeat password"
          name="repeatPassword"
          rules={userFormRules.repeatPassword}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Divider className={styles.divider} />

        <Form.Item style={getMarginBottom(21)} name="agreement" valuePropName="checked" rules={userFormRules.agreement}>
          <Checkbox className={styles.checkbox}>I agree to the processing of my personal information</Checkbox>
        </Form.Item>

        <Form.Item style={getMarginBottom(8)}>
          <Button block className={styles.button} type="primary" htmlType="submit">
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

      {errorFields.length > 0 && form.setFields(errorFields)}
    </div>
  )
}
