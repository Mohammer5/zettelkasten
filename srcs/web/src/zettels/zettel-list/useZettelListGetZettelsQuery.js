import { gql, useQuery } from '@apollo/client'

const ZETTEL_LIST_GET_ZETTELS_QUERY = gql`
  query ZettelListGetZettelsQuery {
    zettels {
      id
      title
      content
      tags {
        id
        label
        category {
          backgroundColor
          fontColor
        }
      }
    }
  }
`

export const useZettelListGetZettelsQuery = () =>
  useQuery(ZETTEL_LIST_GET_ZETTELS_QUERY)
