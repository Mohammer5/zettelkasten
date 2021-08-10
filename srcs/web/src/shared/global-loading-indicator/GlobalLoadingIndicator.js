import React from 'react'
import ReactDOM from 'react-dom'
import styles from './GlobalLoadingIndicator.module.scss'

export const GlobalLoadingIndicator = () => {
  return ReactDOM.createPortal(
    <div className={styles.globalLoadingIndicator} />,
    document.getElementById('root')
  )
}
