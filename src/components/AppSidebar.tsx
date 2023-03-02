import { FC, useState } from 'react'
import { TagOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { Link, useParams } from 'react-router-dom'

const { Sider } = Layout

interface AppSidebarProps {}

const AppSidebar: FC<AppSidebarProps> = ({}) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/posts']}
        items={[
          {
            key: 'posts/',
            icon: <FileTextOutlined />,
            label: <Link to="/posts">Посты</Link>,
          },
          {
            key: '/authors',
            icon: <UserOutlined />,
            label: <Link to="/authors">Авторы</Link>,
          },
          {
            key: '/tags',
            icon: <TagOutlined />,
            label: <Link to="/tags">Теги</Link>,
          },
        ]}
      />
    </Sider>
  )
}
export default AppSidebar
