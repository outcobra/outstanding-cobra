import {Injectable} from "@angular/core";

@Injectable()
export class DateUtil {

    // technically min and max date
    public readonly MIN_DATE = new Date(1000, 1, 1);
    public readonly MAX_DATE = new Date(9999, 11, 31);

    /**
     * checks if the 2 dates are at the same day
     * the time doesn't matter
     *
     * @param date1
     * @param date2
     * @returns {boolean}
     */
    public isSameDay(date1: Date, date2: Date): boolean {
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
    public isBetweenDay(date: Date, lowerBound: Date, upperBound: Date): boolean {
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
    public normalizeDate(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    /**
     * checks if the provided date is equal to the internal MIN_DATE
     *
     * @param date
     * @returns {boolean}
     */
    public isMinDate(date: Date) {
        return this.isSameDay(date, this.MIN_DATE);
    }

    /**
     * checks if the provided date is equal to the internal MAX_DATE
     *
     * @param date
     * @returns {boolean}
     */
    public isMaxDate(date: Date) {
        return this.isSameDay(date, this.MAX_DATE);
    }

}
