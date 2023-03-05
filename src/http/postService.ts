import { PostDetails } from '../models/Posts'
import api from './apiConfig'
//TODO trow errors

export class PostService {
  static async getPostsFromApi() {
    try {
      return await api.get('/manage/posts')
    } catch (error) {}
  }

  static async getPostDetailFromApi(postId: number) {
    try {
      return await api.get<PostDetails>('/manage/posts/detail', {
        params: { id: postId },
      })
    } catch (error) {}
  }
}
