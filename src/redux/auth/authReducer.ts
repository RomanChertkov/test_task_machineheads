import { AnyAction } from 'redux'
import { UserProfile } from '../../components/models/UserProfile'
import { AuthConstants } from './authConstants'

interface authState {
  isAuth: boolean
  profile: UserProfile | undefined
  isFetchingData: boolean
  errorMessage: string
}

const intitialState: authState = {
  isAuth: false,
  profile: undefined,
  isFetchingData: false,
  errorMessage: '',
}

export const authReducer = (state = intitialState, action: AnyAction) => {
  switch (action.type) {
    case AuthConstants.SET_IS_AUTH:
      return { ...state, isAuth: action.payload }
    case AuthConstants.IS_FETHCHING_AUTH_DATA:
      return { ...state, isFetchingData: !state.isFetchingData }
    case AuthConstants.SET_AUTH_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload }
    case AuthConstants.SET_PROFILE_INFO:
      return { ...state, profile: action.payload }
    default:
      return state
  }
}
