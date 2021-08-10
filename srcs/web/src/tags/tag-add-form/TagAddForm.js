import { FORM_ERROR } from 'final-form'
import PropTypes from 'prop-types'
import React from 'react'
import { Form } from 'react-final-form'
import { TagForm } from '../tag-form'

export const TagAddForm = ({
  disableSubmit,
  onCancel,
  onCreateTag,
  onCreateTagAndTagCategory,
}) => {
  const onSubmit = async values => {
    const { label, tagCategory, tagCategoryNew } = values

    if (tagCategory && tagCategoryNew) {
      return {
        [FORM_ERROR]:
          '@TODO: `tagCategory` & `tagCategoryNew` should never be truthy at the same time',
      }
    } else if (!tagCategory && !tagCategoryNew) {
      return {
        [FORM_ERROR]:
          `@TODO: something unexpected happened (${JSON.stringify(values)})`,
      }
    }

    if (tagCategory) {
      return onCreateTag({
        label,
        tagCategoryId: tagCategory,
      })
    } else {
      return onCreateTagAndTagCategory({
        label,
        tagCategoryLabel: tagCategoryNew.label,
        tagCategoryColor: tagCategoryNew.color,
      })
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <Form onSubmit={onSubmit}>
        {({ handleSubmit, pristine }) => (
          <TagForm
            disableSubmit={disableSubmit || pristine}
            onCancel={onCancel}
            onSubmit={handleSubmit}
          />
        )}
      </Form>
    </div>
  )
}

TagAddForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onCreateTag: PropTypes.func.isRequired,
  onCreateTagAndTagCategory: PropTypes.func.isRequired,
  disableSubmit: PropTypes.bool,
}
