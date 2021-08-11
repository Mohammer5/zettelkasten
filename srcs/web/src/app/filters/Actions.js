import React from 'react'
import { ActionButton } from './action-button'
import styles from './Actions.module.scss'

export const Actions = () => (
  <div className={styles.actions}>
    <ActionButton onClick={() => null}>{''}</ActionButton>

    <ActionButton onClick={() => null}>{''}</ActionButton>
  </div>
)
