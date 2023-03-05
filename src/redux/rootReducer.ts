import { combineReducers } from 'redux'
import { createBrowserHistory } from 'history'
import { connectRouter } from 'connected-react-router'
import { authReducer } from './auth/authReducer'
import { postsReducer } from './posts/postReducer'
import { authorsReducer } from './authors/authorsReducer'

export const history = createBrowserHistory()

export const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  authors: authorsReducer,
  router: connectRouter(history),
})
