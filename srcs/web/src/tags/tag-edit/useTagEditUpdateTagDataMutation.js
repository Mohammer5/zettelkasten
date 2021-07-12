import { gql, useMutation } from '@apollo/client'

const TAG_EDIT_UPDATE_TAG_DATA_MUTATION = gql`
  mutation TagEditUpdateTagData($id: ID!, $label: ID!) {
    updateTags(where: { id: $id }, update: { label: $label }) {
      tags {
        label
      }
    }
  }
`

const refetchQueries = ['TagsListGetTags']

export const useTagEditUpdateTagDataMutation = () =>
  useMutation(TAG_EDIT_UPDATE_TAG_DATA_MUTATION, { refetchQueries })
