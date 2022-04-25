<template>
  <app-resource-detail :resource="resource"></app-resource-detail>
</template>

<script>
import fetchAppConfiguration from '~/mixins/fetchAppConfiguration'
import useFetchesSingleResource from '~/composables/useFetchesSingleResource'
import useAppConfiguration from '~/composables/useAppConfiguration'
import Subscriber from '~/resources/subscriber'
import AppResourceDetail from '~/components/AppResourceDetail.vue'

export default {
  name: 'SubscriberDetailPage',

  components: { AppResourceDetail },

  mixins: [fetchAppConfiguration],

  setup() {
    const { appConfiguration } = useAppConfiguration()
    const resource = new Subscriber(appConfiguration.value)

    useFetchesSingleResource(resource)

    return {
      resource,
    }
  },
}
</script>
