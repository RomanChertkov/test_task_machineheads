import { Avatar } from './Avatar'
import { Tag } from './Tag'

interface PostBasic {
  id: number
  title: string
  code: string
  previewPicture: PreviewPicture
  updatedAt: Date
  createdAt: Date
}

export interface Post extends PostBasic {
  authorName: string
  tagNames: string[]
}

export interface PostDetails extends PostBasic {
  text: string
  author: PostAuthor
  tags: PostTag[]
}

interface PreviewPicture {
  id: number
  name: string
  url: string
}

interface PostAuthor {
  id: number
  fullName: string
  avatar: Avatar
}

type PostTag = Pick<Tag, 'id' | 'name' | 'code'>
