import PropTypes from 'prop-types'
import React from 'react'
import styles from './Tag.module.scss'

export const Tag = ({ label }) => (
  <div className={styles.tag}>
    {label}
  </div>
)

Tag.propTypes = {
  label: PropTypes.string.isRequired,
}
