import { FC } from 'react'
import { Typography } from 'antd'
import TagsList from '../components/TagsList'
import { useAppSelector } from '../hooks/redux-hooks'

const { Title } = Typography
interface TagsPageProps {}

const TagsPage: FC<TagsPageProps> = ({}) => {
  const tagsList = useAppSelector((state) => state.tags.tags)
  return (
    <>
      <Title>Теги</Title>
      <TagsList tagsList={tagsList} />
    </>
  )
}
export default TagsPage
