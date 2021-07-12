import PropTypes from 'prop-types'
import React from 'react'
import { /* Markdown, */ Tag } from '../../../shared'
import styles from './ZettelTeaser.module.scss'
import { useZettelTeaserGetZettelTags } from './useZettelTeaserGetZettelTags'

export const ZettelTeaser = ({ content, id, tags, title }) => {
  const { /* loading, error,*/ data } = useZettelTeaserGetZettelTags
  const zettelTags = data?.zettels[0].tags

  return (
    <article className={styles.zettelTeaser} id={`zettel-teaser-${id}`}>
      <h1 className={styles.zettelTeaserTitle}>{title}</h1>

      {/* <div className={styles.zettelTeaserContent}>
        <Markdown>{content}</Markdown>
      </div> */}

      <div className={styles.zettelTeaserTags}>
        {zettelTags.map(({ id: tagId, label }) => (
          <Tag key={tagId} label={label} />
        ))}
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
