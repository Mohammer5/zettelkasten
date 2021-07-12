import { gql, useQuery } from '@apollo/client'

const ZETTEL_QUERY = gql`
  query zettelQuery {
    zettels {
      id
      content
    }
  }
`

export const useZettelListGetZettelsQuery = () => useQuery(ZETTEL_QUERY)
