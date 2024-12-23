export type ResultType<T> =
  | { success: boolean, data: T }
  | { success: boolean, error: unknown }

export class Result {
  static success<T>(success: boolean, data: T): ResultType<T> {
    return { success, data }
  }

  static error<T>(success: boolean, error: unknown): ResultType<T> {
    return { success, error }
  }
}
