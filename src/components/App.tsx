import { Route, Switch } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import MainLayout from '../layouts/MainLayout'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { getCookieValueByKey } from '../utils/getCookieValueByKey'
import { useEffect } from 'react'
import { setIsAuth } from '../redux/auth/authActions'
//TODO add lazy import
function App() {
  const { isAuth } = useAppSelector((state) => state.auth)

  if (!isAuth) {
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
