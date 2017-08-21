import {QueryList} from '@angular/core';

export function isTruthy(toCheck: any): boolean {
    return Boolean(toCheck);
}

export function isFalsy(toCheck: any): boolean {
    return !isTruthy(toCheck)
}

export function isNull(toCheck: any): boolean {
    return toCheck === null || toCheck === undefined;
}

export function isNotNull(toCheck: any): boolean {
    return !isNull(toCheck);
}

export function isTrue(toCheck: any): boolean {
    return toCheck === true;
}

export function equals(first: any, second: any): boolean {
    return first === second;
}

export function eq(toVerify: any): Predicate<boolean> {
    return (element) => element === toVerify;
}

export function isEmpty(toCheck: string|Array<any>|QueryList<any>): boolean {
    return isFalsy(toCheck) || toCheck.length == 0;
}

export function isNotEmpty(toCheck: string|Array<any>|QueryList<any>): boolean {
    return !isEmpty(toCheck);
}

export function getIfTruthy(object: any, prop: string, defaultValue: any = null) {
    if (isTruthy(object[prop])) {
        return object[prop];
    }
    return defaultValue;
}

export function isString(toCheck: any) {
    return typeof toCheck == 'string';
}

export function isDate(toCheck: any) {
    return toCheck instanceof Date;
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

export function negate<T>(predicate: Predicate<T>, thisArg?: any): Predicate<T> {
    return (arg) => !predicate.call(thisArg, arg);
}
