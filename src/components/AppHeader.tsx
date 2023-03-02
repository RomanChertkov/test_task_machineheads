import { FC } from 'react'
import { Layout, Button, Space, Typography, Popover } from 'antd'
import { UserProfile } from '../models/UserProfile'
import ProfileInfo from './ProfileInfo'
import logo from '../assets/logo.svg'

const { Header } = Layout
const { Text } = Typography

interface AppHeaderProps {
  profile: UserProfile
  logoutHandler: () => void
}

const AppHeader: FC<AppHeaderProps> = ({ profile, logoutHandler }) => {
  const { name, lastName } = profile

  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 15px',
        background: 'white',
      }}
    >
      <img width={100} src={logo} alt="logo machineheads" />
      <Space size="large">
        <Popover
          content={<ProfileInfo {...profile} />}
          title="Профиль"
          trigger="click"
        >
          <Text>
            Привет,
            <Button type="link">
              {name} {lastName}
            </Button>
          </Text>
        </Popover>

        <Button type="primary" onClick={logoutHandler}>
          Выйти
        </Button>
      </Space>
    </Header>
  )
}
export default AppHeader
