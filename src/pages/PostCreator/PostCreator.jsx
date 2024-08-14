import React from 'react'
import { Form, Input, Button, Space, Alert } from 'antd'

import Spinner from '../../components/Spinner/Spinner.jsx'
import { postFormRules } from '../../utils/formRules.js'
import { getMarginBottom } from '../../utils/service.js'
import { useCreateArticleMutation } from '../../store/blogApi.js'

import styles from './PostCreator.module.scss'

export default function PostCreator() {
  const [createArticle, { isLoading, error, isSuccess }] = useCreateArticleMutation()
  const [form] = Form.useForm()

  const handleCreate = (values) => {
    createArticle(values).then(() => {
      form.resetFields(['title', 'description', 'body', 'tagList'])
    })
  }

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
          description="The post was successfully created."
        />
      )}
      <div className={styles.header}>Create new article</div>
      <Form form={form} layout="vertical" onFinish={handleCreate}>
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
