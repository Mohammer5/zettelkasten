import { gql, useMutation } from '@apollo/client'

const TAG_CATEGORY_ADD_CREATE_TAG_CATEGORY_MUTATION = gql`
  mutation TagCategoryAddCreateTagCategoryMutation(
    $label: ID!
    $color: String!
  ) {
    createTagCategories(input: { label: $label, color: $color }) {
      tagCategories {
        id
        label
        color
      }
    }
  }
`

const refetchQueries = ['TagCategoryListGetTagCategoriesQuery']

export const useTagCategoryAddCreateTagCategoryMutation = () =>
  useMutation(TAG_CATEGORY_ADD_CREATE_TAG_CATEGORY_MUTATION, {
    refetchQueries,
  })
