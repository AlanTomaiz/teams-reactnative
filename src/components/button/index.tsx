import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacityProps } from "react-native";

import { ButtonTypeStyle, Container, ContainerButtonIcon, Icon, Title } from "./styles";

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

type ButonIconProps = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap
  type?: ButtonTypeStyle
}

export function ButtonIcon({ icon, type = 'DEFAULT', ...rest }: ButonIconProps) {
  return (
    <ContainerButtonIcon {...rest}>
      <Icon name={icon} type={type} />
    </ContainerButtonIcon>
  )
}
