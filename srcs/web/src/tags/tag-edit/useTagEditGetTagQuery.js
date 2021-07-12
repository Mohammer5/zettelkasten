import { gql, useQuery } from '@apollo/client'

const TAG_EDIT_GET_TAG_QUERY = gql`
  query TagEditGetTagQuery($id: ID!) {
    tags(where: { id: $id }) {
      id
      label
      zettel {
        id
        title
      }
    }
  }
`

export const useTagEditGetTagQuery = id => {
  const variables = { id }
  return useQuery(TAG_EDIT_GET_TAG_QUERY, { variables })
}
