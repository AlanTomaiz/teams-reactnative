import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

import { Button } from '@components/button'
import { Header } from '@components/header'
import { Highlight } from '@components/highlight'
import { Input } from '@components/input'
import { useStorageGroups } from '@storage/group'
import { HandleError } from '@utils/handleError'
import { Container, Content, UsersIcon } from './styles'

export default function NewGroup() {
  const navigation = useNavigation()
  const { createGroup } = useStorageGroups()

  const [groupName, setGroupName] = useState('')

  async function handleAddGroup() {
    try {
      await createGroup(groupName)
      navigation.navigate('players', { groupName })
    } catch (error) {
      HandleError(error as Error)
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <UsersIcon />
        <Highlight
          title="Nova Turma"
          subtitle="Crie uma turma para adicionar pessoas"
        />
        <Input
          placeholder="Nome da turma"
          onChangeText={setGroupName}
        />
        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleAddGroup}
        />
      </Content>
    </Container>
  )
}
