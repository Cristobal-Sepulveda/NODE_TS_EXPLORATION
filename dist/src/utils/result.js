export class Result {
    static success(success, data) {
        return { success, data };
    }
    static error(success, error) {
        return { success, error };
    }
}
