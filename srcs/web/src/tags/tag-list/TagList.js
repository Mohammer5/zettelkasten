import { gql, useMutation, useQuery } from '@apollo/client'
import { Chip } from '@dhis2/ui'
import { useHistory } from 'react-router-dom'
import React from 'react'

const TAGS_QUERY = gql`
  query TagsListGetTags {
    tags {
      id
      label
      zettel {
        id
      }
    }
  }
`

const DELETE_TAG_MUTATION = gql`
  mutation TagsListDeleteTag($id: ID!) {
    deleteTags(where: { id: $id }) {
      nodesDeleted
    }
  }
`

export const TagList = () => {
  const history = useHistory()
  const { loading: loadingTags, error: errorTags, data } = useQuery(TAGS_QUERY)

  const [deleteTag, { loading: loadingDelete, error: errorDelete }] =
    useMutation(DELETE_TAG_MUTATION, {
      refetchQueries: ['TagsListGetTags'],
    })

  const loading = loadingTags || loadingDelete
  const error = errorTags || errorDelete
  const hasUndeletableTags = !!data?.tags.filter(({ zettel }) => zettel.length)
    .length
  const display = !loading && !error && data

  return (
    <div style={{ padding: 16 }}>
      {loading && 'Loading...'}
      {error && `Error: ${error.toString()}`}

      {display && hasUndeletableTags && (
        <div style={{ margin: '0 0 16px' }}>
          <b>You can only remove tags that are not linked to a zettel</b>
        </div>
      )}

      {display &&
        data.tags.map(({ id, label, zettel }) => (
          <Chip
            key={id}
            onClick={() => history.push(`/tags/${id}`)}
            onRemove={
              !zettel.length
                ? () => deleteTag({ variables: { id } })
                : undefined
            }
          >
            {label}
          </Chip>
        ))}
    </div>
  )
}
