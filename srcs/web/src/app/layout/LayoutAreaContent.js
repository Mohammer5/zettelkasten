import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Sidebar } from '../sidebar'
import styles from './LayoutAreaContent.module.scss'

export const LayoutAreaContent = ({ children }) => {
  const [hidden, setHidden] = useState(false)

  return (
    <div className={styles.layoutAreaContent}>
      {children}
      <Sidebar
        hidden={hidden}
        toggleHidden={() => setHidden(!hidden)}
      />
    </div>
  )
}

LayoutAreaContent.propTypes = {
  children: PropTypes.any.isRequired,
}
