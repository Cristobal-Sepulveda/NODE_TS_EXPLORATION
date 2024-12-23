import { ZodSchema } from 'zod'
import { Result, OnSuccess, OnError } from './result.js'

export async function validateAndExecute<T> (
  data: Record<string, string | undefined>,
  schema: ZodSchema<T>,
  modelFunction: (validatedData: T) => Promise<any>
): Promise<OnSuccess<T> | OnError<any>> {
  try {
    const validatedData = schema.parse(data)
    const result = await modelFunction(validatedData)
    return Result.success(result)
  } catch (error) {
    return Result.error(error)
  }
}
