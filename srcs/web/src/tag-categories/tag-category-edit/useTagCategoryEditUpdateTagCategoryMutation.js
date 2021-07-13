import { gql, useMutation } from '@apollo/client'

const TAG_CATEGORY_EDIT_UPDATE_TAG_CATEGORY_MUTATION = gql`
  mutation TagCategoryEditUpdateTagCategoryMutation(
    $id: ID!
    $label: ID!
    $color: String!
  ) {
    updateTagCategories(
      where: { id: $id }
      update: { label: $label, color: $color }
    ) {
      tagCategories {
        id
        label
        color
      }
    }
  }
`

const refetchQueries = ['TagCategoriesListGetTagCategories']

export const useTagCategoryEditUpdateTagCategoryMutation = () =>
  useMutation(TAG_CATEGORY_EDIT_UPDATE_TAG_CATEGORY_MUTATION, {
    refetchQueries,
  })
