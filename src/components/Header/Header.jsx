import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Header.module.scss'

export default function Header() {
  return (
    <div className={styles.header}>
      <Link to="/" className={styles['site-name']}>
        Realworld Blog
      </Link>
      <div className={styles['account-block']}>
        <Link to="/" className={styles.login}>
          Login In
        </Link>
        <Link to="/" className={styles.reg}>
          Sign In
        </Link>
      </div>
    </div>
  )
}
