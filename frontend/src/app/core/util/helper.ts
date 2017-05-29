export function isFalsy(toCheck: any): boolean {
    return toCheck == false;
}

export function isTruthy(toCheck: any): boolean {
    return !isFalsy(toCheck);
}

export function isNull(toCheck: any): boolean {
    return toCheck === null;
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

export function isEmpty(toCheck: string|Array<any>): boolean {
    return isFalsy(toCheck) || toCheck.length == 0;
}

export function isNotEmpty(toCheck: string|Array<any>): boolean {
    return !isEmpty(toCheck);
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
