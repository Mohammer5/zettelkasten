import { gql, useQuery } from '@apollo/client'

const KASTEN_LIST_GET_KASTENS_QUERY = gql`
  query KastenListGetKastensQuery {
    kastens {
      id
      label
    }
  }
`

export const useKastenListGetKastensQuery = () =>
  useQuery(KASTEN_LIST_GET_KASTENS_QUERY)
