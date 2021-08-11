import React from 'react'
import styles from './FormWizardSteps.module.scss'

const steps = [
  { label: 'First step' },
  { label: 'Second step' },
  { label: 'Thrid step' },
]

export const FormWizardSteps = () => (
  <div className={styles.steps}>
    {steps.map(({ label }, index) => {
      const number = index + 1

      return (
        <React.Fragment key={`${label}-${index}`}>
          <div className={styles.step}>
            <span className={styles['step--number']}>{number}</span>
            <span className={styles['step--label']}>{label}</span>
          </div>

          {number !== steps.length && <div className={styles.stepConnector} />}
        </React.Fragment>
      )
    })}
  </div>
)
