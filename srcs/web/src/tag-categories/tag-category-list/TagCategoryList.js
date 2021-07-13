import { Button, Chip } from '@dhis2/ui'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useTagCategoryListGetTagCategoriesQuery } from './useTagCategoryListGetTagCategoriesQuery'
import { useTagCategoryListDeleteTagCategoryMutation } from './useTagCategoryListDeleteTagCategoryMutation'
import styles from './TagCategoryList.module.scss'

export const TagCategoryList = () => {
  const history = useHistory()
  const {
    loading: tagCategoriesLoading,
    error: tagCategoriesError,
    data,
  } = useTagCategoryListGetTagCategoriesQuery()
  const [deleteTagCategory, { loading: deleteLoading, error: deleteError }] =
    useTagCategoryListDeleteTagCategoryMutation()

  const loading = tagCategoriesLoading || deleteLoading
  const error = tagCategoriesError || deleteError

  if (loading) return 'Loading tag categories...'

  if (error) return `Something went wrong: ${error.toString()}`

  const hasUndeletableTagCategories = !!data?.tagCategories.filter(
    ({ tags }) => tags.length
  ).length
  const display = !loading && !error && data
  const { tagCategories } = data

  return (
    <div className={styles.container}>
      <div style={{ marginBottom: 32 }}>
        <Button primary onClick={() => history.push('/tagCategories/add')}>
          Add tag category
        </Button>
      </div>

      {loading && 'Loading tag categories...'}
      {error &&
        `Something went wrong loading the tag categories: ${error.toString()}`}

      {display && hasUndeletableTagCategories && (
        <div className={styles.removalNotice}>
          <b>You can only remove tag categories that are not linked to a tag</b>
        </div>
      )}

      {display &&
        tagCategories.map(({ id, label, color, tags }) => (
          <Chip
            key={id}
            onClick={() => history.push(`/tagCategories/${id}`)}
            onRemove={
              !tags.length
                ? () => deleteTagCategory({ variables: { id } })
                : undefined
            }
          >
            <span className={styles.color} style={{ background: color }} />
            <span className={styles.label}>{label}</span>
            <span className={styles.tagCount}>
              {tags.length !== 1 && `(${tags.length} tags)`}
              {tags.length === 1 && `(1 tag)`}
            </span>
          </Chip>
        ))}
    </div>
  )
}
