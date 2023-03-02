export interface Post {
  id: number
  title: string
  code: string
  authorName: string
  previewPicture: PreviewPicture
  tagNames: string[]
  updatedAt: Date
  createdAt: Date
}

interface PreviewPicture {
  id: number
  name: string
  url: string
}
