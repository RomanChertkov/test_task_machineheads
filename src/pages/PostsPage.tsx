import { Button, Space, Typography } from 'antd'
import PostsList from '../components/PostsList'
import { useAppSelector } from '../hooks/redux-hooks'
import { Post } from '../models/Posts'
import { CloudUploadOutlined } from '@ant-design/icons'
const { Title } = Typography

export default function HomePage() {
  const postsList = useAppSelector((state) => state.posts.postsList)
  return (
    <>
      <Title>Посты</Title>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Button size="large" type="primary">
          <CloudUploadOutlined /> Добавить новый пост
        </Button>
        <PostsList posts={postsList} />
      </Space>
    </>
  )
}
