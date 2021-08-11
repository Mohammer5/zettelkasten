import PropTypes from 'prop-types'
import React from 'react'
import styles from './Layout.module.scss'

export const Layout = ({ children }) => (
  <div className={styles.layout}>{children}</div>
)

Layout.propTypes = {
  children: PropTypes.any.isRequired,
}
