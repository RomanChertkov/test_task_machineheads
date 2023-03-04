export interface PostCommon {
  id: number
  title: string
  code: string
  previewPicture: PreviewPicture
  updatedAt: Date
  createdAt: Date
}

export interface Post extends PostCommon {
  authorName: string
  tagNames: string[]
}

export interface PostDetails extends PostCommon {
  text: string
  author: Author
  tags: Tag[]
}

export interface PreviewPicture {
  id: number
  name: string
  url: string
}

export interface Avatar {
  id: number
  name: string
  url: string
}

export interface Author {
  id: number
  fullName: string
  avatar: Avatar
}

export interface Tag {
  id: number
  name: string
  code: string
}
