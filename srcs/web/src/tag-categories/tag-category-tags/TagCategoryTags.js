import { Chip } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { useTagCategoryTagsGetTagCategoryTagsQuery } from './useTagCategoryTagsGetTagCategoryTagsQuery'

export const TagCategoryTags = ({ id }) => {
  const { loading, error, data } = useTagCategoryTagsGetTagCategoryTagsQuery(id)

  if (loading) return 'Loading tag category tags...'
  if (error) return `Error laoding tag category tags: ${error.toString()}`

  const [tagCategory] = data.tagCategories
  const tagCount = tagCategory.tags.length
  const hasTags = !!tagCount

  return (
    <>
      <p>
        {tagCount === 0 && 'Not a category of any tag'}
        {tagCount === 1 && 'Category of the following tags:'}
        {tagCount > 1 && 'Category of the following tag:'}
      </p>

      {hasTags &&
        tagCategory.tags.map(({ id: tagId, label }) => (
          <Chip key={tagId}>{label}</Chip>
        ))}
    </>
  )
}

TagCategoryTags.propTypes = {
  id: PropTypes.string.isRequired,
}
