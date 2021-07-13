import { gql, useQuery } from '@apollo/client'

const TAG_CATEGORY_EDIT_GET_TAG_CATEGORY_QUERY = gql`
  query TagCategoryEditGetTagCategoryQuery($id: ID!) {
    tagCategories(where: { id: $id }) {
      id
      label
      color
    }
  }
`

export const useTagCategoryEditGetTagCategoryQuery = id =>
  useQuery(TAG_CATEGORY_EDIT_GET_TAG_CATEGORY_QUERY, { variables: { id } })
