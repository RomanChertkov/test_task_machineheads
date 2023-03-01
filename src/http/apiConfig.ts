import axios, { AxiosResponse } from 'axios'
import { AuthResponse } from '../components/models/Auth'
import { getCookieValueByKey } from '../utils/getCookieValueByKey'
import { setTokensInCookie } from '../utils/setTokensInCookie'
// import {store} from "../index";
// import {IUser} from "../models/IUser";

export const API_URL = `http://rest-test.machineheads.ru`

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getCookieValueByKey('token')}`
  return config
})

api.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        const response: AxiosResponse<AuthResponse> =
          await axios.post<AuthResponse>(
            `${API_URL}/auth/token-refresh`,
            { refresh_token: getCookieValueByKey('refresh_token') },
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          )

        setTokensInCookie(response.data)

        return api.request(originalRequest)
      } catch (error) {
        document.cookie = ''
      }
    }
    throw error
  }
)

export default api
