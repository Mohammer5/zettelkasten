import { gql, useQuery } from '@apollo/client'

const ZETTEL_TEASER_GET_ZETTEL_TAGS = gql`
  query ZettelTeaserGetZettelTags($id: ID!) {
    zettels(where: { id: $id }) {
      zettels {
        tags {
          id
          label
        }
      }
    }
  }
`

export const useZettelTeaserGetZettelTags = id => {
  const variables = { id }
  return useQuery(ZETTEL_TEASER_GET_ZETTEL_TAGS, { variables })
}
