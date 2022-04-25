<template>
  <v-text-field
    v-model="currentValue"
    outlined
    dense
    :error-messages="errorMessages"
    :label="label"
    type="text"
    :rules="rules"
    @input="onChange"
  ></v-text-field>
</template>

<script>
import useFormField from '~/composables/useFormField'

export default {
  props: {
    label: {
      type: String,
    },
    value: {
      type: [String, Number],
    },
    fieldName: {
      type: String,
      required: true,
    },
    formName: {
      type: String,
      required: true,
    },
    field: {
      type: Object,
      required: true,
    },
    rules: {
      type: Array,
    },
  },

  setup(props, context) {
    const { currentValue, errorMessages, onChange } = useFormField(
      props,
      context
    )

    return {
      currentValue,
      errorMessages,
      onChange,
    }
  },
}
</script>
