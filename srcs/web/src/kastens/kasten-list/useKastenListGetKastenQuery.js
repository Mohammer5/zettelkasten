import { gql, useQuery } from '@apollo/client'

const KASTEN_LIST_GET_KASTEN_QUERY = gql`
  query kastenQuery {
    kastens {
      id
      label
    }
  }
`

export const useKastenListGetKastenQuery = () =>
  useQuery(KASTEN_LIST_GET_KASTEN_QUERY)
