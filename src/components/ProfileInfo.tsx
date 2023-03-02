import { FC } from 'react'
import { UserProfile } from '../models/UserProfile'
import { Space, Typography } from 'antd'

const { Text } = Typography

const ProfileInfo: FC<UserProfile> = ({
  email,
  lastName,
  phone,
  roles,
  status,
}) => {
  return (
    <Space direction="vertical">
      <Text>Фимилия: {lastName ? lastName : 'Нет данных'}</Text>
      <Text>Роль: {roles.map((item) => item.name)}</Text>
      <Text>email: {email ? email : 'Нет данных'}</Text>
      <Text>Телефон: {phone ? phone : 'Нет данных'}</Text>
      <Text>Статус: {status.name}</Text>
    </Space>
  )
}
export default ProfileInfo
