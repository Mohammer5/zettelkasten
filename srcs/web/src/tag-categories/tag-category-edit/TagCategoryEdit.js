import { Form } from 'react-final-form'
import { useHistory, useParams } from 'react-router-dom'
import React from 'react'
import { GlobalLoadingError, GlobalLoadingIndicator } from '../../shared'
import { TagCategoryForm } from '../tag-category-form'
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
  if (loading) return <GlobalLoadingIndicator />
  if (error) return <GlobalLoadingError error={error} />

  const [tagCategory] = data.tagCategories
  const initialValues = {
    label: tagCategory.label,
    backgroundColor: tagCategory.backgroundColor,
    fontColor: tagCategory.fontColor,
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
          <TagCategoryForm
            disableSubmit={loading || pristine}
            tagCategoryId={id}
            onCancel={() => history.push('/tagCategories')}
            onSubmit={handleSubmit}
          />
        )}
      </Form>
    </div>
  )
}
