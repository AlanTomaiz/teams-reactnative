import AsyncStorage from '@react-native-async-storage/async-storage'

import { AppError } from '@utils/appError'

const GROUP_COLLECTION = '@ignite:groups'

interface Hook {
  createGroup(group: string): Promise<void>
  getAll(): Promise<string[]>
}

export function useStorageGroups(): Hook {
  async function getAll(): Promise<string[]> {
    const storage = await AsyncStorage.getItem(GROUP_COLLECTION)
    return storage ? JSON.parse(storage) : []
  }

  async function createGroup(group: string) {
    const storedGroups = await getAll()
    const groupAlreadExists = storedGroups.find(row => row === group)
    if (groupAlreadExists) {
      throw new AppError('Já existe um grupo com esse nome, tente outro!')
    }

    const storage = JSON.stringify([group, ...storedGroups])
    await AsyncStorage.setItem(GROUP_COLLECTION, storage)
  }

  return {
    getAll,
    createGroup
  }
}
