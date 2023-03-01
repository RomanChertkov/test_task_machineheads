import { API_URL } from './apiConfig'
import axios from 'axios'
import { AxiosResponse } from 'axios'
import { AuthResponse } from '../components/models/Auth'
import { LoginData } from '../components/models/UserProfile'
import { getCookieValueByKey } from '../utils/getCookieValueByKey'

export async function login(
  LoginFormData: LoginData
): Promise<AxiosResponse<AuthResponse> | Error> {
  try {
    return await axios.post<AuthResponse>(
      `${API_URL}/auth/token-generate`,
      LoginFormData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (Number(error.response?.status) === 422) {
        throw Error(error.response?.statusText)
      }
      if (Number(error.response?.status) === 400) {
        throw Error(error.response?.data.message)
      }
      throw Error(error.message)
    }
    throw error as Error
  }
}

export async function refreshBothTokens(
  refresh_token: string
): Promise<AxiosResponse<AuthResponse> | Error> {
  try {
    return await axios.post<AuthResponse>(
      `${API_URL}/auth/token-refresh`,
      { refresh_token },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (Number(error.response?.status) === 400) {
        throw Error(error.response?.data.message)
      }
      throw Error(error.message)
    }
    throw error as Error
  }
}
