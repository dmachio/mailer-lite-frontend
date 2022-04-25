export default {
  async asyncData({ store, $axios }) {
    try {
      const { data } = await $axios.get(`/app-configuration`)

      store.commit(`saveAppConfiguration`, {
        appConfiguration: data,
      })
    } catch (error) {
      console.error(error)
    }
  },
}
