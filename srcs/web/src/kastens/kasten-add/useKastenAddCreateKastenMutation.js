import { gql, useMutation } from '@apollo/client'

const KASTEN_ADD_CREATE_KASTEN_MUTATION = gql`
  mutation kastenAddCreateKastenMutation {
    createKastens(input: { label: "Kasten label" }) {
      kastens {
        id
        label
      }
    }
  }
`

export const useKastenAddCreateKastenMutation = () =>
  useMutation(KASTEN_ADD_CREATE_KASTEN_MUTATION)
