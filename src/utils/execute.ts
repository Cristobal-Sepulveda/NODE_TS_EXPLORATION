import { ZodSchema } from 'zod'
import { Result, ResultType } from './result.js'

export async function validateAndExecute<T> (
  data: Record<string, string | undefined>,
  schema: ZodSchema<T>,
  modelFunction: (validatedData: T) => Promise<any>
): Promise<ResultType<any>> {
  try {
    const validatedData = schema.parse(data)
    const result = await modelFunction(validatedData)
    return Result.success(true, result)
  } catch (error) {
    return Result.error(false, error)
  }
}
