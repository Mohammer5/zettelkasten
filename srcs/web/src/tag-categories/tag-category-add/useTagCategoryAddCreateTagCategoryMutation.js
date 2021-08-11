import { gql, useMutation } from '@apollo/client'

const TAG_CATEGORY_ADD_CREATE_TAG_CATEGORY_MUTATION = gql`
  mutation TagCategoryAddCreateTagCategoryMutation(
    $label: ID!
    $backgroundColor: ID!
    $fontColor: String!
  ) {
    createTagCategories(
      input: {
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

export const useTagCategoryAddCreateTagCategoryMutation = () =>
  useMutation(TAG_CATEGORY_ADD_CREATE_TAG_CATEGORY_MUTATION)
