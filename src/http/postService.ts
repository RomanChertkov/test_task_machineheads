import { PostDetails } from '../models/Posts'
import api from './apiConfig'
//TODO trow errors
export async function getPostsFromApi() {
  try {
    return await api.get('/manage/posts')
  } catch (error) {}
}

export async function getPostDetailFromApi(postId: number) {
  try {
    return await api.get<PostDetails>('/manage/posts/detail', {
      params: { id: postId },
    })
  } catch (error) {}
}
