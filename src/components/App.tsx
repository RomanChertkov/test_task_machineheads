import { Redirect, Route, Switch } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import MainLayout from '../layouts/MainLayout'
import { useAppSelector } from '../hooks/redux-hooks'

import AuthorsPage from '../pages/AuthorsPage'
//TODO add lazy import
function App() {
  const { isAuth } = useAppSelector((state) => state.auth)

  if (!isAuth) {
    return (
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    )
  }

  return (
    <MainLayout>
      <Switch>
        <Route exact path="/posts">
          <HomePage />
        </Route>
        <Route exact path="/authors">
          <AuthorsPage />
        </Route>
        <Route path="*">
          <Redirect to="/posts" />
        </Route>
        {/*<Route path="/users/:id" children={<User />} />
      <Route path="/about">
      <NoMatchPage />
    </Route> */}
      </Switch>
    </MainLayout>
  )
}

export default App
