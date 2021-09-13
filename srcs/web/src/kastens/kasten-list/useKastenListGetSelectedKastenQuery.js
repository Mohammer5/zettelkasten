import { gql, useQuery } from '@apollo/client'

const KASTEN_LIST_GET_SELECTED_KASTEN_QUERY = gql`
  query KastenListGetSelectedKastenQuery($id: ID) {
    kastens(where: { id: $id }) {
      id
      label
      contentsConnection(
        sort: {
          edge: { position: ASC }
        }
      ) {
        edges {
          position
          node {
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
      }
    }
  }
`

export const useKastenListGetSelectedKastenQuery = ({ skip, id }) =>
  useQuery(KASTEN_LIST_GET_SELECTED_KASTEN_QUERY, {
    skip,
    variables: { id },
  })
