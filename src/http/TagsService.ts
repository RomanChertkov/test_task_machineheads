import axios, { AxiosResponse } from 'axios'
import api from './apiConfig'
import { Tag } from '../models/Tag'

export class TagsService {
  static async getAllTags() {
    try {
      return await api.get<Tag[]>('/manage/tags')
    } catch (error) {
      throw error as Error
    }
  }

  static async getAuthorsDetail(authorId: number) {
    try {
      return await api.get<Tag>('/manage/posts/detail', {
        params: { id: authorId },
      })
    } catch (error) {
      if (error instanceof Error) {
        throw Error(error.message)
      }
    }
  }

  //   static async addAuthor(newAuthor: AuthorDetails) {
  //     try {
  //       return await api.post<AuthorDetails>('/manage/authors/add', newAuthor)
  //     } catch (error) {}
  //   }
  //   static async editAuthor(currentAuthor: AuthorDetails) {
  //     try {
  //       return await api.post<AuthorDetails>(
  //         '/manage/authors/edit',
  //         currentAuthor,
  //         {
  //           params: { id: currentAuthor.id },
  //         }
  //       )
  //     } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //         if (error.response?.status === 400) throw Error('Данные не корректны')
  //         if (error.response?.status === 422) throw Error('Ошибки в форме')

  //         throw Error()
  //       } else throw Error('Произошла неизвестная ошибка')
  //     }
  //   }

  //   static async removeAuthor(authorId: number) {
  //     try {
  //       return await api.delete('/manage/authors/remove', {
  //         params: { id: authorId },
  //       })
  //     } catch (error) {}
  //   }

  //   static async multipleremoveAuthors(ids: number[]) {
  //     try {
  //       return await api.delete('/manage/authors/multiple-remove', {
  //         params: { id: ids },
  //       })
  //     } catch (error) {}
  //   }
}
