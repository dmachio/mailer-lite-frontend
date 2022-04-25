import { ref, useContext } from '@nuxtjs/composition-api'

export default function useDeletesResource(props, fetchResources) {
  const { resource } = props
  const dialogDelete = ref(false)
  const itemToDelete = ref(null)
  const { $axios } = useContext()

  function deleteItem(item) {
    itemToDelete.value = Object.assign({}, item)
    dialogDelete.value = true
  }

  async function deleteItemConfirm() {
    try {
      await $axios.delete(`/${resource.key}/${itemToDelete.value.id}`)
      await fetchResources()
      closeDelete()
    } catch (error) {
      console.log(error)
    }
  }

  function closeDelete() {
    dialogDelete.value = false
    itemToDelete.value = null
  }

  return { closeDelete, dialogDelete, deleteItem, deleteItemConfirm }
}
