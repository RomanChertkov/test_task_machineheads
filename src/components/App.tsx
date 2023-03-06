import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux-hooks'

import MainLayout from '../layouts/MainLayout'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import { Skeleton } from 'antd'
import ErrorBoundary from './ErrorBoundary'

const PostsPage = React.lazy(() => import('../pages/PostsPage'))
const AuthorsPage = React.lazy(() => import('../pages/AuthorsPage'))
const TagsPage = React.lazy(() => import('../pages/TagsPage'))
// import AuthorsPage from '../pages/AuthorsPage'
// import TagsPage from '../pages/TagsPage'

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
          <ErrorBoundary>
            <Suspense fallback={<Skeleton />}>
              <PostsPage />
            </Suspense>
          </ErrorBoundary>
        </Route>
        <Route exact path="/authors">
          <ErrorBoundary>
            <Suspense fallback={<Skeleton />}>
              <AuthorsPage />
            </Suspense>
          </ErrorBoundary>
        </Route>
        <Route exact path="/tags">
          <ErrorBoundary>
            <Suspense fallback={<Skeleton />}>
              <TagsPage />
            </Suspense>
          </ErrorBoundary>
        </Route>
        <Route exact path="/login">
          <Redirect to="/posts" />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </MainLayout>
  )
}

export default App
