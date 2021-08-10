import PropTypes from 'prop-types'
import React from 'react'
import { FormActions } from '../../shared'
import { TagZettels } from '../tag-zettels'
import { TagFieldCategory } from './tag-field-category'
import { TagFieldLabel } from './tag-field-label'

export const TagForm = ({
  disableSubmit,
  tagId,
  onCancel,
  onSubmit,
}) => {
  return (
    <form onSubmit={event => {
      event.stopPropagation()
      onSubmit(event)
    }}>
      <div style={{ margin: '0 0 32px' }}>
        <TagFieldLabel />
      </div>

      <div style={{ margin: '0 0 32px' }}>
        <TagFieldCategory />
      </div>

      {tagId && (
        <div>
          <TagZettels id={tagId} />
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

TagForm.propTypes = {
  disableSubmit: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  tagId: PropTypes.string,
}
