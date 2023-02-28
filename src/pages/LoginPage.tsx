import React from 'react'
import { Typography } from 'antd'
import LoginForm from '../components/LoginForm'

const { Title } = Typography

const LoginPage: React.FC = () => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexFlow: 'column',
    }}
  >
    <Title>Вход</Title>
    <LoginForm />
  </div>
)

export default LoginPage
