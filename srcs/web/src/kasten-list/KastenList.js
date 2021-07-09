import { gql, useQuery } from '@apollo/client'
import React from 'react'

const KASTEN_QUERY = gql`
  query kastenQuery {
    kastens {
      id
      label
    }
  }
`

export const KastenList = () => {
  const { loading, error, data } = useQuery(KASTEN_QUERY)

  if (loading) return 'Loading...'
  if (error) return `Error: ${error.message}`

  const { kastens } = data

  return (
    <div>
      <ul>
        {kastens.map(({ id, label }) => (
          <li key={id}>{label}</li>
        ))}
      </ul>
    </div>
  )
}
