import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';
import * as moment from 'moment';
import {DateUtil} from './date-util.service';

export class OCValidators {

    /**
     * validates whether the current value of the control is before the given date or not
     * only checks for the date not the time
     *
     * @param date that should be before the controls value
     * @returns {(control:AbstractControl)=>{[p: string]: any}}
     */
    public static isBeforeOrEqualDay(date: Date): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (control.value && !DateUtil.isBeforeDay(control.value, date)) {
                return {
                    'isBeforeDay': {'beforeDate': date, 'actualDate': control.value}
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
    public static isAfterOrEqualDay(date: Date): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (control.value && !DateUtil.isAfterDay(control.value, date)) {
                return {
                    'isAfterDay': {'afterDate': date, 'actualDate': control.value}
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
    public static isBetweenDay(lowerBound: Date, upperBound: Date) {
        return (control: AbstractControl): { [key: string]: any } => {
            let date = control.value;
            if (date && !DateUtil.isBetweenDay(date, lowerBound, upperBound)) {
                return {
                    'isBetweenDay': {'actualDate': date, 'lowerBound': lowerBound, 'upperBound': upperBound}
                }
            }
            return null;
        }
    }
}
