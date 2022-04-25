import required from '~/validationRules/required'
import email from '~/validationRules/email'
import capitalize from '~/utils/capitalize'

export default class Subscriber {
  constructor(appConfiguration) {
    this.plural = 'Subscribers'
    this.singular = 'Subscriber'
    this.key = 'subscribers'
    this.apiUrl = `/${this.key}`
    this.appConfiguration = appConfiguration
    this.fields = this.setFields()
  }

  setFields() {
    const stateOptions = []

    if (this.appConfiguration && this.appConfiguration.subscriber_states) {
      this.appConfiguration.subscriber_states.forEach((subscriberState) => {
        stateOptions.push({
          text: capitalize(subscriberState),
          value: subscriberState,
        })
      })
    }

    const fields = [
      {
        name: 'name',
        label: 'Name',
        sortable: true,
        formField: 'app-text-field',
        validationRules: [required],
      },
      {
        name: 'email',
        label: 'Email',
        sortable: true,
        formField: 'app-text-field',
        validationRules: [required, email],
      },
      {
        name: 'state',
        label: 'State',
        sortable: true,
        formField: 'app-select-field',
        validationRules: [required],
        options: stateOptions,
      },
    ]

    if (this.appConfiguration && this.appConfiguration.fields) {
      this.appConfiguration.fields.forEach((field) => {
        fields.push({
          name: `custom_field_${field.id}`,
          label: field.title,
          formField: this.determineCustomFieldComponent(field.type),
          validationRules: [],
          hideFromIndex: true,
        })
      })
    }

    return fields
  }

  populateFields(values) {
    if (!values) {
      return
    }

    if (values.fields && Array.isArray(values.fields)) {
      values.fields.forEach((valueField) => {
        values[`custom_field_${valueField.id}`] = valueField.pivot.value
      })
    }

    this.fields = this.fields.map((field) => {
      field.value = values[field.name]
      return field
    })
  }

  determineCustomFieldComponent(fieldType) {
    const fieldTypeMapping = {
      string: 'app-text-field',
      date: 'app-date-picker-field',
      number: 'app-number-field',
      boolean: 'app-switch-field',
    }

    return fieldTypeMapping[fieldType]
  }

  prepareValuesToSave(values) {
    const attributes = Object.keys(values)
    values.fields = {}

    attributes.forEach((attribute) => {
      const result = attribute.match(/custom_field_([\d]+)/)
      const fieldValue = values[attribute]

      if (result && fieldValue !== undefined) {
        const fieldId = result[1]

        values.fields[fieldId] = fieldValue
      }
    })

    return values
  }
}
