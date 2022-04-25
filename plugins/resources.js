import resources from '~/store/resources'

export default function ({ store }) {
  const supportedResources = ['fields', 'subscribers']

  supportedResources.forEach((resource) => {
    store.registerModule(resource, resources)
  })
}
