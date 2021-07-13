import { Form } from 'react-final-form'
import { useHistory } from 'react-router-dom'
import React from 'react'
import { FormActions } from '../../shared'
import { TagCategoryColorField } from '../tag-category-color-field'
import { TagCategoryLabelField } from '../tag-category-label-field'
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
          <form onSubmit={handleSubmit}>
            <div style={{ margin: '0 0 32px' }}>
              <TagCategoryLabelField />
            </div>

            <div style={{ margin: '0 0 32px' }}>
              <TagCategoryColorField />
            </div>

            <div style={{ marginTop: 32 }}>
              <FormActions
                disabled={loading || pristine}
                onCancel={() => history.push('/tagCategories')}
              />
            </div>
          </form>
        )}
      </Form>
    </div>
  )
}
