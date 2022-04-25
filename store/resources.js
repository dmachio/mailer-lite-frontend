export default {
  namespaced: true,

  state: () => ({
    resources: [],
  }),

  getters: {
    resourceById: (state) => (resourceId) =>
      state.resources.find((resource) => resource.id * 1 === resourceId * 1),
  },

  mutations: {
    saveResource(state, { resource }) {
      const resources = [...state.resources]

      const index = resources.findIndex(
        (item) => item.id * 1 === resource.id * 1
      )

      if (index === -1) {
        resources.push(resource)
      } else {
        resources[index] = resource
      }

      state.resources = resources
    },
  },
}
