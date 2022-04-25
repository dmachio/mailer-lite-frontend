<template>
  <v-switch
    v-model="currentValue"
    outlined
    dense
    :error-messages="errorMessages"
    :label="label"
    :rules="rules"
    @input="onChange"
    @change="onChange"
  ></v-switch>
</template>

<script>
import useFormField from '~/composables/useFormField'

export default {
  props: {
    label: {
      type: String,
    },
    value: {
      type: [Boolean, Number],
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
