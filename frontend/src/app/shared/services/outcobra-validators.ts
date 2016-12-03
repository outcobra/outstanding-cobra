import {AbstractControl, FormGroup, ValidatorFn, Form} from "@angular/forms";
import * as moment from "moment";
import {DateUtil} from "./date-util.service";
import {Injector} from "@angular/core";

export class OutcobraValidators {
    public static isBeforeDay(date: Date): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            if (control.value && moment(control.value).isBefore(moment(date.toISOString()))) {
                return {
                    'isBeforeDay': {'afterDate': date, 'actualDate': control.value}
                }
            }
            return null;
        }
    }

    public static isAfterDay(date: Date): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            if (control.value && moment(control.value).isAfter(moment(date.toISOString()))) {
                return {
                    'isAfterDay': {'afterDate': date, 'actualDate': control.value}
                }
            }
            return null;
        }
    }

    public static dateFromIsBeforeDateTo(group: FormGroup) {
            let keys = Object.keys(group.controls);
            let dateFromKey = keys.find(key => key.toLowerCase().includes('datefrom'));
            let dateToKey = keys.find(key => key.toLowerCase().includes('dateto'));
            if (!dateFromKey && !dateToKey) return null;

            let dateFromControl = group.controls[dateFromKey];
            let dateToControl = group.controls[dateToKey];

            if (!moment(dateFromControl.value).isBefore(moment(dateToControl.value))) {
                return {
                    'dateFromIsBeforeDateTo': {'fromDate': dateFromControl.value, 'toDate': dateToControl.value}
                }
            }
            return null;

    }

    public static isBetweenDay(lowerBound: Date, upperBound: Date) {
        return (control: AbstractControl): {[key: string]: any} => {
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
