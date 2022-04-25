<template>
  <app-resources-list :resource="resource"></app-resources-list>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Field from '~/resources/field'
import useAppConfiguration from '~/composables/useAppConfiguration'
import fetchAppConfiguration from '~/mixins/fetchAppConfiguration'

export default defineComponent({
  name: 'FieldIndexPage',

  mixins: [fetchAppConfiguration],

  setup() {
    const { appConfiguration } = useAppConfiguration()
    const resource = new Field(appConfiguration.value)

    return { resource }
  },
})
</script>
