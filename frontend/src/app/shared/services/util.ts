import {dateReplacer, dateReviver} from "../http/http-util";
import {FormGroup} from "@angular/forms";
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
    static getUrlParam(paramName: string) {
        let result = null,
            tmp = [];
        window.location.search
            .substr(1)
            .split("&")
            .forEach((item) => {
                tmp = item.split("=");
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
    static split<T>(array: Array<T>, length: number): Array<Array<T>> {
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
    static arrayRemove<T>(array: Array<T>, findPredicate: Predicate<T>): Array<T> {
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
    static clone<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj, dateReplacer), dateReviver) as T;
    }

    /**
     *
     */
    static cloneArray<T>(array: Array<T>): Array<T> {
        return array.slice(0);
    }

    /**
     * returns the time in milliseconds since the 01.01.1970
     * @returns {number}
     */
    static getMillis(): number {
        return new Date().getTime();
    }

    /**
     * marks invalid fields in the FormGroup as touched
     * used for validation on submit
     *
     * @param form FormGroup
     */
    static revalidateForm(form: FormGroup) {
        Object.keys(form.controls).forEach((key) => {
            let control = form.controls[key];
            if (control instanceof FormGroup) {
                this.revalidateForm(control);
            }
            if (!control.valid) {
                control.markAsTouched();
            }
        });
    }
}

/**
 * combines multiple {Predicate}s to an and chain of {Predicate}s
 * returns {Predicate} that evaluates all {Predicate}s in the param
 *
 * @param predicates
 * @returns {(arg:any)=>boolean}
 */
export function and<T>(predicates: Predicate<T>[]): Predicate<T> {
    return (arg) => predicates.every(p => p(arg));
}
