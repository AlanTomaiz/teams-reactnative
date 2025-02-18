import { Alert } from 'react-native'
import { AppError } from './appError'

export function HandleError(error: Error) {
  if (error instanceof AppError) {
    Alert.alert('Atenção!!!', error.message)
    return
  }

  Alert.alert('Atenção!!!', 'Não foi possível realizar essa operação, tente novamente mais tarde.')
}
