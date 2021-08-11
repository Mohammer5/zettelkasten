import { SingleSelectField, SingleSelectFieldFF } from '@dhis2/ui'
import { useField } from 'react-final-form'
import React, { useState } from 'react'
import { TagCategoryFormModal } from '../../../tag-categories'
import { useTagFieldCategoryGetCategoriesQuery } from './useTagFieldCategoryGetCategoriesQuery'

const TagFieldCategoryLoading = () => (
  <SingleSelectField
    disabled
    label="Category"
    selected=""
    options={[{ value: '', label: 'Loading the categories...' }]}
  />
)

const TagFieldCategoryError = ({ error }) => (
  <SingleSelectField
    error
    disabled
    label="Category"
    selected=""
    options={[]}
    helpText={`Something went wrong loading the categories: ${error.toString()}`}
  />
)

export const TagFieldCategory = () => {
  const [showAddTagCategoryModal, setShowAddTagCategoryModal] = useState(false)
  const [showEditTagCategoryModal, setShowEditTagCategoryModal] =
    useState(false)
  const { input: inputTagCategory, meta } = useField('tagCategory')
  const { input: inputNewTagCategory } = useField('tagCategoryNew')
  const { loading, error, data } = useTagFieldCategoryGetCategoriesQuery()

  if (loading) {
    return <TagFieldCategoryLoading />
  }

  if (error) {
    return <TagFieldCategoryError error={error} />
  }

  const options = data.tagCategories.map(({ id: value, label }) => ({
    label,
    value,
  }))

  return (
    <>
      <SingleSelectFieldFF
        label="Category"
        input={{
          ...inputTagCategory,
          onChange: (...args) => {
            inputNewTagCategory.onChange(null)
            inputTagCategory.onChange(...args)
          },
        }}
        meta={meta}
        options={options}
      />

      <p>
        Alternatively you can{' '}
        <button
          type="button"
          onClick={() => setShowAddTagCategoryModal(true)}
          style={{
            background: 'none',
            border: 0,
            padding: 0,
            fontSize: 'inherit',
            lineHeight: 'inherit',
            textDecoration: 'underline',
            fontFamily: 'inherit',
            color: 'inherit',
            cursor: 'pointer',
          }}
        >
          create a new tag category
        </button>
        {inputNewTagCategory.value && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ display: 'block' }}>
              New tag category: {inputNewTagCategory.value.label}
            </span>

            <span
              style={{
                display: 'block',
                background: inputNewTagCategory.value.color,
                borderRadius: '50%',
                marginLeft: 4,
                marginRight: 4,
                width: 16,
                height: 16,
                boxShadow: '2px 2px 4px -4px #000000',
              }}
            />

            <span
              onClick={() => setShowEditTagCategoryModal(true)}
              style={{
                display: 'block',
                textDecoration: 'underline',
                cursor: 'hover',
              }}
            >
              edit
            </span>
          </div>
        )}
      </p>

      {showAddTagCategoryModal && (
        <TagCategoryFormModal
          title="Create a new category for this tag"
          onCancel={() => setShowAddTagCategoryModal(false)}
          onSubmit={values => {
            const nextNewTagCategory = { ...values, id: 'temporary-id' }
            inputTagCategory.onChange(null)
            inputNewTagCategory.onChange(nextNewTagCategory)
            setShowAddTagCategoryModal(false)
          }}
        />
      )}

      {showEditTagCategoryModal && (
        <TagCategoryFormModal
          initialValues={inputNewTagCategory.value}
          title="Create a new category for this tag"
          onCancel={() => setShowAddTagCategoryModal(false)}
          onSubmit={values => {
            const nextNewTagCategory = { ...values, id: 'temporary-id' }
            inputTagCategory.onChange(null)
            inputNewTagCategory.onChange(nextNewTagCategory)
            setShowEditTagCategoryModal(false)
          }}
        />
      )}
    </>
  )
}
