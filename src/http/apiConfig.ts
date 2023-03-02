import axios, { AxiosResponse } from 'axios'
import { AuthResponse } from '../models/Auth'
import { getCookieByKey } from '../utils/cookieUtils'
// import {store} from "../index";
// import {IUser} from "../models/IUser";

export const API_URL = `http://rest-test.machineheads.ru`

const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getCookieByKey('token')}`
  return config
})

// api.interceptors.response.use(
//   (config) => {
//     return config
//   },
//   async (error) => {
//     const originalRequest = error.config
//     if (
//       error.response.status == 401 &&
//       error.config &&
//       !error.config._isRetry
//     ) {
//       originalRequest._isRetry = true
//       try {
//         const response: AxiosResponse<AuthResponse> =
//           await axios.post<AuthResponse>(
//             `${API_URL}/auth/token-refresh`,
//             { refresh_token: getCookieValueByKey('refresh_token') },
//             {
//               headers: {
//                 'Content-Type': 'multipart/form-data',
//               },
//             }
//           )

//         setTokensInCookie(response.data)

//         return api.request(originalRequest)
//       } catch (error) {
//         document.cookie = ''
//       }
//     }
//     throw error
//   }
// )

export default api
