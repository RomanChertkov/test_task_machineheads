import api from './apiConfig'
//TODO trow errors
export async function getPostsFromApi() {
  try {
    return await api.get('/manage/posts')
  } catch (error) {}
}
