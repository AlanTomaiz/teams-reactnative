import { TouchableOpacityProps } from "react-native";
import { ButtonTypeStyle, Container, Title } from "./styles";

type Props = TouchableOpacityProps & {
  title: string
  type?: ButtonTypeStyle
}

export function Button({ title, type = 'DEFAULT', ...rest }: Props) {
  return (
    <Container type={type} {...rest}>
      <Title>{title}</Title>
    </Container>
  )
}
