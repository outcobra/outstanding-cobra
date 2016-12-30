import {Observable} from "rxjs";

export interface Cacheable<T> {
    expiration: number;
    cache: T;
    observable: Observable<T>;
    saveCache<T>(arg: T): void;
    saveObservable(observable: Observable<T>): Observable<T>;
    clearCache(): void;
    clearObservable(): void;
    hasCache(): boolean;
}
