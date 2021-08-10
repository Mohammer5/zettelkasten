import { Form } from 'react-final-form'
import { useHistory } from 'react-router-dom'
import React from 'react'
import { TagCategoryForm } from '../tag-category-form'
import { useTagCategoryAddCreateTagCategoryMutation } from './useTagCategoryAddCreateTagCategoryMutation'

export const TagCategoryAdd = () => {
  const history = useHistory()

  const [createTagCategory, { loading, error }] =
    useTagCategoryAddCreateTagCategoryMutation()

  if (loading) return 'Loading...'
  if (error) return `Error: ${error.toString()}`

  const onSubmit = async variables => {
    await createTagCategory({ variables })
    history.push('/tagCategories')
  }

  return (
    <div style={{ padding: 16 }}>
      <Form onSubmit={onSubmit}>
        {({ handleSubmit, pristine }) => (
          <TagCategoryForm
            disableSubmit={loading || pristine}
            onCancel={() => history.push('/tagCategories')}
            onSubmit={handleSubmit}
          />
        )}
      </Form>
    </div>
  )
}
