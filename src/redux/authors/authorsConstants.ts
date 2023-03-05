// export const AuthorsConstants = {
//   SET_AUTHORS: 'SET_AUTHORS',
//   GET_AUTHORS: 'GET_AUTHORS',
// }

export enum AuthorsConstants {
  SET_AUTHORS = 'SET_AUTHORS',
  GET_AUTHORS = 'GET_AUTHORS',
}

export type AuthorsConstantsTypes = keyof typeof AuthorsConstants
