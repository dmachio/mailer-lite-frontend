<template>
  <v-menu
    ref="menu"
    v-model="menuModel"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-model="currentValue"
        :label="label"
        :error-messages="errorMessages"
        dense
        outlined
        readonly
        v-bind="attrs"
        v-on="on"
        @change="onChange"
        @input="onChange"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="currentValue"
      :active-picker.sync="activePicker"
      elevation="15"
      @change="$refs.menu.save(currentValue)"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import { ref, watch } from '@nuxtjs/composition-api'
import useFormField from '~/composables/useFormField'

export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
    },
    fieldName: {
      type: String,
      required: true,
    },
    field: {
      type: Object,
      required: true,
    },
    formName: {
      type: String,
      required: true,
    },
  },

  setup(props, context) {
    const { currentValue, onChange, errorMessages } = useFormField(
      props,
      context
    )

    const activePicker = ref(null)
    const menuModel = ref(false)

    watch(currentValue, () => {
      onChange()
    })

    return {
      errorMessages,
      currentValue,
      onChange,
      activePicker,
      menuModel,
    }
  },
}
</script>
