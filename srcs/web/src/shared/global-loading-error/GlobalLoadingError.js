import { Button } from '@dhis2/ui'
import React from 'react'
import ReactDOM from 'react-dom'
import { useHistory } from 'react-router-dom'
import styles from './GlobalLoadingError.module.scss'

export const GlobalLoadingError = ({ error }) => {
  const history = useHistory()

  return ReactDOM.createPortal(
    (
      <div className={styles.globalLoadingError}>
        <div>
          <div className={styles.errorText}>
            An error occurred.. Please try again later
          </div>

          <div className={styles.buttonContainer}>
            <Button primary onClick={() => history.goBack()}>
              Go back
            </Button>
          </div>
        </div>
      </div>
    ),
    document.getElementById('root')
  )
}
