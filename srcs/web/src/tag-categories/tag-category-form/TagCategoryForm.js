import PropTypes from 'prop-types'
import React from 'react'
import { FormActions } from '../../shared'
import { TagCategoryFieldBackgroundColor } from './tag-category-field-background-color'
import { TagCategoryFieldFontColor } from './tag-category-field-font-color'
import { TagCategoryFieldLabel } from './tag-category-field-label'
import { TagCategoryTags } from './tag-category-tags'

export const TagCategoryForm = ({
  disableSubmit,
  tagCategoryId,
  onCancel,
  onSubmit,
}) => {
  return (
    <form onSubmit={event => {
      event.stopPropagation()
      onSubmit(event)
    }}>
      <div style={{ margin: '0 0 32px' }}>
        <TagCategoryFieldLabel />
      </div>

      <div style={{ margin: '0 0 32px' }}>
        <TagCategoryFieldBackgroundColor />
      </div>

      <div style={{ margin: '0 0 32px' }}>
        <TagCategoryFieldFontColor />
      </div>

      {tagCategoryId && (
        <div>
          <TagCategoryTags id={tagCategoryId} />
        </div>
      )}

      <div style={{ marginTop: 32 }}>
        <FormActions
          disabled={disableSubmit}
          onCancel={onCancel}
        />
      </div>
    </form>
  )
}

TagCategoryForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  disableSubmit: PropTypes.bool,
  tagCategoryId: PropTypes.string,
}
