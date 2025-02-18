import { useState } from 'react'
import { FlatList } from 'react-native'

import { Button, ButtonIcon } from '@components/button'
import { Filter } from '@components/filter'
import { Header } from '@components/header'
import { Highlight } from '@components/highlight'
import { Input } from '@components/input'
import { ListEmpty } from '@components/listEmpity'
import { PlayerCard } from '@components/playerCard'
import { Container, Form, HeaderList, NumberOfPlayers } from './styles'

export default function Players() {
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState(['Jogador A'])

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title="Nome da turma"
        subtitle="Adicione a galera e separe os times"
      />
      <Form>
        <Input placeholder="Nome do jogador" />
        <ButtonIcon icon="add" />
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
        <NumberOfPlayers>0</NumberOfPlayers>
      </HeaderList>
      <FlatList
        data={players}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard
            name={item}
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
