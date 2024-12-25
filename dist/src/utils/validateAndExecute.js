import { Result } from './result.js';
export async function validateAndExecute(data, schema, modelFunction) {
    try {
        const validatedData = schema.parse(data);
        const result = await modelFunction(validatedData);
        return Result.success(result);
    }
    catch (error) {
        return Result.error(error);
    }
}
