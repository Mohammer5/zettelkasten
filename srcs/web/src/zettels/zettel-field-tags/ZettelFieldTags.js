import { Field, Transfer } from '@dhis2/ui'
import { useField, useForm } from 'react-final-form'
import React from 'react'
import { useZettelFieldTagsGetAllTagsQuery } from './useZettelFieldTagsGetAllTagsQuery'

const validate = value => {
  if (!value?.length) return 'You need to select at least one tag'
  return
}

const mapTagToOption = ({ id, label, category }) => ({
  label,
  value: id,
  color: category.color,
})

export const ZettelFieldTags = () => {
  const form = useForm()
  const { input, meta } = useField('tags', { validate })

  const { loading, error, data } = useZettelFieldTagsGetAllTagsQuery()
  const options = data?.tags.map(mapTagToOption) || []

  if (error) {
    return 'Something went wrong loading the tags'
  }

  const selected = input.value || []

  return (
    <Field
      required={true}
      error={meta.error}
      valid={!meta.error}
      validationText={meta.error}
      label="Tags"
      name=""
    >
      <Transfer
        loading={loading}
        options={options}
        selected={selected}
        onChange={({ selected: nextSelected }) => {
          form.change('tags', nextSelected)
        }}
      />
    </Field>
  )
}
