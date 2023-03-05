import { Avatar, Button, List } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { FC } from 'react'
import { formatDate } from '../utils/dateUtils'
import { Author } from '../models/Author'

interface AuthorListProps {
  authorList: Author[]
  openPostEditor?: (itemId: number) => void
}

const AuthorsList: FC<AuthorListProps> = ({ authorList, openPostEditor }) => {
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
        dataSource={authorList}
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
              avatar={<Avatar size={'large'} src={item.avatar.url} />}
              title={`${item.lastName} ${item.name} ${item.secondName}`}
              //   description={`${item.} опубликовал в ${formatDate(
              //     item.createdAt
              //   )}`}
            />
          </List.Item>
        )}
      />
    </>
  )
}

export default AuthorsList
