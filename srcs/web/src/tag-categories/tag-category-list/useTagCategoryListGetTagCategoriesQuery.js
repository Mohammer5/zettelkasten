import { gql, useQuery } from '@apollo/client'

const TAG_CATEGORY_LIST_GET_TAG_CATEGORIES_QUERY = gql`
  query TagCategoryListGetTagCategoriesQuery {
    tagCategories {
      id
      label
      backgroundColor
      fontColor
      tags {
        id
      }
    }
  }
`

export const useTagCategoryListGetTagCategoriesQuery = () =>
  useQuery(TAG_CATEGORY_LIST_GET_TAG_CATEGORIES_QUERY)
