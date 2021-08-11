import { Button } from '@dhis2/ui'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Tag, GlobalLoadingError, GlobalLoadingIndicator } from '../../shared'
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
  if (loading) return <GlobalLoadingIndicator />
  if (error) return <GlobalLoadingError />

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

      {display && (
        <div className={styles.tagCategories}>
          {tagCategories.map(
            ({ id, label, backgroundColor, fontColor, tags }) => (
              <div key={id} className={styles.tagCategory}>
                <Tag
                  onClick={() => history.push(`/tagCategories/${id}`)}
                  onRemove={
                    !tags.length
                      ? () => deleteTagCategory({ variables: { id } })
                      : undefined
                  }
                  style={{
                    background: backgroundColor,
                    color: fontColor,
                  }}
                >
                  {label} {tags.length !== 1 && `(${tags.length} tags)`}
                  {tags.length === 1 && `(1 tag)`}
                </Tag>
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}
