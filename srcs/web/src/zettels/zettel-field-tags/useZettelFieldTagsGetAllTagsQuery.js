import { gql, useQuery } from '@apollo/client'

const ZETTEL_FIELD_TAGS_GET_ALL_TAGS_QUERY = gql`
  query ZettelFieldTagsGetAllTagsQuery {
    tags {
      id
      label
      category {
        color
      }
    }
  }
`

export const useZettelFieldTagsGetAllTagsQuery = () =>
  useQuery(ZETTEL_FIELD_TAGS_GET_ALL_TAGS_QUERY, {
    fetchPolicy: 'network-only',
  })
