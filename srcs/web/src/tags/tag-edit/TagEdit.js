import { Form } from 'react-final-form'
import { useHistory, useParams } from 'react-router-dom'
import React from 'react'
import { FormActions } from '../../shared'
import { TagLabelField } from '../tag-label-field'
import { TagZettels } from '../tag-zettels'
import { useTagEditGetTagQuery } from './useTagEditGetTagQuery'
import { useTagEditUpdateTagDataMutation } from './useTagEditUpdateTagDataMutation'

export const TagEdit = () => {
  const history = useHistory()
  const { id } = useParams()

  const {
    loading: loadingTag,
    error: errorTag,
    data,
  } = useTagEditGetTagQuery(id)

  const [updateTag, { loading: loadingUpdateTag, error: errorUpdateTag }] =
    useTagEditUpdateTagDataMutation()

  const loading = loadingTag || loadingUpdateTag
  const error = errorTag || errorUpdateTag
  if (loading) return 'Loading...'
  if (error) return `Error: ${error.toString()}`

  const [tag] = data?.tags
  const initialValues = { label: tag.label }
  const onSubmit = async values => {
    const variables = { ...values, id: tag.id }
    await updateTag({ variables })
    history.push('/tags')
  }

  return (
    <div style={{ padding: 16 }}>
      <Form onSubmit={onSubmit} initialValues={initialValues}>
        {({ handleSubmit, pristine }) => (
          <form onSubmit={handleSubmit}>
            <div style={{ margin: '0 0 32px' }}>
              <TagLabelField />
            </div>

            <div>
              <TagZettels id={id} />
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
