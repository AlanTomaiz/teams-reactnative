import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 24px;
  background: ${({ theme }) => theme.COLORS.GRAY_600};
`

export const Form = styled.View`
  flex-direction: row;
  justify-content: center;

  width: 100%;
  background: ${({ theme }) => theme.COLORS.GRAY_700};
  border-radius: 6px;
`

export const HeaderList = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  margin: 32px 0 12px;
`

export const NumberOfPlayers = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS.GRAY_300};
  `}
`
