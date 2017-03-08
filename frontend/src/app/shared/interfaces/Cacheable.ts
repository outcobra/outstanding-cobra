import {Observable} from 'rxjs';

/**
 * interface which defines all methods for a service which can cache the type T
 */
export interface Cacheable<T> {
    /**
     * expiration of the cache as number (e.g. milliseconds)
     * should be updated after every save to the cache
     */
    expiration: number;
    /**
     * the cache where the cached Objects should be saved
     */
    cache: T;
    /**
     * observable cache to save the observable returned by an asynchronous operation
     * can be returned by a cached function when the asynchronous operation is still in progress and the cache on the cache property isn't available yet
     */
    observable: Observable<T>;
    /**
     * saves the given argument in the cache
     * @param arg
     */
    saveCache(arg: T): void;
    /**
     * saves the given observable
     * @param observable
     */
    saveObservable(observable: Observable<T>): Observable<T>;
    /**
     * clears the current cache
     */
    clearCache(): void;
    /**
     * clears the current observable
     */
    clearObservable(): void;
    /**
     * performs a check whether there is something in the change and it hasn't expired yet
     */
    hasCache(): boolean;
}
