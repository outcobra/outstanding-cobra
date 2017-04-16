import * as moment from 'moment';

const dateFormat = 'YYYY-MM-DD';

/**
 * revives dates from a string
 * only used in the context of JSON.parse()
 *
 * @param key
 * @param value
 * @returns {any}
 */
export function dateReviver(key, value): Date {
    if (typeof value === 'string') {
        let date = getMomentFromString(value);
        if (date.isValid()) {
            return date.toDate();
        }
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
        let date = getMomentFromString(value);
        if (date.isValid()) {
            return date.format('YYYY-MM-DD');
        }
    }
    return value;
}

function getMomentFromString(value: string) {
    return moment(value, dateFormat, true);
}
