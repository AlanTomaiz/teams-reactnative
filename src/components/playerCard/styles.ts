import { MaterialIcons } from '@expo/vector-icons';
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: 56px;

  background: ${({ theme }) => theme.COLORS.GRAY_500};
  border-radius: 6px;
`

export const Name = styled.Text`
  flex: 1;

  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.GRAY_200};
  `}
`

export const Icon = styled(MaterialIcons).attrs(({ theme }) => ({
  size: 26,
  color: theme.COLORS.GRAY_300
}))`
  margin-right: 8px;
  margin-left: 16px;
`
