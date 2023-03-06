import { FC, useEffect, useState } from 'react'
import { Typography, Space, Button, notification } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import TagsList from '../components/TagsList'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import AppFormDrawer from '../components/AppFormDrawer'
import { TagsActions } from '../redux/tags/tagsActions'
import TagsForm from '../components/TagsForm'
import { Tag } from '../models/Tag'
import { FormError, ResponseError } from '../models/Errors'

const { Title } = Typography
interface TagsPageProps {}

const TagsPage: FC<TagsPageProps> = ({}) => {
  const dispatch = useAppDispatch()

  const tagsList = useAppSelector((state) => state.tags.tags)
  const currentTag = useAppSelector((state) => state.tags.currentTag)
  const responseError = useAppSelector((state) => state.tags.responseErrors)
  const successAction = useAppSelector((state) => state.tags.successMessage)
  const [open, setOpen] = useState(false)
  const [isNew, setIsNew] = useState(false)

  const [api, contextHolder] = notification.useNotification()
  useEffect(() => {
    successAction &&
      api.success({
        message: successAction,
      })
  }, [successAction])

  useEffect(() => {
    responseError.name &&
      api.error({
        message: responseError.name,
        description: responseError.message,
      })
  }, [responseError])

  function openEditor(tagId: number) {
    dispatch(TagsActions.getTagDetails(tagId))
    setOpen(true)
  }

  function delItem(tagId: number) {
    dispatch(TagsActions.deleteTag(tagId))
  }

  function openEmptyEditor() {
    setOpen(true)
    setIsNew(true)
  }

  function closeEditor() {
    dispatch(TagsActions.setResponseError({} as ResponseError))
    dispatch(TagsActions.setSuccessMessage(''))
    dispatch(TagsActions.setFormErrors([] as FormError[]))
    dispatch(TagsActions.setCurrentTagDetails({} as Tag))
    setIsNew(false)
    setOpen(false)
  }

  return (
    <>
      {contextHolder}

      {/* {successAction &&
        api.success({
          message: successAction,
        })} */}
      <Title>Теги</Title>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Button size="large" type="primary" onClick={openEmptyEditor}>
          {/* <CloudUploadOutlined /> */}
          <PlusOutlined />
          Добавить новый тег
        </Button>
        <TagsList
          tagsList={tagsList}
          openEditor={openEditor}
          delItem={delItem}
        />
      </Space>

      <AppFormDrawer
        title={isNew ? 'Добавление нового тега' : 'Редактирование тега'}
        isEditorOpen={open}
        close={closeEditor}
      >
        <TagsForm isNew={isNew} />
      </AppFormDrawer>
    </>
  )
}
export default TagsPage
