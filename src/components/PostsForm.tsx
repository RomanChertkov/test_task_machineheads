import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Upload,
  Image,
  UploadFile,
  Select,
} from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { AuthorsActions } from '../redux/authors/authorsActions'
import { TagsActions } from '../redux/tags/tagsActions'
import { NewPost, PostTag } from '../models/Post'
import { postsActions } from '../redux/posts/postsActions'
import { memo } from 'react'
import FormItem from './FormItem'

const { Dragger } = Upload
const { Option } = Select

interface AuthorsFormProps {
  isNew: boolean
}

const PostsForm: FC<AuthorsFormProps> = ({ isNew }) => {
  const dispatch = useAppDispatch()

  const post = useAppSelector((state) => state.posts.currentPost)
  const allTags = useAppSelector((state) => state.tags.tags)
  const allAuthors = useAppSelector((state) => state.authors.authors)
  const formErrors = useAppSelector((state) => state.posts.formErrors)

  const [tempfile, setTempFile] = useState<UploadFile | File | any>()

  function getTagIdsByName(tagsValues: string[]) {
    return tagsValues.map(
      (item) => allTags.find((fItem) => item === fItem.name)?.id || 0
    )
  }
  function getAuthorIdByName(authorName: string) {
    return (
      allAuthors.find(
        (item) =>
          `${item.lastName} ${item.name} ${item.secondName}` === authorName
      )?.id || 0
    )
  }

  const onFinish = (
    values: { tagIds: string[]; authorId: string } & Omit<
      NewPost,
      'tagIds' | 'authorId'
    >
  ) => {
    const data: NewPost = {
      ...values,
      authorId: getAuthorIdByName(values.authorId),
      tagIds: getTagIdsByName(values.tagIds),
      previewPicture: tempfile?.originFileObj as File,
    }
    isNew
      ? dispatch(postsActions.addPost(data))
      : dispatch(
          postsActions.editPost({
            ...data,
            id: post.id,
          })
        )
    console.log('Success:', data, new Date().toISOString())
  }

  function getAllTags() {
    console.log('getTags')

    allTags.length === 0 && dispatch(TagsActions.getTags())
  }

  function getAllAuthors() {
    console.log('getAuthors')

    allAuthors.length === 0 && dispatch(AuthorsActions.getAuthors())
  }

  const normFile = (e: any) => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      fields={[
        { name: ['title'], value: post.title },
        { name: ['code'], value: post.code },
        { name: ['text'], value: post.text },
        { name: ['authorId'], value: post.author?.fullName },
        { name: ['tagIds'], value: post.tags?.map((item) => item.name) },
        // { name: ['previewPicture'], value: post.previewPicture?.url },
      ]}
    >
      <Row gutter={16} style={{ marginBottom: '3rem' }}>
        <Col span={16}>
          <Form.Item
            name="previewPicture"
            label="Изображение"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            validateStatus={
              formErrors.find((item) => item.field === 'previewPicture')
                ? 'error'
                : 'success'
            }
            help={
              formErrors.find((item) => item.field === 'previewPicture')
                ?.message
            }
            rules={[
              {
                required: true,
                message: 'загрузите изображение',
              },
            ]}
          >
            <Dragger
              name="dragger"
              accept="image/*"
              multiple={false}
              onChange={({ file }) => setTempFile(file)}
              onDrop={({ dataTransfer }) => setTempFile(dataTransfer.files[0])}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Кликните или перетащите файл в эту зону для загрузки
              </p>
            </Dragger>
          </Form.Item>
        </Col>

        <Col span={8}>
          {post.previewPicture && (
            <Image
              width={200}
              height={200}
              src="error"
              fallback={post.previewPicture?.url}
              about="Первоначальное фото"
            />
          )}
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            validateStatus={
              formErrors.find((item) => item.field === 'title')
                ? 'error'
                : 'success'
            }
            help={formErrors.find((item) => item.field === 'title')?.message}
            name="title"
            label="Заголовок поста"
            rules={[
              {
                required: true,
                message: 'Введите Заголовок поста',
              },
            ]}
          >
            <Input size="large" placeholder="Введите Заголовок поста " />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            validateStatus={
              formErrors.find((item) => item.field === 'code')
                ? 'error'
                : 'success'
            }
            help={formErrors.find((item) => item.field === 'code')?.message}
            name="code"
            label="Код поста"
            rules={[
              {
                required: true,
                message: 'Введите  код поста',
                type: 'string',
              },
            ]}
          >
            <Input size="large" placeholder="Введите  код поста" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="text"
            label="Текст поста"
            rules={[
              {
                required: true,
                message: 'Заполните текст поста',
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Заполните текст поста" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="authorId"
            label="Автор поста"
            rules={[{ required: true, message: 'Please choose the approver' }]}
          >
            <Select
              allowClear
              onDropdownVisibleChange={getAllAuthors}
              placeholder="Выберите автора поста"
            >
              {allAuthors.map((item, index) => (
                <Option
                  key={index}
                  value={`${item.lastName} ${item.name} ${item.secondName}`}
                >
                  {item.lastName} {item.name} {item.secondName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="tagIds"
            label="Теги поста"
            rules={[
              {
                required: true,
                message: 'Заполните текст поста',
              },
            ]}
          >
            <Select
              mode="tags"
              placeholder="Tags Mode"
              onDropdownVisibleChange={getAllTags}
              //onChange={(value, option) => transformTagsInfoAndSet(option)}
              options={allTags.map((item) => ({
                value: item.name,
                lable: item.id,
              }))}
            />
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
export default PostsForm
