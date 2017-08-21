import {OCValidators} from './oc-validators';
import * as moment from 'moment/moment';
import {DateUtil} from './date-util.service';
import {Moment} from 'moment';

describe('OCValidators', () => {

    describe('isBeforeOrSameDay', () => {
        let control: { value: Moment };

        beforeEach(() => {
            control = {value: moment()};
        });

        it('should pass validation with date before', () => {
            let isBeforeOrEqualDayFn = OCValidators.isBeforeOrSameDay(moment().add(1, 'days'));

            let result = isBeforeOrEqualDayFn.call(null, control);
            expect(result).toBeNull();
        });

        it('should pass validation with same date', () => {
            let isBeforeOrEqualDayFn = OCValidators.isBeforeOrSameDay(control.value);

            let result = isBeforeOrEqualDayFn.call(null, control);
            expect(result).toBeNull();
        });

        it('should return after date error', () => {
            let validatorDate = moment().subtract(1, 'days');
            let isBeforeOrEqualDayFn = OCValidators.isBeforeOrSameDay(validatorDate);

            let result = isBeforeOrEqualDayFn.call(null, control);
            expect(result).toBeTruthy();
            expect(DateUtil.isSameDay(result.isBeforeOrSameDay.beforeDate, validatorDate)).toBeTruthy();
            expect(DateUtil.isSameDay(result.isBeforeOrSameDay.actualDate, control.value)).toBeTruthy();
        });
    });

    describe('isAfterOrSameDay', () => {
        let control: { value: Moment };

        beforeEach(() => {
            control = {value: moment()};
        });

        it('should pass validation with date after', () => {
            let isAfterOrEqualDayFn = OCValidators.isAfterOrSameDay(moment().subtract(1, 'days'));

            let result = isAfterOrEqualDayFn.call(null, control);
            expect(result).toBeNull();
        });

        it('should pass validation with same date', () => {
            let isAfterOrEqualDayFn = OCValidators.isAfterOrSameDay(control.value);

            let result = isAfterOrEqualDayFn.call(null, control);
            expect(result).toBeNull();
        });

        it('should return before date error', () => {
            let validatorDate = moment().add(1, 'days');
            let isAfterOrEqualDayFn = OCValidators.isAfterOrSameDay(validatorDate);

            let result = isAfterOrEqualDayFn.call(null, control);
            expect(result).toBeTruthy();
            expect(DateUtil.isSameDay(result.isAfterOrSameDay.afterDate, validatorDate)).toBeTruthy();
            expect(DateUtil.isSameDay(result.isAfterOrSameDay.actualDate, control.value)).toBeTruthy();
        });
    });

    describe('isBetweenDaysInclusive', () => {
        let control: { value: Moment };

        beforeEach(() => {
            control = {value: moment()};
        });

        it('should pass validation with date in middle', () => {
            let lowerBound = moment().subtract(7, 'days');
            let upperBound = moment().add(7, 'days');

            let isBetweenDayFn = OCValidators.isBetweenDaysInclusive(lowerBound, upperBound);
            let result = isBetweenDayFn.call(null, control);
            expect(result).toBeNull();
        });

        it('should pass validation with date on lower Bound', () => {
            let lowerBound = moment().subtract(7, 'days');
            let upperBound = moment().add(7, 'days');

            let isBetweenDayFn = OCValidators.isBetweenDaysInclusive(lowerBound, upperBound);
            let result = isBetweenDayFn.call(null, {value: lowerBound});
            expect(result).toBeNull();
        });

        it('should pass validation with date on lower Bound', () => {
            let lowerBound = moment().subtract(7, 'days');
            let upperBound = moment().add(7, 'days');

            let controlValue = moment(lowerBound).subtract(1, 'days');

            let isBetweenDayFn = OCValidators.isBetweenDaysInclusive(lowerBound, upperBound);
            let result = isBetweenDayFn.call(null, {value: controlValue});
            expect(result).toBeTruthy();
            expect(DateUtil.isSameDay(result.isBetweenDaysInclusive.lowerBound, lowerBound)).toBeTruthy();
            expect(DateUtil.isSameDay(result.isBetweenDaysInclusive.upperBound, upperBound)).toBeTruthy();
            expect(DateUtil.isSameDay(result.isBetweenDaysInclusive.actualDate, controlValue)).toBeTruthy();
        });
    });

    describe('dateFromIsBeforeDateTo', () => {
        // TODO add test if I am not broke
    });
});
