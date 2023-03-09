import React, { FC, useEffect, useState } from 'react'
import { Button, Space, Typography, notification } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import AuthorsList from '../components/AuthorList'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import AppFormDrawer from '../components/AppFormDrawer'
import AuthorsForm from '../components/AuthorsForm'
import { FormError, ResponseError } from '../models/Errors'
import { AuthorsActions } from '../redux/authors/authorsActions'
import { AuthorDetails } from '../models/Author'
import ErrorBoundary from '../components/ErrorBoundary'

const { Title } = Typography

interface AuthorsPageProps {}

const AuthorsPage: FC<AuthorsPageProps> = ({}) => {
  const dispatch = useAppDispatch()

  const authorsList = useAppSelector((state) => state.authors.authors)
  const responseError = useAppSelector((state) => state.authors.responseErrors)
  const successAction = useAppSelector((state) => state.authors.successMessage)

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

  function openEditor(authorId: number) {
    dispatch(AuthorsActions.getAuthorDetails(authorId))
    setOpen(true)
  }

  function delItem(authorId: number) {
    dispatch(AuthorsActions.deleteAuthor(authorId))
  }

  function changeMultipleDelList(checked: boolean, tagId: number) {
    if (checked) setMultiplyDelList([...multiplyDelList, tagId])
    else {
      setMultiplyDelList(multiplyDelList.filter((item) => item !== tagId))
    }
  }

  function deleteMarkedItems() {
    dispatch(AuthorsActions.multipleDeleteAuthors(multiplyDelList))
  }

  function openEmptyEditor() {
    setOpen(true)
    setIsNew(true)
  }

  function closeEditor() {
    dispatch(AuthorsActions.setResponseError({} as ResponseError))
    dispatch(AuthorsActions.setSuccessMessage(''))
    dispatch(AuthorsActions.setFormErrors([] as FormError[]))
    dispatch(AuthorsActions.setCurrentAuthorDetails({} as AuthorDetails))
    setIsNew(false)
    setOpen(false)
  }

  return (
    <ErrorBoundary>
      {contextHolder}
      <Title>Авторы Постов</Title>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Space size={'large'}>
          <Button size="large" type="primary" onClick={openEmptyEditor}>
            <PlusOutlined />
            Добавить нового автора
          </Button>
          <Button size="large" type="primary" onClick={deleteMarkedItems}>
            <DeleteOutlined />
            Удалить выбранных авторов
          </Button>
        </Space>

        <AuthorsList
          authorsList={authorsList}
          openEditor={openEditor}
          delItem={delItem}
          changeMultipleDelList={changeMultipleDelList}
        />
      </Space>

      <AppFormDrawer
        title={
          isNew
            ? 'Добавление нового автора'
            : 'Редактирование информации об авторе'
        }
        isEditorOpen={open}
        close={closeEditor}
      >
        <AuthorsForm isNew={isNew} />
      </AppFormDrawer>
    </ErrorBoundary>
  )
}
export default AuthorsPage
