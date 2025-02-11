import { Button } from "@components/button";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { Input } from "@components/input";
import { Container, Content, UsersIcon } from "./styles";

export default function NewGroup() {
  return (
    <Container>
      <Header showBackButton />
      <Content>
        <UsersIcon />
        <Highlight
          title="Nova Turma"
          subtitle="Crie uma turma para adicionar pessoas"
        />
        <Input placeholder="Nome da turma" />
        <Button
          title="Criar"
          style={{ marginTop: 20 }}
        />
      </Content>
    </Container>
  )
}
