import React from 'react'
import { useKastenListGetKastenQuery } from './useKastenListGetKastenQuery'

export const KastenList = () => {
  const { loading, error, data } = useKastenListGetKastenQuery()

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
