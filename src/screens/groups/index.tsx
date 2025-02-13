import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { FlatList } from 'react-native'

import { Button } from '@components/button'
import { GroupCard } from '@components/groupCard'
import { Header } from '@components/header'
import { Highlight } from '@components/highlight'
import { ListEmpty } from '@components/listEmpity'
import * as S from './styles'

export default function Groups() {
  const [groups, setGroups] = useState<string[]>([])
  const navigation = useNavigation()

  return (
    <S.Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com sua turma" />
      <FlatList
        data={groups}
        keyExtractor={row => row}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        )}
      />
      <Button
        title="Criar nova turma"
        onPress={() => navigation.navigate('newGroup')}
      />
    </S.Container>
  )
}
