import { combineReducers } from 'redux'
import { createBrowserHistory } from 'history'
import { connectRouter } from 'connected-react-router'
import { authReducer } from './auth/authReducer'
import { postsReducer } from './posts/postReducer'

export const history = createBrowserHistory()

export const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  router: connectRouter(history),
})
