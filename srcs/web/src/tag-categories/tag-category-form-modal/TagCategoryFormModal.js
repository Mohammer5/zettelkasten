import { Modal, ModalTitle, ModalContent } from '@dhis2/ui'
import { Form } from 'react-final-form'
import PropTypes from 'prop-types'
import React from 'react'
import { TagCategoryForm } from '../tag-category-form'

export const TagCategoryFormModal = ({
  initialValues,
  title,
  onCancel,
  onSubmit,
}) => (
  <Modal>
    <ModalTitle>
      {title}
    </ModalTitle>

    <ModalContent>
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, pristine }) => (
          <TagCategoryForm
            onCancel={onCancel}
            onSubmit={handleSubmit}
          />
        )}
      </Form>
    </ModalContent>
  </Modal>
)

TagCategoryFormModal.propTypes = {
  title: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.instanceOf(Object),
}
