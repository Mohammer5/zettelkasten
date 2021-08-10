import { NoticeBox } from '@dhis2/ui'
import React, { useState } from 'react'
import { Form } from 'react-final-form'
import { useHistory } from 'react-router-dom'
import { FormActions } from '../../shared'
import { TagAdd } from '../../tags'
import { ZettelFieldContent } from '../zettel-field-content'
import { ZettelFieldTags } from '../zettel-field-tags'
import { ZettelFieldTitle } from '../zettel-field-title'
import { useZettelAddCreateZettelMutation } from './useZettelAddCreateZettelMutation'

const WIZARD_STEP_NEW_TAGS = 'WIZARD_STEP_NEW_TAGS'
const WIZARD_STEP_ZETTEL = 'WIZARD_STEP_ZETTEL'

export const ZettelAdd = () => {
  const history = useHistory()

  const [createZettel, {
    loading: loadingCreateZettel,
    error: errorCreateZettel,
  }] = useZettelAddCreateZettelMutation()

  const loading = loadingCreateZettel
  const error = errorCreateZettel

  const [wizardStep, setWizardStep] = useState(WIZARD_STEP_ZETTEL)
  const onTagsAddDone = async () => {
    setWizardStep(WIZARD_STEP_ZETTEL)
  }
  const onSubmit = async variables => {
    await createZettel({ variables })
    history.push('/zettels')
  }

  return (
    <div style={{ padding: 16 }}>
      {error && (
        <div style={{ margin: '0 0 32px' }}>
          <NoticeBox title="Something went wrong adding the zettel">
            {error}
          </NoticeBox>
        </div>
      )}

      <Form onSubmit={onSubmit}>
        {({ handleSubmit, pristine }) => (
          <>
            {wizardStep === WIZARD_STEP_ZETTEL && (
              <form onSubmit={handleSubmit}>
                <div style={{ margin: '0 0 32px' }}>
                  <ZettelFieldTitle />
                </div>

                <div style={{ margin: '0 0 32px' }}>
                  <ZettelFieldContent />
                </div>

                <div style={{ margin: '32px 0' }}>
                  <ZettelFieldTags />

                  <button onClick={() => setWizardStep(WIZARD_STEP_NEW_TAGS)}>
                    Add new tag
                  </button>
                </div>

                <div style={{ marginTop: 32 }}>
                  <FormActions
                    disabled={loading || pristine}
                    onCancel={() => history.push('/zettels')}
                  />
                </div>
              </form>
            )}

            {wizardStep === WIZARD_STEP_NEW_TAGS && (
              <TagAdd onDone={onTagsAddDone} />
            )}
          </>
        )}
      </Form>
    </div>
  )
}
