import { Form } from 'react-final-form'
import { useHistory } from 'react-router-dom'
import React from 'react'
import { FormActions } from '../../shared'
import { TagLabelField } from '../tag-label-field'
import { useTagAddCreateTagMutation } from './useTagAddCreateTagMutation'

export const TagAdd = () => {
  const history = useHistory()
  const [createTag, { loading, error }] = useTagAddCreateTagMutation()

  if (loading) return 'Loading...'
  if (error) return `Error: ${error.toString()}`

  const onSubmit = async variables => {
    await createTag({ variables })
    history.push('/tags')
  }

  return (
    <div style={{ padding: 16 }}>
      <Form onSubmit={onSubmit}>
        {({ handleSubmit, pristine }) => (
          <form onSubmit={handleSubmit}>
            <div style={{ margin: '0 0 32px' }}>
              <TagLabelField />
            </div>

            <div style={{ marginTop: 32 }}>
              <FormActions
                disabled={loading || pristine}
                onCancel={() => history.push('/tags')}
              />
            </div>
          </form>
        )}
      </Form>
    </div>
  )
}
