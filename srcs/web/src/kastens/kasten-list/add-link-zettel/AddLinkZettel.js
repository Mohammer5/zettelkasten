import cx from 'classnames'
import React from 'react'
import { AiOutlineLink, AiOutlinePlus } from "react-icons/ai"
import styles from './AddLinkZettel.module.scss'

export const AddLinkZettel = ({ onAddClick, onLinkClick }) => {
  return (
    <div className={styles.container}>
      <button
        className={cx(styles.button, styles.addButton)}
        onClick={onAddClick}
      >
        <AiOutlinePlus size={16} />
      </button>

      <button
        className={cx(styles.button, styles.linkButton)}
        onClick={onAddClick}
      >
        <AiOutlineLink size={16} />
      </button>

      <span className={styles.infoText}>
        <span>Link/Add card here:</span>
      </span>
    </div>
  )
}
