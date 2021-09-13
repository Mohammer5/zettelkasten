import PropTypes from 'prop-types'
import React from 'react'
import { Sidebar } from '../sidebar'
import styles from './LayoutAreaContent.module.scss'

export const LayoutAreaContent = ({ children }) => {
  return (
    <div className={styles.layoutAreaContent}>
      {children}
      <Sidebar />
    </div>
  )
}

LayoutAreaContent.propTypes = {
  children: PropTypes.any.isRequired,
}
