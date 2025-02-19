import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Alert, FlatList } from 'react-native'

import { Button } from '@components/button'
import { GroupCard } from '@components/groupCard'
import { Header } from '@components/header'
import { Highlight } from '@components/highlight'
import { ListEmpty } from '@components/listEmpity'
import { Loader } from '@components/loader'
import { useStorageGroups } from '@storage/group'
import { Container } from './styles'

export default function Groups() {
  const navigation = useNavigation()
  const { getAll } = useStorageGroups()

  const [loading, setLoading] = useState(true)
  const [groups, setGroups] = useState<string[]>([])

  function handleOpenGroup(groupName: string) {
    navigation.navigate('players', { groupName })
  }

  async function fetchGroups() {
    try {
      setLoading(true)
      
      const storage = await getAll()
      setGroups(storage)
    } catch (error) {
      console.log(error)
      Alert.alert('Atenção!!!', 'Falha ao buscar grupos, tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com sua turma" />
      {loading ? (
        <Loader />
      ) : (
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
      )}
      <Button
        title="Criar nova turma"
        onPress={() => navigation.navigate('newGroup')}
      />
    </Container>
  )
}
