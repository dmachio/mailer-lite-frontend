<template>
  <div>
    <v-toolbar dense>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{ resource.singular }} Detail</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-toolbar dense>
      <v-btn :to="`/${resource.key}`">Back To All {{ resource.plural }}</v-btn>
      <v-spacer></v-spacer>
      <v-btn :to="`/${resource.key}/${resourceId}/edit`">Edit</v-btn>
    </v-toolbar>
    <v-simple-table>
      <template #default>
        <tbody>
          <tr
            v-for="(field, fieldIndex) in fields"
            :key="`c-app-resource-detail-${fieldIndex}`"
          >
            <td style="width: 50%">{{ field.label }}</td>
            <td>{{ field.value }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { computed, useRoute, useStore } from '@nuxtjs/composition-api'
export default {
  props: {
    resource: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const { resource } = props
    const route = useRoute()
    const store = useStore()
    const resourceId = route.value.params.resourceId

    const resourceData = computed(() =>
      store.getters[`${resource.key}/resourceById`](resourceId)
    )

    const fields = computed(() => {
      resource.populateFields(resourceData.value)

      return resource.fields
    })

    return { fields, resourceId }
  },
}
</script>
