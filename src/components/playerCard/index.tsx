import { ButtonIcon } from "@components/button"
import { Container, Icon, Name } from "./styles"

type Props = {
  name: string
  onRemove: () => void
}

export function PlayerCard({ name, onRemove }: Props) {
  return (
    <Container>
      <Icon name="person" />
      <Name>{name}</Name>
      <ButtonIcon
        icon="close"
        type="DANGER"
        onPress={onRemove}
      />
    </Container>
  )
}
