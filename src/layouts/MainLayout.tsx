import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TagOutlined,
  UserOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import { Layout, Menu, theme, Button, Space, Typography, Avatar } from 'antd'
import { useAppSelector } from '../hooks/redux-hooks'
import { UserProfile } from '../models/UserProfile'

const { Header, Sider, Content } = Layout
const { Text } = Typography

const MainLayout: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const { name, lastName } = useAppSelector(
    (state) => state.auth.profile as UserProfile
  )
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  function logout() {
    document.cookie = ''
  }
  return (
    <Layout style={{ width: '100vw', height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <FileTextOutlined />,
              label: 'Посты',
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: 'Авторы',
            },
            {
              key: '3',
              icon: <TagOutlined />,
              label: 'Тэги',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 10px',
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <Space size="large">
            <Text>
              Привет, {name} {lastName}
            </Text>

            <Button type="primary" onClick={logout}>
              Выйти
            </Button>
          </Space>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Content
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
