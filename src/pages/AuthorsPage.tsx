import React, { FC } from 'react'
import { Typography } from 'antd'
import AuthorsList from '../components/AuthorList'
import { useAppSelector } from '../hooks/redux-hooks'

const { Title } = Typography
interface AuthorsPageProps {}

const AuthorsPage: FC<AuthorsPageProps> = ({}) => {
  const authorList = useAppSelector((state) => state.authors.authors)
  return (
    <>
      <Title>Авторы Постов</Title>
      <AuthorsList authorList={authorList} />
    </>
  )
}
export default AuthorsPage
