export type ResultType<Q,T> = | { params: Q, data: T }| { error: unknown };

export class Result {
    static success<Q,T>(params: Q, data: T): ResultType<Q,T> {
      return { params: params, data: data };
    }
  
    static error<Q,T>(error: unknown): ResultType<Q,T> {
      return { error };
    } 
}