import { Button, ButtonStrip } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

export const FormActions = ({ disableSubmit, onCancel }) => (
  <ButtonStrip>
    <Button onClick={onCancel}>Cancel</Button>

    <Button primary type="submit" disabled={disableSubmit}>
      Submit
    </Button>
  </ButtonStrip>
)

FormActions.propTypes = {
  onCancel: PropTypes.func.isRequired,
  disableSubmit: PropTypes.bool,
}
