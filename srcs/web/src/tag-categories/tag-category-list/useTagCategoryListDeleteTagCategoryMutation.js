import { gql, useMutation } from '@apollo/client'

const TAG_CATEGORY_LIST_DELETE_TAG_CATEGORY_MUTATION = gql`
  mutation TagCategoryListDeleteTagCategoryMutation($id: ID!) {
    deleteTagCategories(where: { id: $id }) {
      nodesDeleted
    }
  }
`

const refetchQueries = ['TagCategoryListGetTagCategoriesQuery']

export const useTagCategoryListDeleteTagCategoryMutation = () =>
  useMutation(TAG_CATEGORY_LIST_DELETE_TAG_CATEGORY_MUTATION, {
    refetchQueries,
  })
