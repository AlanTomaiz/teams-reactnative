import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export type ButtonTypeStyle = 'DEFAULT' | 'DANGER'

type Props = {
  type: ButtonTypeStyle
}

export const Container = styled(TouchableOpacity)<Props>`
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 56px;
  border-radius: 6px;
  background: ${({ theme, type }) => type === 'DEFAULT' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};
`

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.WHITE};
`

export const ContainerButtonIcon = styled(TouchableOpacity)`
  width: 56px;
  height: 56px;

  align-items: center;
  justify-content: center;
`

export const Icon = styled(MaterialIcons).attrs<Props>(({ theme, type }) => ({
  size: 24,
  color: type === 'DEFAULT' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK
}))``
