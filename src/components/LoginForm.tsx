import { FC } from 'react'
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
      // labelCol={{ span: 8 }}
      // wrapperCol={{ span: 16 }}
      // style={{ maxWidth: 300 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {errorMessage && <Alert message={errorMessage} type="error" closable />}
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: 'email',
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isFetchingData}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
export default LoginForm
