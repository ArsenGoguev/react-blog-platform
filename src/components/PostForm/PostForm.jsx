import React, { useEffect } from 'react'
import { Form, Input, Button, Space, Alert } from 'antd'
import PropTypes from 'prop-types'

import Spinner from '../Spinner/Spinner.jsx'
import { postFormRules } from '../../utils/formRules.js'
import { getMarginBottom } from '../../utils/service.js'

import styles from './PostForm.module.scss'

export default function PostForm({ post, handle, form, isLoading, error, isSuccess }) {
  useEffect(() => {
    if (post) {
      form.setFieldsValue({
        title: post.title,
        description: post.description,
        body: post.body,
        tagList: post.tagList
      })
    }
  }, [post, form])

  return (
    <div className={styles.form}>
      {error && <Alert type="error" message="Ooops!" description="Something went wrong!" showIcon />}
      {isLoading && <Spinner />}
      {isSuccess && (
        <Alert
          style={getMarginBottom(20)}
          type="success"
          showIcon
          message="Success!"
          description="The post was successfully sended."
        />
      )}
      <div className={styles.header}>{post ? 'Edit article' : 'Create new article'}</div>
      <Form form={form} layout="vertical" onFinish={handle}>
        <Form.Item className={styles.item} label="Title" name="title" rules={postFormRules.title}>
          <Input placeholder="Title" />
        </Form.Item>

        <Form.Item
          className={styles.item}
          label="Short description"
          name="description"
          rules={postFormRules.description}
        >
          <Input placeholder="Description" />
        </Form.Item>

        <Form.Item className={styles.item} label="Text" name="body" rules={postFormRules.text}>
          <Input.TextArea placeholder="Text" rows={8} />
        </Form.Item>

        <span className={styles.tagsHeader}>Tags</span>
        <Form.List name="tagList">
          {(fields, { add, remove }) => (
            <div className={styles.wrapper}>
              <div>
                {fields.map(({ key, name, ...restField }) => (
                  <Space className={styles.space} key={key} style={{ display: 'flex' }} align="baseline">
                    <Form.Item {...restField} name={name} rules={postFormRules.tag}>
                      <Input className={styles.input} placeholder="Tag" />
                    </Form.Item>
                    <Button className={styles.deleteButton} onClick={() => remove(name)}>
                      Delete
                    </Button>
                  </Space>
                ))}
              </div>
              <Form.Item className={styles.addButtonWrapper}>
                <Button className={styles.addButton} onClick={() => add()}>
                  Add tag
                </Button>
              </Form.Item>
            </div>
          )}
        </Form.List>

        <Form.Item style={getMarginBottom(0)}>
          <Button style={{ width: 320, marginTop: 21 }} className={styles.button} type="primary" htmlType="submit">
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

PostForm.propTypes = {
  post: PropTypes.object,
  handle: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  isSuccess: PropTypes.bool.isRequired
}
