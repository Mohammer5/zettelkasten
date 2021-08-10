import { InputFieldFF, composeValidators, hasValue, string } from '@dhis2/ui'
import { useField } from 'react-final-form'
import React from 'react'

const validate = composeValidators(hasValue, string)

export const TagFieldLabel = () => {
  const { input, meta } = useField('label', { validate })

  return (
    <InputFieldFF
      required
      label="Label"
      input={input}
      meta={meta}
    />
  )
}
