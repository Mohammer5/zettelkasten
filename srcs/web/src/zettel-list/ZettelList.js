import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { ZettelTeaser } from './zettel-teaser'
import styles from './ZettelList.module.scss'
import { zettelListe } from './zettelListe'

const ZETTEL_QUERY = gql`
  query zettelQuery {
    zettels {
      id
      content
    }
  }
`

export const ZettelList = () => {
  const result = useQuery(ZETTEL_QUERY)
  console.log('result', result)

  return (
    <div className={styles.zettelList}>
      {zettelListe.map(zettel => (
        <ZettelTeaser key={zettel.id} data={zettel} />
      ))}
    </div>
  )
}
