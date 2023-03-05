import { Button, List } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { FC } from 'react'
import { Tag } from '../models/Tag'
import { formatDate } from '../utils/dateUtils'

interface TagsListProps {
  tagsList: Tag[]
  openPostEditor?: (itemId: number) => void
}

const TagsList: FC<TagsListProps> = ({ tagsList, openPostEditor }) => {
  return (
    <>
      <List
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page)
          },
          pageSize: 10,
        }}
        bordered
        loading={false}
        dataSource={tagsList}
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
              // avatar={<Avatar size={'large'} src={item.avatar.url} />}
              title={item.name}
              description={`Код: ${item.code}. Создано  ${formatDate(
                item.createdAt
              )}`}
            />
          </List.Item>
        )}
      />
    </>
  )
}

export default TagsList
