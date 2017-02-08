import * as moment from 'moment';

const dateRegex = /^\d{4}-\d{1,2}-\d{1,2}$/;

/**
 * revives dates from a string
 * only used in the context of JSON.parse()
 *
 * @param key
 * @param value
 * @returns {any}
 */
export function dateReviver(key, value): Date {
    if (typeof value === 'string' && dateRegex.test(value.trim())) {
        return new Date(value.trim());
    }
    return value;
}

/**
 * replaces dates with a date string
 * only used in the context of JSON.stringify()
 *
 * ignore momentjs errors
 * @param key
 * @param value
 * @returns {any}
 */
export function dateReplacer(key, value): string {
    if (typeof value === 'string') {
        let date = moment(value);
        if (date.isValid()) {
            return date.format('YYYY-MM-DD');
        }
    }
    return value;
}
