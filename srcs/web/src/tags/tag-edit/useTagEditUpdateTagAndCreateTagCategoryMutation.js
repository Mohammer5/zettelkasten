import { gql, useMutation } from '@apollo/client'

const TAG_EDIT_UPDATE_TAG_AND_CREATE_TAG_CATEGORY_MUTATION = gql`
  mutation TagEditUpdateTagAndCreateTagCategory(
    $id: ID!
    $label: ID!
    $prevTagCategoryId: ID!
    $tagCategoryLabel: ID!
    $tagCategoryColor: String!
  ) {
    updateTags(
      where: { id: $id }
      update: {
        label: $label
        category: {
          create: {
            node: { label: $tagCategoryLabel, color: $tagCategoryColor }
          }
        }
      }
      disconnect: { category: { where: { node: { id: $prevTagCategoryId } } } }
    ) {
      tags {
        label
      }
    }
  }
`

export const useTagEditUpdateTagAndCreateTagCategoryMutation = () =>
  useMutation(TAG_EDIT_UPDATE_TAG_AND_CREATE_TAG_CATEGORY_MUTATION)
