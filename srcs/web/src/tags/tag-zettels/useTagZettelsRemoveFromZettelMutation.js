import { gql, useMutation } from '@apollo/client'

const TAG_ZETTELS_REMOVE_FROM_ZETTEL_MUTATION = gql`
  mutation TagZettelsRemoveFromZettel($id: ID!) {
    updateZettels(update: {
      tags: {
        disconnect: {
          where: {
            node: {
              id: $id
            }
          }
        }
      }
    }) {
      zettels {
        id
        title
        tags {
          label
        }
      }
    }
  }
`

export const useTagZettelsRemoveFromZettelMutation = () =>
  useMutation(TAG_ZETTELS_REMOVE_FROM_ZETTEL_MUTATION)
