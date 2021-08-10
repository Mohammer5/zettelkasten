import { Form } from 'react-final-form'
import { useHistory, useParams } from 'react-router-dom'
import React from 'react'
import { TagForm } from '../tag-form'
import { useTagEditGetTagQuery } from './useTagEditGetTagQuery'
import { useTagEditUpdateTagAndCreateTagCategoryMutation } from './useTagEditUpdateTagAndCreateTagCategoryMutation'
import { useTagEditUpdateTagMutation } from './useTagEditUpdateTagMutation'

export const TagEdit = () => {
  const history = useHistory()
  const { id } = useParams()

  const {
    loading: loadingTag,
    error: errorTag,
    data,
  } = useTagEditGetTagQuery(id)

  const [updateTag, { loading: loadingUpdateTag, error: errorUpdateTag }] =
    useTagEditUpdateTagMutation()

  const [updateTagAndCreateTagCategory, {
    loading: loadingUpdateTagAndCreateTagCategory,
    error: errorUpdateTagAndCreateTagCategory,
  }] =
    useTagEditUpdateTagAndCreateTagCategoryMutation()

  const loading = loadingTag || loadingUpdateTag || loadingUpdateTagAndCreateTagCategory
  const error = errorTag || errorUpdateTag || errorUpdateTagAndCreateTagCategory
  if (loading) return 'Loading...'
  if (error) return `Error: ${error.toString()}`

  const [tag] = data?.tags
  const initialValues = {
    label: tag.label,
    tagCategory: tag.category.id,
  }
  const onSubmit = async values => {
    console.log('values', values)
    return Promise.reject('ERROR!')

    const { label, tagCategory, tagCategoryNew } = values

    if (tagCategory && tagCategoryNew) {
      throw new Error('@TODO: tagCategory & tagCategoryNew should never be truthy at the same time')
    }

    const mutator = tagCategory ? updateTag : updateTagAndCreateTagCategory
    const variables = { label, id: tag.id }

    if (tagCategory) {
      variables.tagCategoryId = tagCategory
      variables.prevTagCategoryId = tag.category.id
    } else if (tagCategoryNew) {
      variables.tagCategoryLabel = tagCategoryNew.label
      variables.tagCategoryColor = tagCategoryNew.color
      variables.prevTagCategoryId = tag.category.id
    }

    await mutator({ variables })
    history.push('/tags')
  }

  return (
    <div style={{ padding: 16 }}>
      <Form onSubmit={onSubmit} initialValues={initialValues}>
        {({ handleSubmit, pristine }) => (
          <TagForm
            disableSubmit={loading || pristine}
            onCancel={() => history.push('/tags')}
            onSubmit={handleSubmit}
            tagId={id}
          />
        )}
      </Form>
    </div>
  )
}
