import { UsersThree } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled(TouchableOpacity)`
  width: 100%;

  background: ${({ theme }) => theme.COLORS.GRAY_500};
  border-radius: 6px;
  padding: 24px;
  margin-bottom: 12px;

  flex-direction: row;
  align-items: center;
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.GRAY_200};
`

export const Icon = styled(UsersThree).attrs(({ theme }) => ({
  size: 32,
  color: theme.COLORS.GREEN_700,
  weight: 'fill'
}))`
  margin-right: 20px;
`
