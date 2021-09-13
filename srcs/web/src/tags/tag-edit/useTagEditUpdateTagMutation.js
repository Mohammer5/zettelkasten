import { gql, useMutation } from '@apollo/client'

const TAG_EDIT_UPDATE_TAG_MUTATION = gql`
  mutation TagEditUpdateTag(
    $id: ID!
    $label: ID!
    $tagCategoryId: ID!
    $prevTagCategoryId: ID!
  ) {
    updateTags(
      where: { id: $id }
      update: { label: $label }
      disconnect: { category: { where: { node: { id: $prevTagCategoryId } } } }
      connect: { category: { where: { node: { id: $tagCategoryId } } } }
    ) {
      tags {
        id
        label
        category {
          id
          label
        }
      }
    }
  }
`

export const useTagEditUpdateTagMutation = () =>
  useMutation(TAG_EDIT_UPDATE_TAG_MUTATION)
