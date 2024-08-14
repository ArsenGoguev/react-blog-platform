import React from 'react'
import { Spin } from 'antd'

export default function Spinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 108, marginBottom: 30 }}>
      <Spin size="large" />
    </div>
  )
}
