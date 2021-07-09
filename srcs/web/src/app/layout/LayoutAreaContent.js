import PropTypes from 'prop-types'
import React from 'react'
import styles from './LayoutAreaContent.module.scss'

export const LayoutAreaContent = ({ children }) => (
  <div className={styles.layoutAreaContent}>
    {children}
  </div>
)

LayoutAreaContent.propTypes = {
  children: PropTypes.any.isRequired,
}
