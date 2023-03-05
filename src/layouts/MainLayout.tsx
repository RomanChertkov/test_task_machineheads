import { Layout } from 'antd'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import AppHeader from '../components/AppHeader'
import AppSidebar from '../components/AppSidebar'
import { authActions } from '../redux/auth/authActions'

const { Content } = Layout

const MainLayout: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const profile = useAppSelector((state) => state.auth.profile)
  const dispatch = useAppDispatch()

  function logoutHandler() {
    dispatch(authActions.logout())
  }

  return (
    <Layout style={{ width: '100vw', height: '100vh' }}>
      <AppSidebar />

      <Layout className="site-layout">
        <AppHeader profile={profile} logoutHandler={logoutHandler} />

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: 'white',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
