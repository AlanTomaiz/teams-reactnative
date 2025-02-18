import { useRoute } from '@react-navigation/native'
import { useEffect, useRef, useState } from 'react'
import { FlatList, TextInput } from 'react-native'

import { Button, ButtonIcon } from '@components/button'
import { Filter } from '@components/filter'
import { Header } from '@components/header'
import { Highlight } from '@components/highlight'
import { Input } from '@components/input'
import { ListEmpty } from '@components/listEmpity'
import { PlayerCard } from '@components/playerCard'
import { Player, useStoragePlayers } from '@storage/player'
import { HandleError } from '@utils/handleError'
import { Container, Form, HeaderList, NumberOfPlayers } from './styles'

type RouteParams = {
  groupName: string
}

export default function Players() {
  const route = useRoute()
  const { getPlayers, setPlayer } = useStoragePlayers()

  const [team, setTeam] = useState('Time A')
  const [playerName, setPlayerName] = useState('')
  const [players, setPlayers] = useState<Player[]>([])

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

  async function fetchPlayerList() {
    const storage = await getPlayers(groupName)
    const playerList = storage.filter(row => row.team === team)
    setPlayers(playerList)
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
      <FlatList
        data={players}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => console.log('CLICK')}
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
      <Button
        title="Remover Turma"
        type="DANGER"
      />
    </Container>
  )
}
