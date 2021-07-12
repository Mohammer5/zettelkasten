import { gql, useMutation } from '@apollo/client'

const TAG_EDIT_REMOVE_FROM_ZETTEL_MUTATION = gql`
  mutation TagEditRemoveFromZettel($id: ID!) {
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

const refetchQueries = ['TagEditGetTagQuery', 'TagsListGetTags']

export const useTagEditRemoveFromZettelMutation = () =>
  useMutation(TAG_EDIT_REMOVE_FROM_ZETTEL_MUTATION, { refetchQueries })
