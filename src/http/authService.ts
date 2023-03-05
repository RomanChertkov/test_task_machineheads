import api, { API_URL } from './apiConfig'
import axios, { AxiosResponse } from 'axios'
import { AuthResponse } from '../models/Auth'
import { LoginData, UserProfile } from '../models/UserProfile'

export class AuthService {
  static async login(
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

  static async refreshBothTokens(
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

  static async getUserProfile(): Promise<AxiosResponse<UserProfile> | Error> {
    try {
      return await api.get<UserProfile>('/profile')
    } catch (error: unknown) {
      throw error as Error
    }
  }
}
