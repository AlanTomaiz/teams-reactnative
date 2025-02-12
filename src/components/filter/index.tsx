import { TouchableOpacityProps } from "react-native";
import { Container, FilterStyleProps, Text } from "./styles";

type Props = TouchableOpacityProps & FilterStyleProps & {
  title: string
}

export function Filter({ title, active, ...rest }: Props) {
  return (
    <Container active={active} {...rest}>
      <Text>{title}</Text>
    </Container>
  )
}
