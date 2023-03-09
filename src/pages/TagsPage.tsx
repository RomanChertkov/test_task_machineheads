import { FC, useEffect, useState } from 'react'
import { Typography, Space, Button, notification } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import TagsList from '../components/TagsList'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import AppFormDrawer from '../components/AppFormDrawer'
import { TagsActions } from '../redux/tags/tagsActions'
import TagsForm from '../components/TagsForm'
import { Tag } from '../models/Tag'
import { FormError, ResponseError } from '../models/Errors'
import ErrorBoundary from '../components/ErrorBoundary'
import { CheckboxChangeEvent } from 'antd/es/checkbox'

const { Title } = Typography
interface TagsPageProps {}

const TagsPage: FC<TagsPageProps> = ({}) => {
  const dispatch = useAppDispatch()

  const tagsList = useAppSelector((state) => state.tags.tags)
  // const currentTag = useAppSelector((state) => state.tags.currentTag)
  const responseError = useAppSelector((state) => state.tags.responseErrors)
  const successAction = useAppSelector((state) => state.tags.successMessage)

  const [open, setOpen] = useState(false)
  const [isNew, setIsNew] = useState(false)

  const [multiplyDelList, setMultiplyDelList] = useState<number[]>([])

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

  function multipleDel(checked: boolean, tagId: number) {
    console.log(checked)
    if (checked) setMultiplyDelList([...multiplyDelList, tagId])
    else {
      setMultiplyDelList(multiplyDelList.filter((item) => item !== tagId))
    }
  }

  function deleteMarkedItems() {
    console.log(multiplyDelList)
    dispatch(TagsActions.multipleDeleteTags(multiplyDelList))
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
    <ErrorBoundary>
      {contextHolder}

      {/* {successAction &&
        api.success({
          message: successAction,
        })} */}
      <Title>Теги</Title>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Space size={'large'}>
          <Button size="large" type="primary" onClick={openEmptyEditor}>
            <PlusOutlined />
            Добавить новый тег
          </Button>
          <Button size="large" type="primary" onClick={deleteMarkedItems}>
            <DeleteOutlined />
            Удалить выбранные теги
          </Button>
        </Space>

        <TagsList
          tagsList={tagsList}
          openEditor={openEditor}
          delItem={delItem}
          multipleDel={multipleDel}
        />
      </Space>

      <AppFormDrawer
        title={isNew ? 'Добавление нового тега' : 'Редактирование тега'}
        isEditorOpen={open}
        close={closeEditor}
      >
        <TagsForm isNew={isNew} />
      </AppFormDrawer>
    </ErrorBoundary>
  )
}
export default TagsPage
