import PropTypes from 'prop-types'
import React from 'react'
import { /* Markdown, */ Tag } from '../../shared'
import { tags } from '../tags'
import styles from './ZettelTeaser.module.scss'

export const ZettelTeaser = ({ data }) => {
  const zettelTags = data.tags.map(id => tags.find(tag => tag.id === id))

  return (
    <article className={styles.zettelTeaser} id={`zettel-teaser-${data.id}`}>
      <h1 className={styles.zettelTeaserTitle}>{data.title}</h1>

      {/* <div className={styles.zettelTeaserContent}>
        <Markdown>{data.content}</Markdown>
      </div> */}

      <div className={styles.zettelTeaserTags}>
        {zettelTags.map(({ label, id }) => (
          <Tag key={id} label={label} />
        ))}
      </div>
    </article>
  )
}

ZettelTeaser.propTypes = {
  data: PropTypes.shape({
    content: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
}
