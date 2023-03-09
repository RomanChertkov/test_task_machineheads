import { FC } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Typography, Alert } from 'antd'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { authActions } from '../redux/auth/authActions'

const { Title } = Typography

interface LoginData {
  email: string
  password: string
}

const LoginForm: FC = () => {
  const { isFetchingData, errorMessage } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const onFinish = (values: LoginData) => {
    dispatch(authActions.getAuthData(values))
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {errorMessage && <Alert message={errorMessage} type="error" closable />}
      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input
          size="large"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Ваш email"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Введите Ваш пароль!' }]}
      >
        <Input.Password
          size="large"
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Пароль"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isFetchingData}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  )
}
export default LoginForm
