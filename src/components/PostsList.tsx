import { Avatar, Button, List } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { FC } from 'react'
import { Post } from '../models/Posts'

interface PostsListProps {
  posts: Post[]
}

const PostsList: FC<PostsListProps> = ({ posts }) => {
  return (
    <>
      <List
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page)
          },
          pageSize: 5,
        }}
        bordered
        loading={false}
        dataSource={posts}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button type="primary">
                <EditOutlined />
                Редактировать
              </Button>,
              <Button type="primary" danger>
                <DeleteOutlined /> Удалить
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar size={'large'} src={item.previewPicture.url} />}
              title={<a href="https://ant.design">{item.title}</a>}
              description={`${item.authorName} опубликовал в ${item.createdAt}`}
            />
          </List.Item>
        )}
      />
    </>
  )
}

export default PostsList
