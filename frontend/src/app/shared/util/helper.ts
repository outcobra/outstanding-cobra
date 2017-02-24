export function isNull(toCheck: any): boolean {
    return toCheck == null || toCheck == undefined || toCheck == '' || toCheck == 0 || toCheck == 0.0;
}

export function isNotNull(toCheck: any): boolean {
    return !isNull(toCheck);
}

export function isTrue(toCheck: any): boolean {
    return toCheck === true;
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

