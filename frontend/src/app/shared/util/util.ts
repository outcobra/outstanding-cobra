import {dateReplacer, dateReviver} from '../http/http-util';
import {AbstractControl, FormGroup} from '@angular/forms';
/**
 * Util class
 * contains everything that does not fit in another service
 */
export class Util {

    /**
     * searches for the given parameter in the URL and returns the value
     * if it isn't present it returns null
     *
     * @param paramName
     * @returns {null}
     */
    public static getUrlParam(paramName: string) {
        let result = null,
            tmp = [];
        window.location.search
            .substr(1)
            .split('&')
            .forEach((item) => {
                tmp = item.split('=');
                if (tmp[0] === paramName) result = decodeURIComponent(tmp[1]);
            });
        return result;
    }

    /**
     * returns an array containing subarrays from the input array with the length
     * does not mutate the input array
     * length: 2
     * ["abc", "def", "hij", "klm", "nop"] => [["abc", "def"], ["hij", "klm"], ["nop"]]
     *
     * @param array to split
     * @param length of the subarrays
     * @returns {Array}
     */
    public static split<T>(array: Array<T>, length: number): Array<Array<T>> {
        let out = [];
        let copy = Util.cloneArray<T>(array); // copy the array to not mutate the input
        while (copy.length > 0) {
            out.push(copy.splice(0, length));
        }
        return out;
    }

    /**
     * removes the element in the array
     * if the element is not found the unchanged array is returned
     *
     * @param array
     * @param findPredicate
     * @returns {any}
     */
    public static arrayRemove<T>(array: Array<T>, findPredicate: Predicate<T>): Array<T> {
        let index = array.findIndex(t => findPredicate(t));
        if (!index && index != 0) return array;
        return array.splice(index, 1)
    }

    /**
     * clones the given object and returns the copy
     *
     * @param obj
     * @returns {any}
     */
    public static clone<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj, dateReplacer), dateReviver) as T;
    }

    /**
     *
     */
    public static cloneArray<T>(array: Array<T>): Array<T> {
        return array.slice(0);
    }

    /**
     * returns the time in milliseconds since the 01.01.1970
     * @returns {number}
     */
    public static getMillis(): number {
        return new Date().getTime();
    }

    /**
     * marks invalid fields in the FormGroup as touched and returns the validity of the FormGroup
     * used for validation on submit
     *
     * @param form FormGroup
     * @return validity of the given FormGroup
     */
    public static revalidateForm(form: FormGroup): boolean {
        Object.keys(form.controls).forEach((key) => {
            let control: AbstractControl = form.controls[key];
            if (control instanceof FormGroup) {
                this.revalidateForm(control);
            } else {
                this.revalidateControl(control);
            }
        });
        return form.valid;
    }

    /**
     * recalculates the validity of the given control and marks it as touched if invalid
     *
     * @param control AbstractControl to be checked
     * @return {boolean} the validity of the control
     */
    public static revalidateControl(control: AbstractControl): boolean {
        control.updateValueAndValidity({onlySelf: true});
        if (control.invalid) {
            control.markAsTouched();
        }
        return control.valid;
    }

    public static bindAndCall(func: Function, thisArg: any, args?: any) {
        let f = args ? func.bind(thisArg, args) : func.bind(thisArg);
        return f.call();
    }
}
