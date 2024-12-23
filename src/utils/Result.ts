export interface OnSuccess<T> {
  type: 'success'
  data: T
}

export interface OnError<E> {
  type: 'error'
  error: E
}

export const Result = {
  success<T>(data: T): OnSuccess<T> {
    return { type: 'success', data }
  },

  error<E>(error: E): OnError<E> {
    return { type: 'error', error }
  }
}
