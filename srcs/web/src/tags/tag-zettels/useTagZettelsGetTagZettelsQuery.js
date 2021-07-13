import { gql, useQuery } from '@apollo/client'

const TAG_ZETTELS_GET_TAG_ZETTELS_QUERY = gql`
  query TagZettelsGetTagZettelsQuery($id: ID!) {
    tags(where: { id: $id }) {
      id
      zettel {
        id
        title
      }
    }
  }
`

export const useTagZettelsGetTagZettelsQuery = id => {
  const variables = { id }
  return useQuery(TAG_ZETTELS_GET_TAG_ZETTELS_QUERY, { variables })
}
