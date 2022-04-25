<template>
  <v-form ref="formRef" class="c-app-form" @submit.prevent="submit">
    <component
      :is="field.formField"
      v-for="field in fields"
      :key="`field-${field.name}`"
      :field-name="field.name"
      :field="field"
      :label="field.label"
      :form-name="formName"
      :rules="field.validationRules"
      :value="field.value"
    ></component>

    <div class="d-flex">
      <v-btn type="button" @click="goBack()">Cancel</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" type="submit" :loading="isSubmitting">{{
        submitButtonLabel
      }}</v-btn>
    </div>
  </v-form>
</template>

<script>
import { useStore, computed, ref, useRouter } from '@nuxtjs/composition-api'
import AppTextField from '~/components/forms/AppTextField.vue'
import AppSelectField from '~/components/forms/AppSelectField.vue'
import AppNumberField from '~/components/forms/AppNumberField.vue'
import AppSwitchField from '~/components/forms/AppSwitchField.vue'
import AppDatePickerField from '~/components/forms/AppDatePickerField.vue'

export default {
  components: {
    AppTextField,
    AppSelectField,
    AppNumberField,
    AppSwitchField,
    AppDatePickerField,
  },

  props: {
    fields: {
      type: Array,
      required: true,
    },

    handleSubmit: {
      type: Function,
      required: true,
    },

    submitButtonLabel: {
      type: String,
      required: true,
    },

    formName: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const { handleSubmit, formName } = props
    const formRef = ref(null)
    const store = useStore()
    const router = useRouter()
    const isSubmitting = computed(() =>
      store.getters['forms/isSubmitting'](formName)
    )
    const formValues = computed(() => store.getters['forms/values'](formName))

    function submit() {
      const valid = formRef.value.validate()
      if (valid) {
        handleSubmit(formValues.value)
      }
    }

    function goBack() {
      router.go(-1)
    }

    return { submit, formRef, isSubmitting, goBack }
  },
}
</script>
