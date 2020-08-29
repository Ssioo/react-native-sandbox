import AsyncStorage from '@react-native-community/async-storage'
import { bugsnag } from 'infra/bugsnag'

export type StorageKey = string

export const storage = {
  get: async (key: StorageKey) => {
    try {
      return await AsyncStorage.getItem(key)
    } catch (e) {
      bugsnag.notify(e)
      return null
    }
  },
  set: async (key: StorageKey, value: string) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      bugsnag.notify(e)
    }
  },
  remove: async (key: StorageKey) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch (e) {
      bugsnag.notify(e)
      throw e
    }
  },
}
