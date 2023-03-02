import React from 'react'
import { Space, Typography } from 'antd'
import LoginForm from '../components/LoginForm'
import logo from '../assets/logo.svg'
const { Title } = Typography

const LoginPage: React.FC = () => (
  <div
    style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexFlow: 'column',
      background:
        'radial-gradient(circle, rgba(255,255,255,1) 31%, rgba(55,113,177,1) 100%)',
    }}
  >
    <Space size={'large'} style={{ marginBottom: '1rem' }}>
      <img src={logo} alt="machineheads logo" />
      <Title>Вход</Title>
    </Space>
    <LoginForm />
  </div>
)

export default LoginPage
