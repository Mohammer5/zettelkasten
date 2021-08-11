import { gql, useMutation } from '@apollo/client'

const TAG_CATEGORY_EDIT_UPDATE_TAG_CATEGORY_MUTATION = gql`
  mutation TagCategoryEditUpdateTagCategoryMutation(
    $id: ID!
    $label: ID!
    $backgroundColor: ID!
    $fontColor: String!
  ) {
    updateTagCategories(
      where: { id: $id }
      update: {
        label: $label
        backgroundColor: $backgroundColor
        fontColor: $fontColor
      }
    ) {
      tagCategories {
        id
      }
    }
  }
`

export const useTagCategoryEditUpdateTagCategoryMutation = () =>
  useMutation(TAG_CATEGORY_EDIT_UPDATE_TAG_CATEGORY_MUTATION)
