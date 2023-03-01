import { AuthResponse } from '../models/Auth'

export function setTokensInCookie(data: AuthResponse): void {
  const { access_token, refresh_token, refresh_expired_at, access_expired_at } =
    data

  const expiresAccessCookieDate = new Date(
    access_expired_at * 1000
  ).toUTCString()

  const expiresRefreshCookieDate = new Date(
    refresh_expired_at * 1000
  ).toUTCString()

  document.cookie = ''
  document.cookie = `token=${access_token}; expires=${expiresAccessCookieDate}; SameSite=None; Secure`
  document.cookie = `refresh_token=${refresh_token}; expires=${expiresRefreshCookieDate}; SameSite=None; Secure`
}
