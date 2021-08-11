import React from 'react'
import styles from './ToggleHidden.module.scss'

export const ToggleHidden = ({ hidden, onToggle }) => {
  return (
    <span className={styles.container} onClick={onToggle}>
      {hidden ? '<' : '>'}
    </span>
  )
}
