import { Button } from '@dhis2/ui'
import { useHistory } from 'react-router-dom'
import React from 'react'
import { GlobalLoadingError, GlobalLoadingIndicator } from '../../shared'
import { TagItem } from './TagItem'
import styles from './TagList.module.scss'
import { useTagListGetTagsQuery } from './useTagListGetTagsQuery.js'

export const TagList = () => {
  const history = useHistory()
  const { loading, error, data } = useTagListGetTagsQuery()

  const tags =
    data?.tagCategories.reduce((acc, cur) => [...acc, ...cur.tags], []) || []

  const hasUndeletableTags = !!tags.filter(({ zettel }) => zettel.length).length

  const display = !loading && !error && data

  if (loading) return <GlobalLoadingIndicator />
  if (error) return <GlobalLoadingError />

  return (
    <div style={{ padding: 16 }}>
      <div style={{ marginBottom: 32 }}>
        <Button primary onClick={() => history.push('/tags/add')}>
          Add tag
        </Button>
      </div>

      {loading && 'Loading...'}
      {error && `Error: ${error.toString()}`}

      {display && hasUndeletableTags && (
        <div style={{ margin: '0 0 16px' }}>
          <b>You can only remove tags that are not linked to a zettel</b>
        </div>
      )}

      {display && (
        <div className={styles.tags}>
          {tags.map(({ id, label, zettel, category, zettelConnection }) => {
            const { totalCount } = zettelConnection

            return (
              <div className={styles.tag} key={id}>
                <TagItem
                  id={id}
                  hasZettels={!!zettel.length}
                  category={category}
                >
                  {label}
                  {totalCount ? ` (${totalCount})` : ''}
                </TagItem>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
