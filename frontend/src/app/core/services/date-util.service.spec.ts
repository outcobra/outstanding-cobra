import * as moment from 'moment/moment';
import {DateUtil} from './date-util.service';

describe('DateUtil', () => {
    describe('isSameDay', () => {
       it('should return true', () => {
           let firstDate = moment('2017-01-01').toDate();
           let secondDate = moment('2017-01-01').toDate();

           expect(DateUtil.isSameDay(firstDate, secondDate)).toBeTruthy();
       });

       it('should return false', () => {
           let firstDate = moment('2017-01-01').toDate();
           let secondDate = moment('2017-01-02').toDate();

           expect(DateUtil.isSameDay(firstDate, secondDate)).toBeFalsy();
       });
    });

    describe('isBeforeOrSameDay', () => {
        it('should return true with before date', () => {
            let firstDate = moment('2017-01-01').toDate();
            let secondDate = moment('2017-01-02').toDate();

            expect(DateUtil.isBeforeOrSameDay(firstDate, secondDate)).toBeTruthy();
        });

        it('should return true with same date', () => {
            let firstDate = moment('2017-01-01').toDate();
            let secondDate = moment('2017-01-01').toDate();

            expect(DateUtil.isBeforeOrSameDay(firstDate, secondDate)).toBeTruthy();
        });

        it('should return false', () => {
            let firstDate = moment('2017-01-02').toDate();
            let secondDate = moment('2017-01-01').toDate();

            expect(DateUtil.isBeforeOrSameDay(firstDate, secondDate)).toBeFalsy();
        });
    });

    describe('isAfterOrSameDay', () => {
        it('should return true with after date', () => {
            let firstDate = moment('2017-01-02').toDate();
            let secondDate = moment('2017-01-01').toDate();

            expect(DateUtil.isAfterOrSameDay(firstDate, secondDate)).toBeTruthy();
        });

        it('should return true with same date', () => {
            let firstDate = moment('2017-01-01').toDate();
            let secondDate = moment('2017-01-01').toDate();

            expect(DateUtil.isAfterOrSameDay(firstDate, secondDate)).toBeTruthy();
        });

        it('should return false', () => {
            let firstDate = moment('2017-01-01').toDate();
            let secondDate = moment('2017-01-02').toDate();

            expect(DateUtil.isAfterOrSameDay(firstDate, secondDate)).toBeFalsy();
        });
    });

    describe('isBetweenDaysInclusive', () => {
        it('should return true with date on lowerBound', () => {
            let baseDate = moment().toDate();
            let lowerBound = moment().toDate();
            let upperBound = moment().add(7, 'days').toDate();

            expect(DateUtil.isBetweenDaysInclusive(baseDate, lowerBound, upperBound)).toBeTruthy();
        });

        it('should return true with date in middle', () => {
            let baseDate = moment().toDate();
            let lowerBound = moment().subtract(7, 'days').toDate();
            let upperBound = moment().add(7, 'days').toDate();

            expect(DateUtil.isBetweenDaysInclusive(baseDate, lowerBound, upperBound)).toBeTruthy();
        });

        it('should return false with date outside', () => {
            let baseDate = moment().toDate();
            let lowerBound = moment().subtract(14, 'days').toDate();
            let upperBound = moment().subtract(7, 'days').toDate();

            expect(DateUtil.isBetweenDaysInclusive(baseDate, lowerBound, upperBound)).toBeFalsy();
        });
    });
});
