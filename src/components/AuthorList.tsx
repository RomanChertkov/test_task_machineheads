import { Avatar, Button, Checkbox, List } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { FC } from 'react'
import { Author } from '../models/Author'
import { formatDate } from '../utils/dateUtils'

interface AuthorListProps {
  authorsList: Author[]
  openEditor: (itemId: number) => void
  delItem: (itemId: number) => void
  changeMultipleDelList: (checked: boolean, itemId: number) => void
  deletingAuthorId: number
}

const AuthorsList: FC<AuthorListProps> = ({
  authorsList,
  openEditor,
  delItem,
  changeMultipleDelList,
  deletingAuthorId,
}) => {
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
        dataSource={authorsList}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button type="primary" onClick={() => openEditor(item.id)}>
                <EditOutlined />
                Редактировать
              </Button>,
              <Button
                type="primary"
                danger
                onClick={() => delItem(item.id)}
                loading={item.id === deletingAuthorId}
              >
                <DeleteOutlined /> Удалить
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <>
                  <Checkbox
                    onChange={(e) =>
                      changeMultipleDelList(e.target.checked, item.id)
                    }
                  />
                  <Avatar size={'large'} src={item.avatar?.url} />
                </>
              }
              title={`${item.lastName} ${item.name} ${item.secondName}`}
              description={`Добавлен в ${formatDate(item.createdAt)}`}
            />
          </List.Item>
        )}
      />
    </>
  )
}

export default AuthorsList
