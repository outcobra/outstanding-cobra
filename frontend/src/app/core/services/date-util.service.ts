import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { isDate, isMoment, Moment } from 'moment';
import { isString } from '../util/helper';

@Injectable()
export class DateUtil {

  // technically min and max date
  public static readonly MIN_DATE = moment([1000, 1, 1]);
  public static readonly MAX_DATE = moment([9999, 11, 31]);
  public static readonly DATE_REGEX = /^\d{4}-\d{1,2}-\d{1,2}$/;

  /**
   * checks if the 2 dates are on the same day
   * the time doesn't matter
   *
   * @param date1
   * @param date2
   * @returns {boolean}
   */
  public static isSameDay(date1: Moment, date2: Moment): boolean {
    return date1.isSame(date2); // TODO only day
  }

  /**
   * checks whether the beforeDate is before the afterDate
   * @param before Date
   * @param after Date
   * @returns {boolean}
   */
  public static isBeforeOrSameDay(before: Moment, after: Moment) {
    return before.isSameOrBefore(after);
  }

  /**
   * checks whether the afterDate is after the beforeDate
   * @param after Date
   * @param before Date
   * @returns {boolean}
   */
  public static isAfterOrSameDay(after: Moment, before: Moment) {
    return after.isSameOrAfter(before);
  }

  /**
   * checks whether the first date is between or equal to the lower and upper bound
   *
   * @param date
   * @param lowerBound
   * @param upperBound
   * @returns {boolean}
   */
  public static isBetweenDaysInclusive(date: Moment, lowerBound: Moment, upperBound: Moment): boolean {
    return date.isBetween(lowerBound, upperBound, 'day', '[]');
  }

  /**
   * checks if the provided date is equal to the internal MIN_DATE
   *
   * @param date
   * @returns {boolean}
   */
  public static isMinDate(date: Moment) {
    return this.isSameDay(date, this.MIN_DATE);
  }

  /**
   * checks if the provided date is equal to the internal MAX_DATE
   *
   * @param date
   * @returns {boolean}
   */
  public static isMaxDate(date: Moment) {
    return this.isSameDay(date, this.MAX_DATE);
  }

  /**
   * transforms the given date to a moment when the
   * @param date
   * @returns {moment.Moment}
   */
  public static transformToMomentIfPossible(date: any): Moment {
    if (isMoment(date)) {
      return date;
    }
    if ((isString(date) && this.DATE_REGEX.test(date)) || isDate(date)) {
      return moment(date);
    }
    return null;
  }

}
