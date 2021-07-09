import React from 'react'
import styles from './Header.module.scss'

export const Header = () => (
  <header className={styles.header}>
    <h1 className={styles.name}>Zettelkasten</h1>
  </header>
)
