import PropTypes from 'prop-types'
import React from 'react'
import styles from './TagChip.module.scss'

export const TagChip = ({ children, style, onClick, onRemove }) => {
  const _onRemove = event => {
    event.stopPropagation()
    onRemove(event)
  }

  return (
    <span className={styles.tagChip} onClick={onClick} style={style}>
      <span className={styles.label}>{children}</span>

      {onRemove && <span className={styles.remove} onClick={_onRemove} />}
    </span>
  )
}

TagChip.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.instanceOf(Object),
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
}
