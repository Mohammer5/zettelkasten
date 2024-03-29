import {
  Button,
  ButtonStrip,
  InputFieldFF,
  composeValidators,
  hasValue,
  string,
} from '@dhis2/ui'
import React from 'react'
import { Form, Field } from 'react-final-form'
import styles from './KastenAdd.module.scss'

export const KastenAdd = () => {
  return (
    <div className={styles.kastenAdd}>
      <Form onSubmit={console.log.bind(null, 'onSubmit')}>
        {({ handleSubmit }) => (
          <form onSubmit={e => console.log('Submit!') || handleSubmit(e)}>
            <div className={styles.field}>
              <Field
                required
                name="label"
                label="Label"
                component={InputFieldFF}
                validate={composeValidators(hasValue, string)}
                helpText="This will contain zettel for of specific category"
              />
            </div>

            <ButtonStrip>
              <Button onClick={console.log}>Cancel</Button>

              <Button type="submit" primary onClick={console.log}>
                Submit
              </Button>
            </ButtonStrip>
          </form>
        )}
      </Form>
    </div>
  )
}
