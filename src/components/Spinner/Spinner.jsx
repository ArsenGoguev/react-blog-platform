import React, { memo } from 'react'
import { Spin } from 'antd'
import PropTypes from 'prop-types'

function Spinner({ margin = 0, fullscreen = false }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: margin, marginBottom: 30 }}>
      <Spin fullscreen={fullscreen} size="large" />
    </div>
  )
}

Spinner.propTypes = {
  margin: PropTypes.number,
  fullscreen: PropTypes.bool
}

export default memo(Spinner)
