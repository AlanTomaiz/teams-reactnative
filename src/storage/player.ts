import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppError } from '@utils/appError'

export type Player = {
  name: string
  team: string
}

interface Hook {
  setPlayer(player: Player, groupName: string): Promise<void>
  getPlayers(groupName: string): Promise<Player[]>
}

const PLAYERS_COLLECTION = '@ignite:players'

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

  async function getPlayers(groupName: string) {
    const storageKey = `${PLAYERS_COLLECTION}-${groupName}`
    const storage = await AsyncStorage.getItem(storageKey)
    return (storage ? JSON.parse(storage) : []) as Player[]
  }

  return {
    setPlayer,
    getPlayers,
  }
}
