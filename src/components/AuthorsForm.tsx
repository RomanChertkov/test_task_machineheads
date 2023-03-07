import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Upload,
  Image,
  UploadFile,
  Checkbox,
} from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { NewAuthor } from '../models/Author'
import { AuthorsActions } from '../redux/authors/authorsActions'

const { Dragger } = Upload

interface AuthorsFormProps {
  isNew: boolean
}

const AuthorsForm: FC<AuthorsFormProps> = ({ isNew }) => {
  const dispatch = useAppDispatch()

  const author = useAppSelector((state) => state.authors.currentAuthor)
  const formErrors = useAppSelector((state) => state.tags.formErrors)
  //useState file from onChange

  const [tempfile, setTempFile] = useState<UploadFile | File | any>()
  const onFinish = (values: NewAuthor) => {
    isNew
      ? dispatch(
          AuthorsActions.addAuthor({
            ...values,
            removeAvatar: +Boolean(values.removeAvatar),
            avatar: tempfile?.originFileObj as File,
          })
        )
      : dispatch(
          AuthorsActions.editAuthor({
            ...values,
            removeAvatar: +Boolean(values.removeAvatar),
            avatar: tempfile?.originFileObj as File,
            id: author.id,
          })
        )
    console.log(
      'Success:',
      {
        ...values,
        removeAvatar: +Boolean(values.removeAvatar),
        avatar: tempfile,
      },
      new Date().toISOString()
    )
  }

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      fields={[
        { name: ['name'], value: author.name },
        { name: ['secondName'], value: author.secondName },
        { name: ['lastName'], value: author.lastName },
        { name: ['shortDescription'], value: author.shortDescription },
        { name: ['description'], value: author.description },
      ]}
    >
      <Row gutter={16} style={{ marginBottom: '3rem' }}>
        <Col span={16}>
          <Dragger
            multiple={false}
            onChange={({ file }) => setTempFile(file)}
            onDrop={({ dataTransfer }) => setTempFile(dataTransfer.files[0])}
          >
            <p className="ant-upload-drag-icon">
              {!tempfile ? (
                <InboxOutlined style={{ color: 'red' }} />
              ) : (
                <InboxOutlined />
              )}
            </p>
            <p className="ant-upload-text">
              Кликните или перетащите файл в эту зону для загрузки
            </p>
            {!tempfile && (
              <p style={{ color: 'red' }} className="ant-upload-text ">
                Загрузите аватар автора
              </p>
            )}
          </Dragger>
        </Col>
        <Col span={8}>
          {author.avatar && (
            <Image
              width={200}
              height={200}
              src="error"
              fallback={author.avatar.url}
            />
          )}
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            validateStatus={
              formErrors.find((item) => item.field === 'name')
                ? 'error'
                : 'success'
            }
            help={
              //formErrors.find((item) => item.field === 'name') &&
              formErrors.find((item) => item.field === 'name')?.message
            }
            name="name"
            label="Имя"
            rules={[
              {
                required: true,
                message: 'Введите имя автора',
              },
            ]}
          >
            <Input size="large" placeholder="Введите имя автора " />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            validateStatus={
              formErrors.find((item) => item.field === 'secondName')
                ? 'error'
                : 'success'
            }
            help={
              formErrors.find((item) => item.field === 'secondName')?.message
              //   &&
              //   'Необходимо заполнить «Символьный код».'
            }
            name="secondName"
            label="Отчество"
            rules={[
              {
                required: true,
                message: 'Введите  отчество автора',
                type: 'string',
              },
            ]}
          >
            <Input size="large" placeholder="Введите  отчество автора" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            validateStatus={
              formErrors.find((item) => item.field === 'lastName')
                ? 'error'
                : 'success'
            }
            help={
              formErrors.find((item) => item.field === 'lastName')?.message
              //   &&
              //   'Необходимо заполнить «Символьный код».'
            }
            name="lastName"
            label="Фамилия"
            rules={[
              {
                required: true,
                message: 'Введите  фамилию автора',
                type: 'string',
              },
            ]}
          >
            <Input size="large" placeholder="Введите  фамилию автора" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="shortDescription"
            label="Краткое описание"
            rules={[
              {
                required: true,
                message: 'Заполните поле краткое описание',
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Заполните описание" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="description"
            label="Описание"
            rules={[
              {
                required: true,
                message: 'Заполните поле описание',
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Заполните описание" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="removeAvatar" valuePropName="checked">
            <Checkbox>Показывать аватар</Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Button size="large" type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
export default AuthorsForm
