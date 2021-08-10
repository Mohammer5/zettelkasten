import { Modal, ModalTitle, ModalContent } from '@dhis2/ui'
import React from 'react'
import { Form } from 'react-final-form'
import { TagForm } from '../tag-form'

export const TagFormModalContent = ({ tagCategories, onCancel, onSubmit }) => {
  return (
    <Form onSubmit={({ label, tagCategory }) => onSubmit({
      label,
      tagCategoryId: tagCategory,
    })}>
      {({ handleSubmit, pristine }) => (
        <TagForm
          disableSubmit={pristine}
          tagCategories={tagCategories}
          onCancel={onCancel}
          onSubmit={handleSubmit}
        />
      )}
    </Form>
  )
}

export const TagFormModal = ({ modalTitle, onCancel, onSubmit }) => {
  return (
    <Modal>
      <ModalTitle>
        {modalTitle}
      </ModalTitle>

      <ModalContent>
        <Form
          onSubmit={({ label, tagCategory }) => onSubmit({
            label,
            tagCategoryId: tagCategory,
          })}
        >
          {({ handleSubmit, pristine }) => (
            <TagForm
              disableSubmit={pristine}
              onCancel={onCancel}
              onSubmit={handleSubmit}
            />
          )}
        </Form>
      </ModalContent>
    </Modal>
  )
}
