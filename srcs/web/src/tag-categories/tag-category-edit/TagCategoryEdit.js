import { Form } from 'react-final-form'
import { useHistory, useParams } from 'react-router-dom'
import React from 'react'
import { FormActions } from '../../shared'
import { TagCategoryColorField } from '../tag-category-color-field'
import { TagCategoryLabelField } from '../tag-category-label-field'
import { TagCategoryTags } from '../tag-category-tags'
import { useTagCategoryEditGetTagCategoryQuery } from './useTagCategoryEditGetTagCategoryQuery'
import { useTagCategoryEditUpdateTagCategoryMutation } from './useTagCategoryEditUpdateTagCategoryMutation'

export const TagCategoryEdit = () => {
  const history = useHistory()
  const { id } = useParams()

  const {
    loading: loadingTagCategory,
    error: errorTagCategory,
    data,
  } = useTagCategoryEditGetTagCategoryQuery(id)

  const [
    updateTagCategory,
    { loading: loadingUpdateTagCategory, error: errorUpdateTagCategory },
  ] = useTagCategoryEditUpdateTagCategoryMutation()

  const loading = loadingTagCategory || loadingUpdateTagCategory
  const error = errorTagCategory || errorUpdateTagCategory
  if (loading) return 'Loading...'
  if (error) return `Error: ${error.toString()}`

  const [tagCategory] = data.tagCategories
  const initialValues = {
    label: tagCategory.label,
    color: tagCategory.color,
  }
  const onSubmit = async values => {
    const variables = { ...values, id: tagCategory.id }
    await updateTagCategory({ variables })
    history.push('/tagCategories')
  }

  return (
    <div style={{ padding: 16 }}>
      <Form onSubmit={onSubmit} initialValues={initialValues}>
        {({ handleSubmit, pristine }) => (
          <form onSubmit={handleSubmit}>
            <div style={{ margin: '0 0 32px' }}>
              <TagCategoryLabelField />
            </div>

            <div style={{ margin: '0 0 32px' }}>
              <TagCategoryColorField />
            </div>

            <div>
              <TagCategoryTags id={id} />
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
