import React from 'react'
import { AiFillDelete, AiOutlineClose } from "react-icons/ai"
import { Tag } from '../../../shared'
import styles from './ZettelCard.module.scss'

export const ZettelCard = ({ title, tags }) => (
  <div className={styles.container}>
    <div className={styles.contentWrapper}>
      <div className={styles.title}>
        {title}
      </div>

      <div className={styles.cardActions}>
        <div className={styles.actionWrapper}>
          <button className={styles.actionButton}>
            <AiFillDelete size={16} />
          </button>
        </div>

        <div className={styles.actionWrapper}>
          <button className={styles.actionButton}>
            <AiOutlineClose size={16} />
          </button>
        </div>
      </div>
    </div>

    <div className={styles.tags}>
      {tags.map(({ id, label, category }) => (
        <div className={styles.tag} key={id}>
          <Tag
            mini
            style={{
              backgroundColor: category.backgroundColor,
              color: category.fontColor,
            }}
          />
        </div>
      ))}
    </div>
  </div>
)
