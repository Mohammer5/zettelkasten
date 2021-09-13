import { gql, useMutation } from '@apollo/client'

const TAG_LIST_ITEM_DELETE_TAG_MUTATION = gql`
  mutation TagListItemDeleteTagMutation($id: ID!) {
    deleteTags(where: { id: $id }) {
      nodesDeleted
    }
  }
`

export const useTagListItemDeleteTagMutation = () =>
  useMutation(TAG_LIST_ITEM_DELETE_TAG_MUTATION, {
    refetchQueries: ['TagListGetTagsQuery'],
  })
