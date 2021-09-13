import {
  Button,
  ButtonStrip,
  InputField,
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle,
} from '@dhis2/ui'
import { useState } from 'react'

export const ChooseZettelModal = ({ onZettelChosen, onClose }) => {
  const [search, setSearch] = useState('')
  const [zettelId, setZettelId] = useState('')

  return (
    <Modal>
      <ModalTitle>
        Choose a zettel
      </ModalTitle>

      <ModalContent>
        <InputField
          label="Search zettels"
          onChange={({ value }) => setSearch(value)}
          value={search}
        />
      </ModalContent>

      <ModalActions>
        <ButtonStrip>
          <Button
            secondary
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            primary
            disabled={!zettelId}
            onClick={() => onZettelChosen(zettelId)}
          >
            Select zettel
          </Button>
        </ButtonStrip>
      </ModalActions>
    </Modal>
  )
}
