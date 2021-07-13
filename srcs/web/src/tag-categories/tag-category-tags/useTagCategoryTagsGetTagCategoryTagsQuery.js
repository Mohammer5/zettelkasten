import { gql, useQuery } from '@apollo/client'

const TAG_CATEGORY_TAGS_GET_TAG_CATEGORY_TAGS_QUERY = gql`
  query TagCategoryTagsGetTagCategoryTagsQuery($id: ID!) {
    tagCategories(where: { id: $id }) {
      id
      tags {
        id
        label
      }
    }
  }
`

export const useTagCategoryTagsGetTagCategoryTagsQuery = id =>
  useQuery(TAG_CATEGORY_TAGS_GET_TAG_CATEGORY_TAGS_QUERY, {
    variables: { id },
  })
