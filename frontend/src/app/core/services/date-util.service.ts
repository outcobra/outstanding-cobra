import * as moment from 'moment';

export class DateUtil {

    // technically min and max date
    public static readonly MIN_DATE = new Date(1000, 1, 1);
    public static readonly MAX_DATE = new Date(9999, 11, 31);
    public static readonly DATE_REGEX = /^\d{4}-\d{1,2}-\d{1,2}$/;

    /**
     * checks if the 2 dates are on the same day
     * the time doesn't matter
     *
     * @param date1
     * @param date2
     * @returns {boolean}
     */
    public static isSameDay(date1: Date, date2: Date): boolean {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
    }

    /**
     * checks whether the beforeDate is before the afterDate
     * @param before Date
     * @param after Date
     * @returns {boolean}
     */
    public static isBeforeOrSameDay(before: Date, after: Date) {
        return moment(before.toDateString()).isSameOrBefore(after.toDateString());
    }

    /**
     * checks whether the afterDate is after the beforeDate
     * @param after Date
     * @param before Date
     * @returns {boolean}
     */
    public static isAfterOrSameDay(after: Date, before: Date) {
        return moment(after.toDateString()).isSameOrAfter(before.toDateString());
    }

    /**
     * checks whether the first date is between or equal to the lower and upper bound
     *
     * @param date
     * @param lowerBound
     * @param upperBound
     * @returns {boolean}
     */
    public static isBetweenDaysInclusive(date: Date, lowerBound: Date, upperBound: Date): boolean {
        return moment(date.toDateString()).isBetween(moment(lowerBound), moment(upperBound), null, '[]');
    }

    /**
     * checks if the provided date is equal to the internal MIN_DATE
     *
     * @param date
     * @returns {boolean}
     */
    public static isMinDate(date: Date) {
        return this.isSameDay(date, this.MIN_DATE);
    }

    /**
     * checks if the provided date is equal to the internal MAX_DATE
     *
     * @param date
     * @returns {boolean}
     */
    public static isMaxDate(date: Date) {
        return this.isSameDay(date, this.MAX_DATE);
    }

    public static transformToDateIfPossible(date: any): Date {
        if (this.DATE_REGEX.test(date)) {
            return moment(date).toDate();
        }
        return null;
    }

}
