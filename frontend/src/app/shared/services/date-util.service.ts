import * as moment from "moment";

export class DateUtil {

    // technically min and max date
    public static readonly MIN_DATE = new Date(1000, 1, 1);
    public static readonly MAX_DATE = new Date(9999, 11, 31);

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
     * checks whether the first date is between or equal to the lower and upper bound
     *
     * @param date
     * @param lowerBound
     * @param upperBound
     * @returns {boolean}
     */
    public static isBetweenDay(date: Date, lowerBound: Date, upperBound: Date): boolean {
        let normalizedDate = this.normalizeDate(date);
        return this.normalizeDate(lowerBound) <= normalizedDate && normalizedDate <= this.normalizeDate(upperBound);
    }

    /**
     * makes a clean date from a date
     * removes the time
     *
     * @param date with time
     * @returns {Date} same date as input but without time
     */
    public static normalizeDate(date: Date): Date {
        console.log(date.toLocaleDateString());
        return new Date(date.toLocaleDateString());
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

}

Date.prototype.toJSON = (key?: any) => {
    return moment(this).format('YYYY-MM-DD');
};
