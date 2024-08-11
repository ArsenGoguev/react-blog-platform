import React from 'react'
import { Pagination, ConfigProvider } from 'antd'
import PropTypes from 'prop-types'

import styles from './CustomPagination.module.scss'

export default function CustomPagination({ currentPage, onPageChange, totalPages }) {
  const changePage = (page) => {
    onPageChange(page)
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ffffff'
        },
        components: {
          Pagination: {
            itemActiveBg: '#1890FF',
            itemActiveColor: 'white',
            itemBg: 'none'
          }
        }
      }}
    >
      <Pagination
        className={styles.pagination}
        current={currentPage}
        hideOnSinglePage
        pageSize={1}
        total={totalPages}
        align="center"
        showSizeChanger={false}
        onChange={(p) => changePage(p)}
      />
    </ConfigProvider>
  )
}

CustomPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired
}
