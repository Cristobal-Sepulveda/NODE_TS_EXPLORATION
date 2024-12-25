export const Result = {
    success(data) {
        return { type: 'success', data };
    },
    error(error) {
        return { type: 'error', error };
    }
};
