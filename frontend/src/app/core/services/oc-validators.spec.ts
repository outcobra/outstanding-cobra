import {OCValidators} from './oc-validators';
import * as moment from 'moment/moment';
import {DateUtil} from './date-util.service';

describe('OCValidators', () => {

    describe('isBeforeOrEqualDay', () => {
        let control: { value: Date };

        beforeEach(() => {
            control = {value: new Date()};
        });

        it('should pass validation with date before', () => {
            let isBeforeOrEqualDayFn = OCValidators.isBeforeOrEqualDay(moment().add(1, 'days').toDate());

            let result = isBeforeOrEqualDayFn.call(null, control);
            expect(result).toBeNull();
        });

        it('should pass validation with same date', () => {
            let isBeforeOrEqualDayFn = OCValidators.isBeforeOrEqualDay(control.value);

            let result = isBeforeOrEqualDayFn.call(null, control);
            expect(result).toBeNull();
        });

        it('should return after date error', () => {
            let validatorDate = moment().subtract(1, 'days').toDate();
            let isBeforeOrEqualDayFn = OCValidators.isBeforeOrEqualDay(validatorDate);

            let result = isBeforeOrEqualDayFn.call(null, control);
            expect(result).toBeTruthy();
            expect(DateUtil.isSameDay(result.isBeforeOrSameDay.beforeDate, validatorDate)).toBeTruthy();
            expect(DateUtil.isSameDay(result.isBeforeOrSameDay.actualDate, control.value)).toBeTruthy();
        });
    });

    describe('isAfterOrEqualDay', () => {
        let control: { value: Date };

        beforeEach(() => {
            control = {value: new Date()};
        });

        it('should pass validation with date after', () => {
            let isAfterOrEqualDayFn = OCValidators.isAfterOrEqualDay(moment().subtract(1, 'days').toDate());

            let result = isAfterOrEqualDayFn.call(null, control);
            expect(result).toBeNull();
        });

        it('should pass validation with same date', () => {
            let isAfterOrEqualDayFn = OCValidators.isAfterOrEqualDay(control.value);

            let result = isAfterOrEqualDayFn.call(null, control);
            expect(result).toBeNull();
        });

        it('should return before date error', () => {
            let validatorDate = moment().add(1, 'days').toDate();
            let isAfterOrEqualDayFn = OCValidators.isAfterOrEqualDay(validatorDate);

            let result = isAfterOrEqualDayFn.call(null, control);
            expect(result).toBeTruthy();
            expect(DateUtil.isSameDay(result.isAfterOrSameDay.afterDate, validatorDate)).toBeTruthy();
            expect(DateUtil.isSameDay(result.isAfterOrSameDay.actualDate, control.value)).toBeTruthy();
        });
    });

    describe('isBetweenDaysInclusive', () => {
        let control: { value: Date };

        beforeEach(() => {
            control = {value: new Date()};
        });

        it('should pass validation with date in middle', () => {
            let lowerBound = moment().subtract(7, 'days').toDate();
            let upperBound = moment().add(7, 'days').toDate();

            let isBetweenDayFn = OCValidators.isBetweenDay(lowerBound, upperBound);
            let result = isBetweenDayFn.call(null, control);
            expect(result).toBeNull();
        });

        it('should pass validation with date on lower Bound', () => {
            let lowerBound = moment().subtract(7, 'days').toDate();
            let upperBound = moment().add(7, 'days').toDate();

            let isBetweenDayFn = OCValidators.isBetweenDay(lowerBound, upperBound);
            let result = isBetweenDayFn.call(null, {value: lowerBound});
            expect(result).toBeNull();
        });

        it('should pass validation with date on lower Bound', () => {
            let lowerBound = moment().subtract(7, 'days').toDate();
            let upperBound = moment().add(7, 'days').toDate();

            let controlValue = moment(lowerBound).subtract(1, 'days').toDate();

            let isBetweenDayFn = OCValidators.isBetweenDay(lowerBound, upperBound);
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
