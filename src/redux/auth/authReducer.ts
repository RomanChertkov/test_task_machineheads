import { UserProfile } from '../../models/UserProfile'
import { AuthConstants } from './authConstants'
import { AppAuthActions } from './authActions'

type AuthState = typeof intitialState

const intitialState = {
  isAuth: false,
  profile: {} as UserProfile,
  isFetchingData: false,
  errorMessage: '',
}

export const authReducer = (
  state = intitialState,
  action: AppAuthActions
): AuthState => {
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
