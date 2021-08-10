import { gql, useMutation } from '@apollo/client'

const TAG_ADD_CREATE_TAG_AND_TAG_CATEGORY_MUTATION = gql`
  mutation TagAddCreateTagAndTagCategoryMutation(
    $label: ID!,
    $tagCategoryLabel: ID!,
    $tagCategoryColor: String!
  ) {
    createTags(
      input: {
        label: $label,
        category: {
          create: {
            node: {
              label: $tagCategoryLabel,
              color: $tagCategoryColor
            }
          }
        }
      }
    ) {
      tags {
        id
        label
        category {
          id
          label
          color
        }
      }
    }
  }
`

export const useTagAddCreateTagAndTagCategoryMutation = () =>
  useMutation(TAG_ADD_CREATE_TAG_AND_TAG_CATEGORY_MUTATION)
