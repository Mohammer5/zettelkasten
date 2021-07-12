import React from 'react'
import { ZettelTeaser } from './zettel-teaser'
import styles from './ZettelList.module.scss'
import { useZettelListGetZettelsQuery } from './useZettelListGetZettelsQuery'

export const ZettelList = () => {
  const { data } = useZettelListGetZettelsQuery()

  return (
    <div className={styles.zettelList}>
      {data?.zettels.map(zettel => (
        <ZettelTeaser key={zettel.id} data={zettel} />
      ))}
    </div>
  )
}
