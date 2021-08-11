import { gql, useMutation } from '@apollo/client'

const ZETTEL_ADD_CREATE_ZETTEL_MUTATION = gql`
  mutation ZettelAddCreateZettelMutation(
    $title: ID!
    $content: String!
    $tags: [ID!]!
  ) {
    createZettels(
      input: {
        title: $title
        content: $content
        tags: { connect: { where: { node: { id_IN: $tags } } } }
      }
    ) {
      zettels {
        id
        title
        content
        tags {
          id
        }
      }
    }
  }
`

export const useZettelAddCreateZettelMutation = () =>
  useMutation(ZETTEL_ADD_CREATE_ZETTEL_MUTATION)
