import {Cacheable} from "../../interfaces/Cacheable";
import {Observable} from "rxjs";
import {Util} from "../../util/util";
import {HttpInterceptor} from "../../http/HttpInterceptor";
import {AppService} from "./app.service";

/**
 * Default implementation of a caching service
 *
 * saves objects to a local cache and sets an expiration for this cache
 * observables can also be stored
 *
 * the default expiration time is set to 10 minutes
 * can be set in the constructor
 */
export abstract class CacheableService<T> extends AppService implements Cacheable<T> {
    expiration: number;
    cache: T;
    observable: Observable<T>;

    /**
     * @param http HttpClient
     * @param baseUri of the services http calls
     * @param expiredAfter time in milliseconds that the cache lives (default 10 minutes)
     */
    constructor(http: HttpInterceptor = null, baseUri: string = '', private expiredAfter: number = 600000) {
        super(http, baseUri);
    }

    /**
     * save the argument to the cache and reset the expiration
     * @param arg the object to be saved
     */
    saveCache(arg: T): void {
        this.cache = arg;
        this.expiration = Util.getMillis();
    }

    /**
     * save an uncompleted observable to the cache
     * @param observable
     * @returns {Observable<T>}
     */
    saveObservable(observable: Observable<T>): Observable<T> {
        return this.observable = observable;
    }

    /**
     * clear the default cache
     */
    clearCache(): void {
        this.cache = null;
    }

    /**
     * clear the observable cache
     */
    clearObservable(): void {
        this.observable = null;
    }

    /**
     * check if there is cache and if it isn't expired
     *
     * @returns {boolean}
     */
    hasCache(): boolean {
        return this.cache && this.expiration && Util.getMillis() - this.expiration <= this.expiredAfter; // cache not older than 10 minutes TODO other?
    }
}
