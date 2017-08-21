import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';
import * as moment from 'moment';
import {Moment} from 'moment';
import {DateUtil} from './date-util.service';
import {OCMomentDateAdapter} from '../common/oc-moment-date-adapter';
import {OC_DATE_FORMATS} from '../common/oc-date-formats';
import {isNull} from 'util';

export class OCValidators {

    /**
     * validates whether the current value of the control is before the given date or not
     * only checks for the date not the time
     *
     * @param date that should be before the controls value
     * @returns {(control:AbstractControl)=>{[p: string]: any}}
     */
    public static isBeforeOrSameDay(date: Moment): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (control.value && !DateUtil.isBeforeOrSameDay(control.value, date)) {
                return {
                    'isBeforeOrSameDay': {'beforeDate': date, 'actualDate': control.value}
                }
            }
            return null;
        }
    }

    /**
     * validates whether the current value of the control is after the given date or not
     * only checks for the date not the time
     *
     * @param date that should be after the controls value
     * @returns {(control:AbstractControl)=>{[p: string]: any}}
     */
    public static isAfterOrSameDay(date: Moment): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (control.value && !DateUtil.isAfterOrSameDay(control.value, date)) {
                return {
                    'isAfterOrSameDay': {'afterDate': date, 'actualDate': control.value}
                }
            }
            return null;
        }
    }

    /**
     * searches for two controls in the FormGroup that represent a from date and a to date
     *
     * from date control name must contain either the string 'datefrom' or 'validfrom'
     * to date control name must contain either the string 'dateto' or 'validto'
     *
     *
     * @param firstDateName
     * @param secondDateName
     * @param isSameDayPossible
     * @returns {any}
     */
    public static dateFromIsBeforeDateTo(firstDateName: string = 'datefrom', secondDateName: string = 'dateto', isSameDayPossible: boolean = false) {
        return (formGroup: FormGroup): { [key: string]: any } => {
            let keys = Object.keys(formGroup.controls);
            let dateFromKey = keys.find(key => key.toLowerCase().includes(firstDateName.toLowerCase()) || key.toLowerCase().includes('validfrom'));
            let dateToKey = keys.find(key => key.toLowerCase().includes(secondDateName.toLowerCase()) || key.toLowerCase().includes('validto'));
            if (!dateFromKey && !dateToKey) return null;

            let dateFromControl = formGroup.controls[dateFromKey];
            let dateToControl = formGroup.controls[dateToKey];

            if ((isSameDayPossible && !moment(dateFromControl.value).isSameOrBefore(moment(dateToControl.value))) ||
                (!isSameDayPossible && !moment(dateFromControl.value).isBefore(moment(dateToControl.value)))) {
                return {
                    'dateToIsBeforeDateFrom': {'fromDate': dateFromControl.value, 'toDate': dateToControl.value}
                }
            }
            return null;
        }
    }

    /**
     * validates a control value which should be between the lower and upperBound
     * uses the DateUtil class to
     *
     * @param lowerBound date
     * @param upperBound date
     * @returns {(control:AbstractControl)=>{[p: string]: any}}
     */
    public static isBetweenDaysInclusive(lowerBound: Moment, upperBound: Moment) {
        return (control: AbstractControl): { [key: string]: any } => {
            let date = control.value;
            if (date && !DateUtil.isBetweenDaysInclusive(date, lowerBound, upperBound)) {
                return {
                    'isBetweenDaysInclusive': {'actualDate': date, 'lowerBound': lowerBound, 'upperBound': upperBound}
                }
            }
            return null;
        }
    }

    public static date(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            let dateAdapter = new OCMomentDateAdapter();
            let date = dateAdapter.parse(control.value, OC_DATE_FORMATS.parse.dateInput, true);
            if (isNull(date)) {
                return {
                    'date': {'requiredFormat': OC_DATE_FORMATS.parse.dateInput}
                }
            }
            return null;
        }
    }
}
