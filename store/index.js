export const state = () => ({
  appConfiguration: {},
})

export const mutations = {
  saveAppConfiguration(state, { appConfiguration }) {
    state.appConfiguration = appConfiguration
  },
}
