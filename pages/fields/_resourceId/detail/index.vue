<template>
  <app-resource-detail :resource="resource"></app-resource-detail>
</template>

<script>
import fetchAppConfiguration from '~/mixins/fetchAppConfiguration'
import useFetchesSingleResource from '~/composables/useFetchesSingleResource'
import useAppConfiguration from '~/composables/useAppConfiguration'
import AppResourceDetail from '~/components/AppResourceDetail.vue'
import Field from '~/resources/field'

export default {
  name: 'FieldDetailPage',

  components: { AppResourceDetail },

  mixins: [fetchAppConfiguration],

  setup() {
    const { appConfiguration } = useAppConfiguration()
    const resource = new Field(appConfiguration.value)

    useFetchesSingleResource(resource)

    return {
      resource,
    }
  },
}
</script>
