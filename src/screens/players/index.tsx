import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useRef, useState } from 'react'
import { Alert, FlatList, TextInput } from 'react-native'

import { Button, ButtonIcon } from '@components/button'
import { Filter } from '@components/filter'
import { Header } from '@components/header'
import { Highlight } from '@components/highlight'
import { Input } from '@components/input'
import { ListEmpty } from '@components/listEmpity'
import { Loader } from '@components/loader'
import { PlayerCard } from '@components/playerCard'
import { useStorageGroups } from '@storage/group'
import { Player, useStoragePlayers } from '@storage/player'
import { HandleError } from '@utils/handleError'
import { Container, Form, HeaderList, NumberOfPlayers } from './styles'

type RouteParams = {
  groupName: string
}

export default function Players() {
  const route = useRoute()
  const navigation = useNavigation()
  const { removeGroup } = useStorageGroups()
  const { getPlayers, setPlayer, removePlayer } = useStoragePlayers()

  const [team, setTeam] = useState('Time A')
  const [playerName, setPlayerName] = useState('')
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)

  const { groupName } = route.params as RouteParams
  const inputPlayerRef = useRef<TextInput>(null)
  
  async function handleAddPlayer() {
    try {
      const playerData = { name: playerName, team }
      await setPlayer(playerData, groupName)

      inputPlayerRef.current?.blur()

      setPlayerName('')
      fetchPlayerList()
    } catch (error) {
      HandleError(error as Error)
    }
  }

  async function handleRemovePlayer(playerName: string) {
    await removePlayer(playerName, groupName)
    fetchPlayerList()
  }

  async function handleRemoveGroup() {
    Alert.alert(
      'Atenção!',
      `Você realmente deseja remover o grupo ${groupName}?`,
      [
        {
          text: 'Cancelar'
        },
        {
          text: 'Confirmar',
          onPress: async () => {
            await removeGroup(groupName)
            navigation.navigate('groups')
          }
        }
      ]
    )
  }

  async function fetchPlayerList() {
    try {
      setLoading(true)

      const storage = await getPlayers(groupName)
      const playerList = storage.filter(row => row.team === team)
      setPlayers(playerList)
    } catch (error) {
      console.log(error)
      Alert.alert('Atenção!!!', 'Falha ao buscar players, tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlayerList()
  }, [team])

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={groupName}
        subtitle="Adicione a galera e separe os times"
      />
      <Form>
        <Input
          placeholder="Nome do jogador"
          inputRef={inputPlayerRef}
          value={playerName}
          onChangeText={setPlayerName}
          onSubmitEditing={handleAddPlayer}
        />
        <ButtonIcon
          icon="add"
          onPress={handleAddPlayer}
        />
      </Form>
      <HeaderList>
        <FlatList
          horizontal
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              active={item === team}
              onPress={() => setTeam(item)}
            />
          )}
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>
      {loading ? (
        <Loader />
      ) : (
        <FlatList
        data={players}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handleRemovePlayer(item.name)}
          />
        )}
        ListEmptyComponent={(
          <ListEmpty message="Sem jogadores nesse time." />
        )}
        contentContainerStyle={[
          { paddingBottom: 100 },
          !players.length && { flex: 1 }
        ]}
      />
      )}
      <Button
        type="DANGER"
        title="Remover Turma"
        onPress={handleRemoveGroup}
      />
    </Container>
  )
}
