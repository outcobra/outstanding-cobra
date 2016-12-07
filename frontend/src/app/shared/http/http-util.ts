const dateRegex = /^\d{4}-\d{1,2}-\d{1,2}$/;

export function dateReviver(key, value): Date {
    if (typeof value == 'string' && dateRegex.test(value.trim())) {
        return new Date(value.trim());
    }
    return value;
}
