<template>
  <app-resource-form :resource="resource"></app-resource-form>
</template>

<script>
import AppResourceForm from '~/components/AppResourceForm.vue'
import fetchAppConfiguration from '~/mixins/fetchAppConfiguration'
import useAppConfiguration from '~/composables/useAppConfiguration'
import Subscriber from '~/resources/subscriber'
export default {
  name: 'FieldCreatePage',

  components: { AppResourceForm },

  mixins: [fetchAppConfiguration],

  setup() {
    const { appConfiguration } = useAppConfiguration()

    return {
      resource: new Subscriber(appConfiguration.value),
    }
  },
}
</script>
