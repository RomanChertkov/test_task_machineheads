import { Route, Switch } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import MainLayout from '../layouts/MainLayout'
//TODO add lazy import
function App() {
  const isAuth = !false

  if (isAuth) {
    return <LoginPage />
  }

  return (
    <MainLayout>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        {/* <Route path="/about">
        <About />
      </Route>
      {/* Can also use a named `children` prop */}
        {/*<Route path="/users/:id" children={<User />} />
      <Route path="/about">
        <NoMatchPage />
      </Route> */}
      </Switch>
    </MainLayout>
  )
}

export default App
