import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './Tag.module.scss'

export const Tag = ({ children, mini, style, onRemove, onClick }) => (
  <div className={styles.tagContainer}>
    <div
      onClick={onClick}
      className={cx(styles.tag, { [styles.mini]: mini })}
      style={{
        ...style,
        ...(onClick ? { cursor: 'pointer' } : {}),
      }}
    >
      {!mini && <span className={styles.label}>{children}</span>}

      {!mini && onRemove && (
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
  children: PropTypes.any,
  mini: PropTypes.bool,
  style: PropTypes.instanceOf(Object),
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
}
