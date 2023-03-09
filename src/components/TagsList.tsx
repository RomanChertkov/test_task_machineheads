import { Button, Checkbox, Form, List } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { FC } from 'react'
import { Tag } from '../models/Tag'
import { formatDate } from '../utils/dateUtils'

interface TagsListProps {
  tagsList: Tag[]
  openEditor: (itemId: number) => void
  delItem: (itemId: number) => void
  multipleDel: (checked: boolean, itemId: number) => void
}

const TagsList: FC<TagsListProps> = ({
  tagsList,
  openEditor,
  delItem,
  multipleDel,
}) => {
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
              <Button type="primary" onClick={() => openEditor(item.id)}>
                <EditOutlined />
                Редактировать
              </Button>,
              <Button type="primary" danger onClick={() => delItem(item.id)}>
                <DeleteOutlined /> Удалить
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Checkbox
                  onChange={(e) => multipleDel(e.target.checked, item.id)}
                />
              }
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
