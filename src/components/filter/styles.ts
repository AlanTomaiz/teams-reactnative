import { TouchableOpacity } from "react-native"
import styled, { css } from "styled-components/native"

export type FilterStyleProps = {
  active?: boolean
}

export const Container = styled(TouchableOpacity)<FilterStyleProps>`
  border: 1px solid ${({ theme, active }) => active ? theme.COLORS.GREEN_700 : 'transparent'};
  border-radius: 4px;
  margin-right: 12px;

  width: 70px;
  height: 38px;

  align-items: center;
  justify-content: center;
`

export const Text = styled.Text`
  text-transform: uppercase;

  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS.WHITE};
  `}
`
