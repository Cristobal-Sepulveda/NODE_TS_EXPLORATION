import { ZodSchema } from 'zod'
import { Result } from './result.js'

export async function validateAndExecute<T> (
  data: Record<string, string | undefined>,
  schema: ZodSchema<T>,
  modelFunction: (validatedData: T) => Promise<any>
): Promise<Result> {
  try {
    console.log(data)
    const validatedData = schema.parse(data)
    const result = await modelFunction(validatedData)
    console.log(validatedData)
    console.log(`result ${String(result)}`)
    return Result.success(true, result)
  } catch (error) {
    return Result.error(false, error)
  }
}
