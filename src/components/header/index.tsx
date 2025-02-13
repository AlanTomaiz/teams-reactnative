import { useNavigation } from '@react-navigation/native';

import LogoImage from '@assets/logo.png';
import { BackButton, BackIcon, Container, Logo } from "./styles";

type Props = {
  showBackButton?: boolean
}

export function Header({ showBackButton }: Props) {
  const navigation = useNavigation()

  return (
    <Container>
      {showBackButton && (
        <BackButton
          onPress={() => navigation.navigate('groups')}
        >
          <BackIcon />
        </BackButton>
      )}
      <Logo source={LogoImage} />
    </Container>
  )
}
