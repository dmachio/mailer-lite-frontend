<template>
  <app-resources-list :resource="resource"></app-resources-list>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import useAppConfiguration from '~/composables/useAppConfiguration'
import fetchAppConfiguration from '~/mixins/fetchAppConfiguration'
import Subscriber from '~/resources/subscriber'

export default defineComponent({
  name: 'SubscriberIndexPage',

  mixins: [fetchAppConfiguration],

  setup() {
    const { appConfiguration } = useAppConfiguration()
    const resource = new Subscriber(appConfiguration.value)

    return { resource }
  },
})
</script>
