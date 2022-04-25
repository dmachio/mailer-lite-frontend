import { computed, useStore } from '@nuxtjs/composition-api'

export default function useAppConfiguration() {
  const store = useStore()
  const appConfiguration = computed(() => store.state.appConfiguration)

  return { appConfiguration }
}
