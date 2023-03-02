import { Redirect, Route, Switch } from 'react-router-dom'
import PostsPage from '../pages/PostsPage'
import LoginPage from '../pages/LoginPage'
import MainLayout from '../layouts/MainLayout'
import { useAppSelector } from '../hooks/redux-hooks'

import AuthorsPage from '../pages/AuthorsPage'
import TagsPage from '../pages/TagsPage'
import NotFoundPage from '../pages/NotFoundPage'
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
          <PostsPage />
        </Route>
        <Route exact path="/authors">
          <AuthorsPage />
        </Route>
        <Route exact path="/tags3">
          <TagsPage />
        </Route>
        <Route exact path="/login">
          <Redirect to="/posts" />
        </Route>
        <Route path="*">
          <NotFoundPage />
          {/* <Redirect to="/posts" /> */}
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
