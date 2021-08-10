import { Button, NoticeBox } from '@dhis2/ui'
import React from 'react'
import { useHistory } from 'react-router-dom'
import styles from './ZettelList.module.scss'
import { useZettelListGetZettelsQuery } from './useZettelListGetZettelsQuery'
import { ZettelTeaser } from './zettel-teaser'

export const ZettelList = () => {
  const history = useHistory()
  const {
    loading: loadingZettels,
    error: errorZettels,
    data,
  } = useZettelListGetZettelsQuery()

  const loading = loadingZettels
  const error = errorZettels
  if (loading) return 'Loading zettels...'
  if (error) return `Something went wrong: ${error.toString()}`

  const { zettels } = data

  return (
    <div className={styles.zettelList}>
      <div style={{ marginBottom: 32 }}>
        <Button primary onClick={() => history.push('/zettels/add')}>
          Add zettel
        </Button>
      </div>

      {!zettels.length && (
        <NoticeBox info title="There are no zettels yet">
          You can create one by clicking on the add button above
        </NoticeBox>
      )}

      {!!zettels.length && (
        zettels.map(({ id, title, content, tags }, index) => (
          <React.Fragment key={id}>
            {index !== 0 && <hr />}
            <ZettelTeaser
              id={id}
              title={title}
              content={content}
              tags={tags}
            />
          </React.Fragment>
        ))
      )}
    </div>
  )
}
