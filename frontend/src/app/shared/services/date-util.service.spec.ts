import * as moment from 'moment/moment';
import {DateUtil} from './date-util.service';

describe('DateUtil', () => {
    describe('isSameDay', () => {
       it('should return true', () => {
           let firstDate = moment('2017-01-01').toDate();
           let secondDate = moment('2017-01-01').toDate();

           expect(DateUtil.isSameDay(firstDate, secondDate)).toBe(true);
       });

       it('should return false', () => {
           let firstDate = moment('2017-01-01').toDate();
           let secondDate = moment('2017-01-02').toDate();

           expect(DateUtil.isSameDay(firstDate, secondDate)).toBe(false);
       });
    });

    describe('isBeforeDay', () => {
        it('should return true with before date', () => {
            let firstDate = moment('2017-01-01').toDate();
            let secondDate = moment('2017-01-02').toDate();

            expect(DateUtil.isBeforeDay(firstDate, secondDate)).toBe(true);
        });

        it('should return true with same date', () => {
            let firstDate = moment('2017-01-01').toDate();
            let secondDate = moment('2017-01-01').toDate();

            expect(DateUtil.isBeforeDay(firstDate, secondDate)).toBe(true);
        });

        it('should return false', () => {
            let firstDate = moment('2017-01-02').toDate();
            let secondDate = moment('2017-01-01').toDate();

            expect(DateUtil.isBeforeDay(firstDate, secondDate)).toBe(false);
        });
    });

    describe('isAfterDay', () => {
        it('should return true with after date', () => {
            let firstDate = moment('2017-01-02').toDate();
            let secondDate = moment('2017-01-01').toDate();

            expect(DateUtil.isAfterDay(firstDate, secondDate)).toBe(true);
        });

        it('should return true with same date', () => {
            let firstDate = moment('2017-01-01').toDate();
            let secondDate = moment('2017-01-01').toDate();

            expect(DateUtil.isAfterDay(firstDate, secondDate)).toBe(true);
        });

        it('should return false', () => {
            let firstDate = moment('2017-01-01').toDate();
            let secondDate = moment('2017-01-02').toDate();

            expect(DateUtil.isAfterDay(firstDate, secondDate)).toBe(false);
        });
    });

    describe('isBetweenDay', () => {
        it('should return true with date on lowerBound', () => {
            let baseDate = moment().toDate();
            let lowerBound = moment().toDate();
            let upperBound = moment().add(7, 'days').toDate();

            expect(DateUtil.isBetweenDay(baseDate, lowerBound, upperBound)).toBe(true);
        });

        it('should return true with date in middle', () => {
            let baseDate = moment().toDate();
            let lowerBound = moment().subtract(7, 'days').toDate();
            let upperBound = moment().add(7, 'days').toDate();

            expect(DateUtil.isBetweenDay(baseDate, lowerBound, upperBound)).toBe(true);
        });

        it('should return false with date outside', () => {
            let baseDate = moment().toDate();
            let lowerBound = moment().subtract(14, 'days').toDate();
            let upperBound = moment().subtract(7, 'days').toDate();

            expect(DateUtil.isBetweenDay(baseDate, lowerBound, upperBound)).toBe(false);
        });
    });
});
