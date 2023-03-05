import { InferActionsType } from '../store'
import { AuthorsConstants } from './authorsConstants'

type dataType = { data1: number; data2: string }
type dataType2 = { data3: number; data4: boolean }
// export const AuthorsActions = {
//   setAuthors: (data: dataType): myAction<AuthorsConstantsTypes, dataType> =>
//     ({
//       type: 'GET_AUTHORS',
//       payload: data,
//     }),
//   getAuthors: (
//     data: dataType2
//   ): myAction<AuthorsConstantsTypes, dataType2> => ({
//     type: 'GET_AUTHORS',
//     payload: data,
//   }),
// }

// type myAction<T, P> = { type: T; payload: P }

// type swap = typeof AuthorsActions
// export type AuthorsActionsType = ReturnType<swap[keyof swap]>
// export type AuthorsActionsType = ReturnType<swap[keyof swap]>

export const AuthorsActions = {
  setAuthors: (data: dataType) =>
    ({
      type: AuthorsConstants.SET_AUTHORS,
      payload: data,
    } as const),
  getAuthors: (data: dataType2) =>
    ({
      type: AuthorsConstants.GET_AUTHORS,
      payload: data,
    } as const),
}

export type AppAuthorsActions = InferActionsType<typeof AuthorsActions>

// type AT<T> = T extends { [key: string]: infer U } ? U : any

// export type myTypes<T extends { [key: string]: (...args: any) => any }> =
//   ReturnType<AT<T>>

// export type myActionTypes = myTypes<typeof AuthorsActions>
