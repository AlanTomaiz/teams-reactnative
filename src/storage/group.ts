import AsyncStorage from '@react-native-async-storage/async-storage'

import { AppError } from '@utils/appError'
import { GROUP_COLLECTION, PLAYERS_COLLECTION } from './constants'

interface Hook {
  getAll(): Promise<string[]>
  createGroup(groupName: string): Promise<void>
  removeGroup(groupName: string): Promise<void>
}

export function useStorageGroups(): Hook {
  async function getAll() {
    const storage = await AsyncStorage.getItem(GROUP_COLLECTION)
    return (storage ? JSON.parse(storage) : []) as string[]
  }

  async function createGroup(groupName: string) {
    const storedGroups = await getAll()
    const groupAlreadyExists = storedGroups.find(row => row === groupName)
    if (groupAlreadyExists) {
      throw new AppError('Já existe um grupo com esse nome, tente outro!')
    }

    const storage = JSON.stringify([groupName, ...storedGroups])
    await AsyncStorage.setItem(GROUP_COLLECTION, storage)
  }

  async function removeGroup(groupName: string) {
    const storagePlayersKey = `${PLAYERS_COLLECTION}-${groupName}`

    const storedGroups = (await getAll()).filter(row => row !== groupName)
    const storage = JSON.stringify(storedGroups)

    await AsyncStorage.setItem(GROUP_COLLECTION, storage)
    await AsyncStorage.removeItem(storagePlayersKey)
  }

  return {
    getAll,
    createGroup,
    removeGroup,
  }
}
