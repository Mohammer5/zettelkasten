import { gql, useMutation } from '@apollo/client'

const TAG_ZETTELS_REMOVE_FROM_ZETTEL_MUTATION = gql`
  mutation TagZettelsRemoveFromZettel($id: ID!) {
    updateZettels(update: { tags: { disconnect: { where: { id: $id } } } }) {
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

const refetchQueries = ['TagZettelsGetTagQuery', 'TagsListGetTags']

export const useTagZettelsRemoveFromZettelMutation = () =>
  useMutation(TAG_ZETTELS_REMOVE_FROM_ZETTEL_MUTATION, { refetchQueries })
