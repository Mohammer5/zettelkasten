import { gql, useQuery } from '@apollo/client'

const TAG_LIST_GET_TAGS_QUERY = gql`
  query TagListGetTagsQuery {
    tagCategories(options: { sort: { backgroundColor: ASC } }) {
      tags(options: { sort: { label: ASC } }) {
        id
        label
        category {
          backgroundColor
          fontColor
        }
        zettel {
          id
        }
      }
    }
  }
`

export const useTagListGetTagsQuery = () => useQuery(TAG_LIST_GET_TAGS_QUERY)
