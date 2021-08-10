import { gql, useMutation } from '@apollo/client'
import { CircularLoader } from '@dhis2/ui'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Tag } from '../../shared'

const DELETE_TAG_MUTATION = gql`
  mutation TagsListDeleteTag($id: ID!) {
    deleteTags(where: { id: $id }) {
      nodesDeleted
    }
  }
`

export const TagItem = ({ id, label, hasZettels, category }) => {
  const history = useHistory()
  const [deleteTag, { loading, error }] = useMutation(
    DELETE_TAG_MUTATION,
    { refetchQueries: ['TagsListGetTags'] }
  )

  useEffect(() => {
    if (error) {
      console.error(error)
      window.alert(error.toString())
    }
  }, [error])

  return (
    <Tag
      key={id}
      style={{
        background: category.backgroundColor,
        color: category.fontColor,
      }}
      onClick={() => history.push(`/tags/${id}`)}
      onRemove={
        !hasZettels
          ? () => deleteTag({ variables: { id } })
          : undefined
      }
    >
      <div>
        <span>
          {label}
        </span>

        {loading && <CircularLoader />}
      </div>
    </Tag>
  )
}
