import { computed, ref, useStore, watch } from '@nuxtjs/composition-api'

export default function useFormField(props, context) {
  const { value, formName, fieldName } = props
  const store = useStore()
  const errorMessages = computed(() =>
    store.getters['forms/fieldErrors'](formName, fieldName)
  )

  const currentValue = ref(value)
  onChange()

  watch(
    () => props.value,
    (newValue) => {
      currentValue.value = newValue
      onChange()
    }
  )

  function onChange() {
    store.commit('forms/setFieldValue', {
      formName,
      fieldName,
      fieldValue: currentValue.value,
    })
  }

  return {
    currentValue,
    errorMessages,
    onChange,
  }
}
