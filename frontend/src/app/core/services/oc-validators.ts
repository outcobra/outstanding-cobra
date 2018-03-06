import {AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import * as moment from 'moment';
import {Moment} from 'moment';
import {DateUtil} from './date-util.service';
import {OC_DATE_FORMATS} from '../common/oc-date-formats';
import {isNull} from 'util';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {UserService} from './user.service';
import {isTrue} from '../util/helper';
import {Observable} from 'rxjs/Observable';

export class OCValidators {
    public static readonly PASSWORD_REGEX: RegExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\-_£{}[\]!*|\/\\:.;?@#$%^&+=])(?=\S+$).{8,}$/;

    /**
     * validates whether the current value of the control is before the given date or not
     * only checks for the date not the time
     *
     * @param date that should be before the controls value
     * @returns {(control:AbstractControl)=>{[p: string]: any}}
     */
    public static isBeforeOrSameDay(date: Moment): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
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
        return (control: AbstractControl): ValidationErrors | null => {
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
        return (formGroup: FormGroup): ValidationErrors | null => {
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
        return (control: AbstractControl): ValidationErrors | null => {
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
        return (control: AbstractControl): ValidationErrors | null => {
            let dateAdapter = new MomentDateAdapter('de');
            let date = dateAdapter.parse(control.value, OC_DATE_FORMATS.parse.dateInput);
            if (isNull(date)) {
                return {
                    'date': {'requiredFormat': OC_DATE_FORMATS.parse.dateInput}
                }
            }
            return null;
        }
    }

    public static equals(field1: string, field2: string): ValidatorFn {
        return (group: FormGroup): ValidationErrors | null => {
            let field1Control = group.get(field1);
            let field2Control = group.get(field2);

            if (field1Control.value === field2Control.value) {
                return null;
            }
            return {
                'equals': {'expectedValue': field1Control.value, 'actualValue': field2Control.value}
            };
        }
    }

    public static checkMailNotTaken(userService: UserService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return Observable.timer(500)
                .switchMap(() => userService.checkMailNotTaken(control.value))
                .map(res => {
                    return isTrue(res) ? null : {mailTaken: true};
                });
        }
    }
}
