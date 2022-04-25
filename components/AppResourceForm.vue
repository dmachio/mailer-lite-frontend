<template>
  <v-row>
    <v-col cols="12" md="8" offset-md="2">
      <v-card elevation="2">
        <v-toolbar>
          <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <app-form
            :fields="fields"
            :submit-button-label="submitButtonLabel"
            :handle-submit="handleSubmit"
            :form-name="formName"
          ></app-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {
  computed,
  useContext,
  useRouter,
  useStore,
} from '@nuxtjs/composition-api'
import AppForm from './forms/AppForm.vue'
export default {
  components: { AppForm },

  props: {
    resourceId: {
      type: [Number, String],
    },

    resource: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const { resourceId, resource } = props
    const submitButtonLabel = resourceId ? 'Update' : 'Create'
    const { $axios } = useContext()
    const store = useStore()
    const router = useRouter()
    const formName = `${resource.key}${submitButtonLabel}Form`
    const resourceData = computed(() =>
      store.getters[`${resource.key}/resourceById`](resourceId)
    )
    const pageTitle = resourceId
      ? `Edit ${resource.singular}`
      : `Create ${resource.singular}`

    const fields = computed(() => {
      resource.populateFields(resourceData.value)

      return resource.fields
    })

    store.commit('forms/addForm', { form: { name: formName } })

    async function handleSubmit(values) {
      try {
        if (resource.prepareValuesToSave) {
          values = resource.prepareValuesToSave(values)
        }

        store.commit('forms/setIsSubmitting', { formName, isSubmitting: true })
        const method = resourceId ? 'put' : 'post'
        const url = resourceId
          ? `${resource.apiUrl}/${resourceId}`
          : resource.apiUrl

        const { data } = await $axios[method](url, values)

        router.push(`/${resource.key}/${data.id}/detail`)
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          const errors = error.response.data.errors
          store.commit('forms/setErrors', { formName, errors })
        }

        console.error(error)
      } finally {
        store.commit('forms/setIsSubmitting', { formName, isSubmitting: false })
      }
    }

    return { submitButtonLabel, handleSubmit, formName, fields, pageTitle }
  },
}
</script>
