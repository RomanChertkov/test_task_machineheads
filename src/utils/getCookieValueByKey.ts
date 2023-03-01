export function getCookieValueByKey(cookieKey: string) {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${cookieKey}=`))
    ?.split('=')[1]
  return cookieValue || ''
}
