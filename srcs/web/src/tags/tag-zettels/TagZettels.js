import PropTypes from 'prop-types'
import React from 'react'
import { useTagZettelsGetTagZettelsQuery } from './useTagZettelsGetTagZettelsQuery'
import { useTagZettelsRemoveFromZettelMutation } from './useTagZettelsRemoveFromZettelMutation'
import styles from './TagZettels.module.scss'

const RemoveButton = ({ id }) => {
  const [removeFromZettel, { loading, error }] =
    useTagZettelsRemoveFromZettelMutation()

  const onRemove = () => removeFromZettel({ variables: { id } })

  return (
    <button disabled={loading} className={styles.button} onClick={onRemove}>
      {!error && '(Remove from this Zettel)'}
      {error && '(Something went wrong.. please try again)'}
    </button>
  )
}

export const TagZettels = ({ id }) => {
  const { loading, error, data } = useTagZettelsGetTagZettelsQuery(id)

  if (loading) return 'Loading zettels...'
  if (error) return `Error laoding zettels: ${error.toString()}`

  const [tag] = data.tags
  const zettelCount = tag.zettel.length
  const hasZettels = !!zettelCount

  return (
    <>
      <p>
        {zettelCount === 0 && 'Not included in any zettels'}
        {zettelCount === 1 && 'Included in the following zettel:'}
        {zettelCount > 1 && 'Included in the following zettels:'}
      </p>

      {hasZettels && (
        <ul>
          {tag.zettel.map(({ id: zettelId, title }) => (
            <li key={zettelId}>
              <span className={styles.title}>{title}</span>
              <RemoveButton id={tag.id} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

TagZettels.propTypes = {
  id: PropTypes.string.isRequired,
}
