/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Online, Offline } from 'react-detect-offline'
import { Alert } from 'antd'

import store from './store/store.js'
import './index.scss'
import App from './App/App.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Online>
      <Provider store={store}>
        <App />
      </Provider>
    </Online>
    <Offline>
      <Alert
        showIcon
        banner
        type="error"
        message="There is no internet connection"
        description="It looks like you have problems with the network. Check your internet connection."
      />
    </Offline>
  </React.StrictMode>
)

// постоянные get-запросы должны отключаться в production
