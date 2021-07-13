import { InputFieldFF, composeValidators, hasValue, string } from '@dhis2/ui'
import { useField } from 'react-final-form'
import React from 'react'

const hexRegExp = new RegExp('^#[a-zA-Z0-9]{6}$')

const isValidHex = value => {
  if (typeof value === 'undefined' || value === null || value === '') return

  if (hexRegExp.test(value)) return

  return 'Hex color must be in the following format: ^#[a-zA-Z0-9]{6}$'
}

const validate = composeValidators(hasValue, string, isValidHex)

export const TagCategoryColorField = () => {
  const { input, meta } = useField('color', { validate })

  return <InputFieldFF required label="Color" input={input} meta={meta} />
}
