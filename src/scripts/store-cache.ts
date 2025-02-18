import { reactive } from "vue"
import { useRoute } from "vue-router"

const map = reactive(new Map())

export const setCalledByMenu = (menu: any) => {
  map.set(menu.path, true)
}

export const isCalledByMenu = (): boolean => {
  const route = useRoute()
  return map.delete(route.fullPath)
}