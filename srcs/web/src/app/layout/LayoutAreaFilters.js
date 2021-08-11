import PropTypes from 'prop-types'
import React from 'react'
import styles from './LayoutAreaFilters.module.scss'

export const LayoutAreaFilters = ({ children }) => (
  <div className={styles.layoutAreaFilters}>{children}</div>
)

LayoutAreaFilters.propTypes = {
  children: PropTypes.any.isRequired,
}
