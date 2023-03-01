import { combineReducers } from 'redux'
import { createBrowserHistory } from 'history'
import { connectRouter } from 'connected-react-router'
import { authReducer } from './auth/authReducer'

export const history = createBrowserHistory()

export const rootReducer = combineReducers({
  auth: authReducer,
  router: connectRouter(history),
})
