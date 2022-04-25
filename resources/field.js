import capitalize from '~/utils/capitalize'
import required from '~/validationRules/required'

export default class Field {
  constructor(appConfiguration) {
    this.plural = 'Fields'
    this.singular = 'Field'
    this.key = 'fields'
    this.apiUrl = `/${this.key}`
    this.appConfiguration = appConfiguration
    this.fields = this.setFields()
  }

  setFields() {
    const typeOptions = []

    if (this.appConfiguration && this.appConfiguration.field_types) {
      this.appConfiguration.field_types.forEach((fieldType) => {
        typeOptions.push({
          text: capitalize(fieldType),
          value: fieldType,
        })
      })
    }

    return [
      {
        name: 'title',
        label: 'Title',
        sortable: true,
        formField: 'app-text-field',
        validationRules: [required],
      },

      {
        name: 'type',
        label: 'Type',
        sortable: true,
        formField: 'app-select-field',
        options: typeOptions,
        validationRules: [required],
      },
    ]
  }

  populateFields(values) {
    if (!values) {
      return
    }

    this.fields = this.fields.map((field) => {
      field.value = values[field.name]
      return field
    })
  }
}
