import PropTypes from 'prop-types'
import React from 'react'
import styles from './Tag.module.scss'

export const Tag = ({
  children,
  style,
  onRemove,
  onClick,
}) => (
  <div className={styles.tagContainer}>
    <div
      onClick={onClick}
      className={styles.tag}
      style={{
        ...style,
        ...(onClick ? { cursor: 'pointer' } : {}),
      }}
    >
      <span className={styles.label}>
        {children}
      </span>

      {onRemove && (
        <span
          className={styles.remove}
          onClick={event => {
            event.stopPropagation()
            onRemove(event)
          }}
        />
      )}
    </div>
  </div>
)

Tag.defaultProps = {
  style: {},
}

Tag.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.instanceOf(Object),
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
}
