import { Header } from '@components/header'
import { Highlight } from '@components/highlight'
import * as S from './styles'

export default function Groups() {
  return (
    <S.Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com sua turma" />
    </S.Container>
  )
}
