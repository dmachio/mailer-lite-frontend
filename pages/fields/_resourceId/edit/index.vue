<template>
  <app-resource-form
    :resource="resource"
    :resource-id="resourceId"
  ></app-resource-form>
</template>

<script>
import { useRoute } from '@nuxtjs/composition-api'
import AppResourceForm from '~/components/AppResourceForm.vue'
import Field from '~/resources/field'
import fetchAppConfiguration from '~/mixins/fetchAppConfiguration'
import useFetchesSingleResource from '~/composables/useFetchesSingleResource'
import useAppConfiguration from '~/composables/useAppConfiguration'

export default {
  name: 'FieldEditPage',

  components: { AppResourceForm },

  mixins: [fetchAppConfiguration],

  setup() {
    const route = useRoute()
    const resourceId = route.value.params.resourceId
    const { appConfiguration } = useAppConfiguration()
    const resource = new Field(appConfiguration.value)

    useFetchesSingleResource(resource)

    return {
      resource,
      resourceId,
    }
  },
}
</script>
