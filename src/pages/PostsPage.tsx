import { Button, Space, Typography } from 'antd'
import PostsList from '../components/PostsList'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { Post, PostDetails } from '../models/Posts'
import { CloudUploadOutlined, PlusOutlined } from '@ant-design/icons'
import AppFormDrawer from '../components/AppFormDrawer'
import { useState } from 'react'
import { postActions } from '../redux/posts/postsActions'
const { Title } = Typography

export default function HomePage() {
  const currentPostDetail: PostDetails = useAppSelector(
    (state) => state.posts.currentPostDetail
  )
  const postsList: Post[] = useAppSelector((state) => state.posts.postsList)
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)

  function openPostEditor(postId: number) {
    dispatch(postActions.getPostDetail(postId))
    setOpen(true)
  }
  function closeEditor() {
    setOpen(false)
  }

  return (
    <>
      <Title>Посты</Title>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Button size="large" type="primary">
          <CloudUploadOutlined />
          {/* <PlusOutlined /> */}
          Добавить новый пост
        </Button>
        <PostsList posts={postsList} openPostEditor={openPostEditor} />
      </Space>

      <AppFormDrawer isEditorOpen={open} close={closeEditor} />
    </>
  )
}
