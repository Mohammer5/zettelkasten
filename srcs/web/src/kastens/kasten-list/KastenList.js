import { NoticeBox, SingleSelectField, SingleSelectOption, Field, Button } from '@dhis2/ui'
import React, { useEffect, useState } from 'react'
import { GlobalLoadingError, GlobalLoadingIndicator, Markdown } from '../../shared'
import styles from './KastenList.module.scss'
import { useKastenListGetKastensQuery } from './useKastenListGetKastensQuery'
import { useKastenListGetSelectedKastenQuery } from './useKastenListGetSelectedKastenQuery'
import { AddLinkZettel } from './add-link-zettel'
import { ChooseZettelModal } from './choose-zettel-modal'
import { ZettelCard } from './zettel-card'

// const times = [0, 1, 2, 3, 4, 5, 6, 7, 8]

export const KastenList = () => {
  // persist position to link, so we can show a modal
  const [linkAt, setLinkAt] = useState(null)

  // persist position to add, so we can show a modal
  // eslint-disable-next-line no-unused-vars
  const [addAt, setAddAt] = useState(null)

  const {
    loading: loadingKastens,
    error: errorKastens,
    data: dataKastens,
  } = useKastenListGetKastensQuery()
  const [selectedKastenId, setSelectedKastenId] = useState(null)
  const {
    loading: loadingSelectedKasten,
    error: errorSelectedKasten,
    data: dataSelectedKasten,
  } = useKastenListGetSelectedKastenQuery({
    skip: !selectedKastenId,
    id: selectedKastenId,
  })

  useEffect(() => {
    if (dataKastens?.kastens.length === 1) {
      setSelectedKastenId(dataKastens.kastens[0].id)
    }
  }, [dataKastens])

  if (loadingKastens) return <GlobalLoadingIndicator />
  if (errorKastens) return <GlobalLoadingError />

  const { kastens } = dataKastens

  const hasKastens = kastens.length === 0
  const selectKastenHelpText =
    hasKastens ? 'Please add a kasten, no kasten exists'
    : kastens.length === 1 ? 'Disabled: Only 1 kasten exists'
    : undefined

  const selectedKasten = dataSelectedKasten?.kastens?.[0]
  const cards = selectedKasten?.contentsConnection.edges.map(({ node, position }) => ({
    ...node,
    position,
  }))

  const allCards = cards
  // const allCards = cards ? times.reduce(
  //   (all, time) => [...all, ...cards.map(card => ({ ...card, id: `${card.id}-${time}` }))],
  //   []
  // ) : []

  const markdown = selectedKasten && `# ${
      selectedKasten.label
    }\n${
      allCards?.map(
        ({ id, content, title }) => (`## ${title}\n${content}\n`)
      ).join('')
    }`

  const createOnLinkClick = position => () => {
    setLinkAt(position)
  }

  const createOnAddClick = position => () => {
    setAddAt(position)
  }

  return (
    <div className={styles.container}>
      <div className={styles.kastenSelectionAndOverview}>
        <div className={styles.kastenSelectContainer}>
          <div className={styles.kastenSelectWrapper}>
            <SingleSelectField
              disabled={kastens.length < 2}
              label="Select a kasten"
              selected={selectedKastenId || ''}
              onChange={({ selected }) => setSelectedKastenId(selected)}
              helpText={selectKastenHelpText}
            >
              {kastens.map(({ id, label }) => (
                <SingleSelectOption key={id} value={id} label={label} />
            ))}
            </SingleSelectField>
          </div>

          <div>
            <Field label="&nbsp;">
              <Button primary>Add new kasten</Button>
            </Field>
          </div>
        </div>

        {loadingSelectedKasten && (
          <p>Loading selected kasten</p>
        )}

        {errorSelectedKasten && (
          <NoticeBox title="Something went wrong loading the selected kasten">
            {errorSelectedKasten.toString()}
          </NoticeBox>
        )}

        {selectedKasten && (
          <article>
            <AddLinkZettel
              onLinkClick={createOnLinkClick(0)}
              onAddClick={createOnAddClick(0)}
            />

            {allCards.map(({ id, title, tags, position }) => {
              return (
                <React.Fragment key={id}>
                  <ZettelCard title={title} tags={tags} />

                  <AddLinkZettel
                    onLinkClick={createOnLinkClick(position + 1)}
                    onAddClick={createOnAddClick(position + 1)}
                  />
                </React.Fragment>
              )
            })}
          </article>
        )}
      </div>

      {selectedKasten && (
        <div className={styles.kastenStory}>
          <Markdown>
            {markdown}
          </Markdown>
        </div>
      )}

      {linkAt && (
        <ChooseZettelModal
          onZettelChosen={zettelId => {
            console.log('Link zettel with id', zettelId, 'at position', linkAt)
          }}
          onClose={() => setLinkAt(null)}
        />
      )}
    </div>
  )
}
