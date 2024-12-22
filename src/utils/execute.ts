import { Result } from "./result.js";

export async function execute<T, P>(
    executeParamsValidation: (params: P | undefined) => Promise<P>,
    executeOnBackground: (params: P | undefined) => Promise<T>, 
    parameters?: P
  ): Promise<Result> {
    try {
      const params = executeParamsValidation(parameters);
      const data = await executeOnBackground(params as P);
      return Result.success(params, data);
    } catch (error) {
      console.error(error)
      return Result.error(error instanceof Error ? error : new Error('An unknown error occurred'))
    }
  }