import AsyncStorage from '@react-native-async-storage/async-storage'

import { AppError } from '@utils/appError'
import { PLAYERS_COLLECTION } from './constants'

export type Player = {
  name: string
  team: string
}

interface Hook {
  setPlayer(player: Player, groupName: string): Promise<void>
  removePlayer(playerName: string, groupName: string): Promise<void>
  getPlayers(groupName: string): Promise<Player[]>
}

export function useStoragePlayers(): Hook {
  async function setPlayer(player: Player, groupName: string) {
    const storageKey = `${PLAYERS_COLLECTION}-${groupName}`
    
    const storedPlayers = await getPlayers(groupName)
    const playerAlreadyExists = storedPlayers.find(row => row.name === player.name)
    if (playerAlreadyExists) {
      throw new AppError('Este jogador já foi adicionado ao grupo.')
    }

    const storage = JSON.stringify([player, ...storedPlayers])
    await AsyncStorage.setItem(storageKey, storage)
  }

  async function removePlayer(playerName: string, groupName: string) {
    const storageKey = `${PLAYERS_COLLECTION}-${groupName}`
    const storedPlayers = await getPlayers(groupName)

    const storageFiltered = storedPlayers.filter(row => row.name !== playerName)
    const storage = JSON.stringify(storageFiltered)

    await AsyncStorage.setItem(storageKey, storage)
  }

  async function getPlayers(groupName: string) {
    const storageKey = `${PLAYERS_COLLECTION}-${groupName}`
    const storage = await AsyncStorage.getItem(storageKey)
    return (storage ? JSON.parse(storage) : []) as Player[]
  }

  return {
    setPlayer,
    removePlayer,
    getPlayers,
  }
}
