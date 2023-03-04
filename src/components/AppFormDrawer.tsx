import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Tag,
} from 'antd'

const { Option } = Select

interface AppFormDrawerProps {
  isEditorOpen: boolean
  close: () => void
}
const AppFormDrawer: FC<AppFormDrawerProps> = ({ isEditorOpen, close }) => {
  return (
    <>
      <Drawer
        title="Редактирование Поста"
        width="80vw"
        onClose={close}
        open={isEditorOpen}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={close}>Закрыть</Button>
            <Button onClick={close} type="primary">
              Сохранить
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Заголовок"
                rules={[{ required: true, message: 'Введите заголовок поста' }]}
              >
                <Input placeholder="Введите заголовок поста" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="code"
                label="Url"
                rules={[{ required: true, message: 'Введите  URL поста' }]}
              >
                <Input placeholder="Введите  URL поста" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="owner"
                label="Owner"
                rules={[{ required: true, message: 'Please select an owner' }]}
              >
                <Select placeholder="Please select an owner">
                  <Option value="xiao">Xiaoxiao Fu</Option>
                  <Option value="mao">Maomao Zhou</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true, message: 'Please choose the type' }]}
              >
                <Select placeholder="Please choose the type">
                  <Option value="private">Private</Option>
                  <Option value="public">Public</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="approver"
                label="Approver"
                rules={[
                  { required: true, message: 'Please choose the approver' },
                ]}
              >
                <Select placeholder="Please choose the approver">
                  <Option value="jack">Jack Ma</Option>
                  <Option value="tom">Tom Liu</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="DateTime"
                rules={[
                  { required: true, message: 'Please choose the dateTime' },
                ]}
              >
                <DatePicker.RangePicker
                  style={{ width: '100%' }}
                  getPopupContainer={(trigger) => trigger.parentElement!}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="please enter url description"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Space size={[0, 8]} wrap>
                <Tag>Tag 1</Tag>
                <Tag>
                  <a href="https://github.com/ant-design/ant-design/issues/1862">
                    Link
                  </a>
                </Tag>
                <Tag closable>Tag 2</Tag>
                <Tag closable>Prevent Default</Tag>
              </Space>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  )
}

export default AppFormDrawer
