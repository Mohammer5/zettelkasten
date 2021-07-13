import { gql, useMutation } from '@apollo/client'

const TAG_ADD_CREATE_TAG_MUTATION = gql`
  mutation TagAddCreateTagMutation($label: ID!) {
    createTags(input: { label: $label }) {
      tags {
        id
        label
      }
    }
  }
`

const refetchQueries = ['TagsListGetTags']

export const useTagAddCreateTagMutation = () =>
  useMutation(TAG_ADD_CREATE_TAG_MUTATION, { refetchQueries })
