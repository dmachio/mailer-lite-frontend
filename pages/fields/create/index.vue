<template>
  <app-resource-form :resource="resource"></app-resource-form>
</template>

<script>
import AppResourceForm from '~/components/AppResourceForm.vue'
import Field from '~/resources/field'
import fetchAppConfiguration from '~/mixins/fetchAppConfiguration'
import useAppConfiguration from '~/composables/useAppConfiguration'
export default {
  name: 'FieldCreatePage',

  components: { AppResourceForm },

  mixins: [fetchAppConfiguration],

  setup() {
    const { appConfiguration } = useAppConfiguration()

    return {
      resource: new Field(appConfiguration.value),
    }
  },
}
</script>
