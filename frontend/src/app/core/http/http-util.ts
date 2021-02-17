import * as moment from 'moment';

/**
 * revives dates from a string
 * only used in the context of JSON.parse()
 *
 * @param key
 * @param value
 * @returns {any}
 */

/*export function dateReviver(key, value): Date {
    if (typeof value === 'string' && dateRegex.test(value.trim())) {
        return new Date(value.trim());
    }
    return value;
}*/

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
  if (moment.isMoment(this[key])) {
    return moment(value).format('YYYY-MM-DD');
  }
  return value;
}
