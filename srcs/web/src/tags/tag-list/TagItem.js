import { CircularLoader } from '@dhis2/ui'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Tag } from '../../shared'
import { useTagListItemDeleteTagMutation } from './useTagListItemDeleteTagMutation'

export const TagItem = ({ id, children, hasZettels, category }) => {
  const history = useHistory()
  const [deleteTag, { loading, error }] = useTagListItemDeleteTagMutation()

  useEffect(() => {
    if (error) {
      console.error(error)
      window.alert(error.toString())
    }
  }, [error])

  return (
    <Tag
      style={{
        background: category.backgroundColor,
        color: category.fontColor,
      }}
      onClick={() => history.push(`/tags/${id}`)}
      onRemove={
        !hasZettels ? () => deleteTag({ variables: { id } }) : undefined
      }
    >
      <div>
        <span>{children}</span>

        {loading && <CircularLoader />}
      </div>
    </Tag>
  )
}
