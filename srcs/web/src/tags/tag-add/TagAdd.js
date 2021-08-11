import PropTypes from 'prop-types'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { TagAddForm } from '../tag-add-form'
import { useTagAddCreateTagMutation } from './useTagAddCreateTagMutation'
import { useTagAddCreateTagAndTagCategoryMutation } from './useTagAddCreateTagAndTagCategoryMutation'

export const TagAdd = ({ onDone: customOnDone }) => {
  const history = useHistory()
  const onDone = customOnDone || (() => history.goBack())

  const [createTag, { loading: loadingCreateTag, error: errorCreateTag }] =
    useTagAddCreateTagMutation()

  const [
    createTagAndTagCategory,
    {
      loading: loadingCreateTagAndTagCategory,
      error: errorCreateTagAndTagCategory,
    },
  ] = useTagAddCreateTagAndTagCategoryMutation()

  const loading = loadingCreateTag || loadingCreateTagAndTagCategory
  const error = errorCreateTag || errorCreateTagAndTagCategory
  if (loading) return 'Loading...'
  if (error) return error.toString()

  const onCreateTag = async variables => {
    await createTag({ variables })
    onDone()
  }

  const onCreateTagAndTagCategory = async variables => {
    await createTagAndTagCategory({ variables })
    onDone()
  }

  return (
    <div style={{ padding: 16 }}>
      <TagAddForm
        onCancel={onDone}
        disableSubmit={loading}
        onCreateTag={onCreateTag}
        onCreateTagAndTagCategory={onCreateTagAndTagCategory}
      />
    </div>
  )
}

TagAdd.propTypes = {
  onDone: PropTypes.func,
}
