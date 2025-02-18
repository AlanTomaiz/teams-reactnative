import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { FlatList } from 'react-native'

import { Button } from '@components/button'
import { GroupCard } from '@components/groupCard'
import { Header } from '@components/header'
import { Highlight } from '@components/highlight'
import { ListEmpty } from '@components/listEmpity'
import { useStorageGroups } from '@storage/group'
import { Container } from './styles'

export default function Groups() {
  const navigation = useNavigation()
  const { getAll } = useStorageGroups()

  const [groups, setGroups] = useState<string[]>([])

  function handleOpenGroup(groupName: string) {
    navigation.navigate('players', { groupName })
  }

  useEffect(() => {
    async function getGroups() {
      const storage = await getAll()
      setGroups(storage)
    }

    getGroups()
  }, [])

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com sua turma" />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={groups}
        keyExtractor={row => row}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
            onPress={() => handleOpenGroup(item)}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <Button
        title="Criar nova turma"
        onPress={() => navigation.navigate('newGroup')}
      />
    </Container>
  )
}
