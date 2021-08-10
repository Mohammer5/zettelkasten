import PropTypes from 'prop-types'
import cx from 'classnames'
import React, { useRef } from 'react'
import styles from './TagTransferOption.module.scss'

const DOUBLE_CLICK_MAX_DELAY = 500

export const TagTransferOption = ({
  className,
  disabled,
  dataTest,
  highlighted,
  onClick,
  onDoubleClick,
  label,
  value,
}) => {
    const doubleClickTimeout = useRef(null)

    return (
      <div
        data-test={dataTest}
        onClick={event => {
          if (disabled) return

          if (doubleClickTimeout.current) {
            clearTimeout(doubleClickTimeout.current)
            doubleClickTimeout.current = null

            onDoubleClick({ value }, event)
          } else {
            doubleClickTimeout.current = setTimeout(() => {
              clearTimeout(doubleClickTimeout.current)
              doubleClickTimeout.current = null
            }, DOUBLE_CLICK_MAX_DELAY)

            onClick({ value }, event)
          }
        }}
        data-value={value}
        className={cx(
          styles.container,
          className,
          { highlighted, disabled }
        )}
      >
          {label}
      </div>
    )
}

TagTransferOption.defaultProps = {
    dataTest: 'dhis2-uicore-transferoption',
}

TagTransferOption.propTypes = {
    label: PropTypes.any.isRequired,
    value: PropTypes.string.isRequired,
    className: PropTypes.string,
    dataTest: PropTypes.string,
    disabled: PropTypes.bool,
    highlighted: PropTypes.bool,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
}
