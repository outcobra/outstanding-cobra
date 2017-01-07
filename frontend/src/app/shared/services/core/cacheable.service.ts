import {Cacheable} from "../../interfaces/Cacheable";
import {Observable} from "rxjs";
import {Util} from "../util";
import {HttpInterceptor} from "../../http/HttpInterceptor";
import {AppService} from "./app.service";

/**
 * Default implementation of a caching service
 */
export abstract class CacheableService<T> extends AppService implements Cacheable<T> {
    expiration: number;
    cache: T;
    observable: Observable<T>;

    constructor(http: HttpInterceptor = null, baseUri: string = '', private expiredAfter: number = 600000) {
        super(http, baseUri);
    }

    saveCache(arg: T): void {
        this.cache = arg;
        this.expiration = Util.getMillis();
    }

    saveObservable(observable: Observable<T>): Observable<T> {
        return this.observable = observable;
    }

    clearCache(): void {
        this.cache = null;
    }

    clearObservable(): void {
        this.observable = null;
    }

    hasCache(): boolean {
        return this.cache && this.expiration && Util.getMillis() - this.expiration <= this.expiredAfter; // cache not older than 10 minutes TODO other?
    }
}
