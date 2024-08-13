import React from 'react'
import { Form, Input, Button } from 'antd'

import { getMargin } from '../../utils/utils.js'

import styles from './PostCreator.module.scss'

export default function PostCreator() {
  const handleCreate = () => {}

  return (
    <div className={styles.form}>
      <div className={styles.header}>Create new article</div>

      <Form layout="vertical" onFinish={handleCreate}>
        <Form.Item style={getMargin(21)} label="Title" name="title">
          <Input placeholder="Title" />
        </Form.Item>

        <Form.Item style={getMargin(21)} label="Short description" name="description">
          <Input placeholder="Description" />
        </Form.Item>

        <Form.Item style={getMargin(21)} label="Text" name="text">
          <Input.TextArea placeholder="Text" rows={8} />
        </Form.Item>

        <Form.Item style={getMargin(0)}>
          <Button className={styles.button} type="primary" htmlType="submit">
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
