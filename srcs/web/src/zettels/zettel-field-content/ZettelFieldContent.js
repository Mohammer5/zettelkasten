import { TextAreaFieldFF, composeValidators, hasValue, string } from '@dhis2/ui'
import { useField } from 'react-final-form'
import React from 'react'

const validate = composeValidators(hasValue, string)

export const ZettelFieldContent = () => {
  const { input, meta } = useField('content', { validate })

  return (
    <TextAreaFieldFF
      required
      label="Content"
      input={input}
      meta={meta}
    />
  )
}
