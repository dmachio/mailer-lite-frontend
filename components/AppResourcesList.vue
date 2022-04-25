<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>{{ resource.plural }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn :to="`/${resource.key}/create`" color="primary"
        >Create New {{ resource.singular }}</v-btn
      >
    </v-toolbar>
    <v-toolbar>
      <v-text-field
        v-model="filters.search"
        :label="searchFilterLabel"
        dense
        outlined
        clearable
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-select
        v-if="resource.key === 'subscribers'"
        v-model="filters.state"
        clearable
        :items="subscriberStates"
        dense
        outlined
        label="Filter by Subscriber State"
      ></v-select>
      <v-select
        v-if="resource.key === 'fields'"
        v-model="filters.type"
        clearable
        :items="fieldTypes"
        dense
        outlined
        label="Filter by Field Type"
      ></v-select>
    </v-toolbar>
    <v-data-table
      :headers="headersWithActions"
      :items="resources"
      :options.sync="options"
      :server-items-length="total"
      :loading="loading"
      class="elevation-1"
    >
      <template #[`item.actions`]="{ item }">
        <v-btn
          class="mr-2"
          small
          icon
          :to="`${resource.key}/${item.id}/detail`"
        >
          <v-icon small> mdi-eye </v-icon>
        </v-btn>
        <v-btn class="mr-2" small icon :to="`${resource.key}/${item.id}/edit`">
          <v-icon small> mdi-pencil </v-icon>
        </v-btn>
        <v-btn icon small @click="deleteItem(item)">
          <v-icon small> mdi-delete </v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5"
          >Are you sure you want to delete this item?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  computed,
  ref,
  useContext,
  useRoute,
  useRouter,
  watch,
} from '@nuxtjs/composition-api'
import jQueryParam from 'jquery-param'
import cloneDeep from 'lodash/cloneDeep'
import useDeletesResource from '~/composables/useDeletesResource'
import useAppConfiguration from '~/composables/useAppConfiguration'
import capitalize from '~/utils/capitalize'
export default {
  props: {
    resource: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const { $axios } = useContext()
    const route = useRoute()
    const router = useRouter()
    const { resource } = props
    const resources = ref([])
    const total = ref()
    const query = route.value.query
    const filters = ref({
      type: query.type ? query.type : '',
      state: query.state ? query.state : '',
      search: query.search ? query.search : '',
    })
    const loading = ref(false)

    const initialDatatableOptions = {
      page: query.page ? query.page : 1,
      itemsPerPage: query.per_page ? query.per_page * 1 : 10,
    }

    if (query.sort_by) {
      initialDatatableOptions.sortBy = [query.sort_by]
      initialDatatableOptions.sortDesc = [query.sort_order === 'desc']
    }
    const options = ref(initialDatatableOptions)

    const searchFilterLabel =
      resource.key === 'fields' ? 'Search by name' : 'Search by name or email'

    const { dialogDelete, deleteItem, deleteItemConfirm, closeDelete } =
      useDeletesResource(props, fetchResources)

    const { appConfiguration } = useAppConfiguration()
    const fieldTypes = computed(() => {
      if (!appConfiguration.value || !appConfiguration.value.field_types) {
        return []
      }

      return appConfiguration.value.field_types.map((fieldType) => {
        return {
          text: capitalize(fieldType),
          value: fieldType,
        }
      })
    })

    const subscriberStates = computed(() => {
      if (!appConfiguration.value || !appConfiguration.value.field_types) {
        return []
      }

      return appConfiguration.value.subscriber_states.map((fieldType) => {
        return {
          text: capitalize(fieldType),
          value: fieldType,
        }
      })
    })

    function getSortBy() {
      if (options.value.sortBy && options.value.sortBy.length > 0) {
        return {
          sort_by: options.value.sortBy[0],
          sort_order: options.value.sortDesc[0] ? 'desc' : 'asc',
        }
      }

      return {}
    }

    function getParams() {
      return {
        page: options.value.page,
        per_page: options.value.itemsPerPage,
        ...filters.value,
        ...getSortBy(),
      }
    }

    async function fetchResources() {
      try {
        loading.value = true

        const params = jQueryParam(getParams())

        const { data } = await $axios.get(`${resource.apiUrl}?${params}`)

        resources.value = data.data
        total.value = data.total
      } catch (error) {
        console.log(error)
      } finally {
        loading.value = false
      }
    }

    const initialParams = jQueryParam(getParams())

    watch([() => cloneDeep(filters), options], function () {
      if (initialParams !== jQueryParam(getParams())) {
        router.push({ query: getParams() })
      }
      fetchResources()
    })

    const headers = resource.fields
      .filter((field) => !field.hideFromIndex)
      .map((field) => {
        return {
          text: field.label,
          value: field.name,
          sortable: field.sortable,
        }
      })

    const headersWithActions = [
      ...headers,
      ...[
        {
          text: 'Actions',
          value: 'actions',
          sortable: false,
        },
      ],
    ]

    return {
      resources,
      total,
      loading,
      options,
      headersWithActions,
      dialogDelete,
      deleteItem,
      deleteItemConfirm,
      closeDelete,
      filters,
      fieldTypes,
      subscriberStates,
      searchFilterLabel,
    }
  },
}
</script>
