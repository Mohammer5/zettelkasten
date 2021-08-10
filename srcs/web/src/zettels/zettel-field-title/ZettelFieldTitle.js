import { InputFieldFF, composeValidators, hasValue, string } from '@dhis2/ui'
import { useField } from 'react-final-form'
import React from 'react'

const validate = composeValidators(hasValue, string)

export const ZettelFieldTitle = () => {
  const { input, meta } = useField('title', { validate })

  return (
    <InputFieldFF
      required
      label="Title"
      input={input}
      meta={meta}
    />
  )
}
