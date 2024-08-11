import React from 'react'
import { Pagination } from 'antd'

export default function CustomPagination() {
  return (
    <Pagination
      defaultCurrent={1}
      total={50}
      showSizeChanger
      showQuickJumper
      onChange={(page, pageSize) => {
        console.log(page, pageSize)
      }}
    />
  )
}
