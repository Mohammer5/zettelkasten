import PropTypes from 'prop-types'
import React from 'react'
import styles from './ActionButton.module.scss'

export const ActionButton = ({ onClick, children }) => (
  <button onClick={onClick} className={styles.actionButton}>
    {children}
  </button>
)

ActionButton.propTypes = {
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
}
