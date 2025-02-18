import { reactive } from 'vue'

const map = reactive(new Map())

export const setCallback = (key: string, callback: Function) => {
    map.set(key, callback);
}

export const getCallback = (key: string) => {
    return map.get(key);
}
