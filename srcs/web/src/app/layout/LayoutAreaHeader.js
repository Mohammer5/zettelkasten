import PropTypes from 'prop-types'
import React from 'react'
import styles from './LayoutAreaHeader.module.scss'

export const LayoutAreaHeader = ({ children }) => (
  <div className={styles.layoutAreaHeader}>
    {children}
  </div>
)

LayoutAreaHeader.propTypes = {
  children: PropTypes.any.isRequired,
}
