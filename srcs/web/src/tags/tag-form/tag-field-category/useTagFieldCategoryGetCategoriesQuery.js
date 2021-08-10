import { gql, useQuery } from '@apollo/client'

const TAG_FIELD_CATEGORY_GET_CATEGORIES_QUERY = gql`
  query TagFieldCategoryGetCategoriesQuery {
    tagCategories {
      id
      label
    }
  }
`

export const useTagFieldCategoryGetCategoriesQuery = () =>
  useQuery(TAG_FIELD_CATEGORY_GET_CATEGORIES_QUERY)
