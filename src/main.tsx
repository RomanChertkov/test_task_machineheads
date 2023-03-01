import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import 'antd/dist/reset.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './redux/rootReducer'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>
)
