import Cookies, { Cookie } from 'universal-cookie'
import { AuthResponse } from '../models/Auth'

class Appcookies {
  private cookies: Cookie

  constructor() {
    this.cookies = new Cookies()
  }

  public clearTokensFromCookie() {
    this.cookies.remove('token')
    this.cookies.remove('refresh_token')
  }

  public getCookieByKey(cookieKey: string) {
    return this.cookies.get(cookieKey)
  }

  public setTokensInCookie(data: AuthResponse): void {
    const {
      access_token,
      refresh_token,
      refresh_expired_at,
      access_expired_at,
    } = data

    const expiresAccessCookieDate = new Date(access_expired_at * 1000)
    const expiresRefreshCookieDate = new Date(refresh_expired_at * 1000)

    this.clearTokensFromCookie()

    this.cookies.set('token', access_token, {
      path: '/',
      expires: expiresAccessCookieDate,
      secure: true,
      sameSite: 'none',
    })

    this.cookies.set('refresh_token', refresh_token, {
      path: '/',
      expires: expiresRefreshCookieDate,
      secure: true,
      sameSite: 'none',
    })
  }
}
export default new Appcookies()

// const cookies = new Cookies()

// export function clearTokensFromCookie() {
//   cookies.remove('token')
//   cookies.remove('refresh_token')
// }

// export function getCookieByKey(cookieKey: string) {
//   return cookies.get(cookieKey)
// }

// export function setTokensInCookie(data: AuthResponse): void {
//   const { access_token, refresh_token, refresh_expired_at, access_expired_at } =
//     data

//   const expiresAccessCookieDate = new Date(access_expired_at * 1000)
//   const expiresRefreshCookieDate = new Date(refresh_expired_at * 1000)

//   clearTokensFromCookie()

//   cookies.set('token', access_token, {
//     path: '/',
//     expires: expiresAccessCookieDate,
//     secure: true,
//     sameSite: 'none',
//   })

//   cookies.set('refresh_token', refresh_token, {
//     path: '/',
//     expires: expiresRefreshCookieDate,
//     secure: true,
//     sameSite: 'none',
//   })
// }
