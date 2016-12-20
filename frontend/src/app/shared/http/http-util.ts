import * as moment from "moment";

const dateRegex = /^\d{4}-\d{1,2}-\d{1,2}$/;

export function dateReviver(key, value): Date {
    if (typeof value === 'string' && dateRegex.test(value.trim())) {
        return new Date(value.trim());
    }
    return value;
}

export function dateReplacer(key, value): string {
    if (typeof value === 'string') {
        let date = moment(value);
        if (date.isValid()) {
            return date.format('YYYY-MM-DD');
        }
    }
    return value;
}
