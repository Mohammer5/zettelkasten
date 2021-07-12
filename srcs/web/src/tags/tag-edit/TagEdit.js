import {
  Button,
  ButtonStrip,
  InputFieldFF,
  composeValidators,
  hasValue,
  string,
} from '@dhis2/ui'
import { Form, Field } from 'react-final-form'
import { useHistory, useParams } from 'react-router-dom'
import React from 'react'
import { useTagEditGetTagQuery } from './useTagEditGetTagQuery'
import { useTagEditRemoveFromZettelMutation } from './useTagEditRemoveFromZettelMutation'
import { useTagEditUpdateTagDataMutation } from './useTagEditUpdateTagDataMutation'

export const TagEdit = () => {
  const history = useHistory()
  const { id } = useParams()

  const {
    loading: loadingTag,
    error: errorTag,
    data,
  } = useTagEditGetTagQuery(id)

  const [
    removeFromZettel,
    { loading: loadingRemoveFromZettel, error: errorRemoveFromZettel },
  ] = useTagEditRemoveFromZettelMutation()

  const [updateTag, { loading: loadingUpdateTag, error: errorUpdateTag }] =
    useTagEditUpdateTagDataMutation()

  const loading = loadingTag || loadingRemoveFromZettel || loadingUpdateTag
  const error = errorTag || errorRemoveFromZettel || errorUpdateTag
  if (loading) return 'Loading...'
  if (error) return `Error: ${error.toString()}`

  const [tag] = data?.tags
  return (
    <div style={{ padding: 16 }}>
      <Form
        onSubmit={async values => {
          const variables = { ...values, id: tag.id }
          await updateTag({ variables })
          history.push('/tags')
        }}
        initialValues={{ label: tag.label }}
      >
        {({ handleSubmit, pristine }) => (
          <form onSubmit={handleSubmit}>
            <div style={{ margin: '0 0 32px' }}>
              <Field
                required
                label="Label"
                name="label"
                component={InputFieldFF}
                validate={composeValidators(hasValue, string)}
              />
            </div>

            <div>
              {!tag.zettel.length && (
                <p>Not included in any following zettels</p>
              )}

              {!!tag.zettel.length && (
                <>
                  <p>Included in the following zettels:</p>

                  <ul>
                    {tag.zettel.map(({ id: zettelId, title }) => (
                      <li key={zettelId}>
                        {`${title} `}

                        <button
                          style={{
                            border: 0,
                            padding: 0,
                            background: 'none',
                            fontFamily: 'inherit',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                          }}
                          onClick={() =>
                            removeFromZettel({ variables: { id } })
                          }
                        >
                          (Remove from this Zettel)
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div style={{ marginTop: 32 }}>
              <ButtonStrip>
                <Button onClick={() => history.push('/tags')}>Cancel</Button>

                <Button
                  primary
                  type="submit"
                  disabled={pristine}
                  onClick={console.log}
                >
                  Submit
                </Button>
              </ButtonStrip>
            </div>
          </form>
        )}
      </Form>
    </div>
  )
}
