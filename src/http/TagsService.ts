import axios, { AxiosError } from 'axios'
import api from './apiConfig'
import { EditTag, NewTag, Tag } from '../models/Tag'

export class TagsService {
  static async getAllTags() {
    try {
      return await api.get<Tag[]>('/manage/tags')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error as AxiosError
      }
      throw error
    }
  }

  static async getCurrentTagDetail(tagId: number) {
    try {
      return await api.get<Tag>('/manage/tags/detail', {
        params: { id: tagId },
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error as AxiosError
      }
      throw error
    }
  }

  static async saveNewTag(newTag: NewTag) {
    try {
      const response = await api.post<boolean>('/manage/tags/add', newTag, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error as AxiosError
      }
      throw error
    }
  }
  static async editTag(currentTag: EditTag) {
    const { name, code, id, sort } = currentTag
    try {
      return await api.post(
        '/manage/tags/edit',
        { name, code, sort },
        {
          params: { id },
        }
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error as AxiosError
      }
      throw error
    }
  }

  static async removeTag(tagId: number) {
    try {
      return await api.delete('/manage/tags/remove', {
        params: { id: tagId },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error as AxiosError
      }
      throw error
    }
  }

  //   static async multipleremoveAuthors(ids: number[]) {
  //     try {
  //       return await api.delete('/manage/authors/multiple-remove', {
  //         params: { id: ids },
  //       })
  //     } catch (error) {}
  //   }
}
