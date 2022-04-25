import { useContext, useRoute, useStore } from '@nuxtjs/composition-api'

export default function useFetchesSingleResource(resource) {
  const { $axios } = useContext()
  const route = useRoute()
  const store = useStore()

  async function fetchSingleResource() {
    try {
      const { data } = await $axios.get(
        `${resource.apiUrl}/${route.value.params.resourceId}`
      )

      store.commit(`${resource.key}/saveResource`, { resource: data })
    } catch (error) {
      console.error(error)
    }
  }

  fetchSingleResource()
}
