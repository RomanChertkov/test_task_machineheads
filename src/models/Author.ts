import { Avatar } from './Avatar'

export interface Author {
  id: number
  name: string
  lastName: string
  secondName: string
  avatar: Avatar
  updatedAt: Date
  createdAt: Date
}

export interface AuthorDetails extends Author {
  shortDescription: string
  description: string
}
