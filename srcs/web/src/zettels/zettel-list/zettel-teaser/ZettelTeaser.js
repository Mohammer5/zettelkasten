import { Button } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Tag, Markdown } from '../../../shared'
import styles from './ZettelTeaser.module.scss'

export const ZettelTeaser = ({ id, title, content, tags }) => {
  const history = useHistory()

  return (
    <article className={styles.zettelTeaser} id={`zettel-teaser-${id}`}>
      <h1 className={styles.zettelTeaserTitle}>{title}</h1>

      <div className={styles.zettelTeaserContent}>
        <Markdown>{content}</Markdown>
      </div>

      <div className={styles.zettelTeaserTags}>
        {tags.map(({ id: tagId, label, category }) => (
          <div className={styles.zettelTeaserTag} key={tagId}>
            <Tag
              style={{
                backgroundColor: category.backgroundColor,
                color: category.fontColor,
              }}
            >
              {label}
            </Tag>
          </div>
        ))}
      </div>

      <div className={styles.zettelTeaserActions}>
        <Button onClick={() => history.push(`/zettels/${id}`)}>Edit</Button>
      </div>
    </article>
  )
}

ZettelTeaser.propTypes = {
  content: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
}
