import { Author, AuthorDetails } from '../models/Author'
import api from './apiConfig'

export class AuthorsService {
  static async getAllAuthors() {
    try {
      return await api.get<Author>('/manage/authors')
    } catch (error) {}
  }

  static async getAuthorsDetail(authorId: number) {
    try {
      return await api.get<AuthorDetails>('/manage/posts/detail', {
        params: { id: authorId },
      })
    } catch (error) {}
  }
}
