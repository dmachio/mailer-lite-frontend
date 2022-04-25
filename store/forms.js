export const state = () => ({
  forms: {},
})

export const getters = {
  isSubmitting: (state) => (formName) => {
    const form = state.forms[formName]

    if (!form) {
      return false
    }

    return form.isSubmitting
  },

  values: (state) => (formName) => {
    const form = state.forms[formName]

    if (!form) {
      return false
    }

    return form.values
  },

  fieldErrors: (state) => (formName, fieldName) => {
    const form = state.forms[formName]

    if (!form || !form.errors) {
      return
    }

    return form.errors[fieldName]
  },
}

export const mutations = {
  addForm(state, { form }) {
    const forms = { ...state.forms }

    forms[form.name] = form

    state.forms = { ...forms }
  },

  setErrors(state, { formName, errors }) {
    const forms = { ...state.forms }

    forms[formName].errors = errors

    state.forms = { ...forms }
  },

  setIsSubmitting(state, { formName, isSubmitting }) {
    const forms = { ...state.forms }

    forms[formName].isSubmitting = isSubmitting

    state.forms = { ...forms }
  },

  setFieldValue(state, { formName, fieldName, fieldValue }) {
    const forms = { ...state.forms }
    const form = forms[formName]
    const values = form.values ? form.values : {}

    values[fieldName] = fieldValue
    form.values = values

    state.forms = { ...forms }
  },
}
