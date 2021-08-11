import { gql, useMutation } from '@apollo/client'

const TAG_ADD_CREATE_TAG_MUTATION = gql`
  mutation TagAddCreateTagMutation($label: ID!, $tagCategoryId: ID!) {
    createTags(
      input: {
        label: $label
        category: { connect: { where: { node: { id: $tagCategoryId } } } }
      }
    ) {
      tags {
        id
        label
        category {
          id
        }
      }
    }
  }
`

export const useTagAddCreateTagMutation = () =>
  useMutation(TAG_ADD_CREATE_TAG_MUTATION)
