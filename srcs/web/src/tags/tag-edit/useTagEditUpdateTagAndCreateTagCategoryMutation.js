import { gql, useMutation } from '@apollo/client'

const TAG_EDIT_UPDATE_TAG_AND_CREATE_TAG_CATEGORY_MUTATION = gql`
  mutation TagEditUpdateTagAndCreateTagCategory(
    $id: ID!
    $label: ID!
    $prevTagCategoryId: ID!
    $tagCategoryLabel: ID!
    $tagCategoryBackgroundColor: ID!
    $tagCategoryFontColor: String!
  ) {
    updateTags(
      where: { id: $id }
      update: {
        label: $label
        category: {
          create: {
            node: {
              label: $tagCategoryLabel,
              backgroundColor: $tagCategoryBackgroundColor,
              fontColor: $tagCategoryFontColor
            }
          }
        }
      }
      disconnect: { category: { where: { node: { id: $prevTagCategoryId } } } }
    ) {
      tags {
        id
        label
        categoryConnection {
          edges {
            node {
              id
              label
              backgroundColor
              fontColor
            }
          }
        }
      }
    }
  }
`

export const useTagEditUpdateTagAndCreateTagCategoryMutation = () =>
  useMutation(TAG_EDIT_UPDATE_TAG_AND_CREATE_TAG_CATEGORY_MUTATION, {
    refetchQueries: ['TagEditGetTagQuery']
  })
