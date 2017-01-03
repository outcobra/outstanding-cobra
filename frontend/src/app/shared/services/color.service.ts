import {Injectable} from "@angular/core";
import {HttpInterceptor} from "../http/HttpInterceptor";
import {Color} from "../model/Color";
import {Observable} from "rxjs";
import {Cacheable} from "../interfaces/Cacheable";
import {Util} from "./util";

@Injectable()
export class ColorService implements Cacheable<Color> {
    expiration: number;
    cache: Color[];
    observable: Observable<Color[]>;

    constructor(private http: HttpInterceptor) {
    }

    public getColors(): Observable<Color[]> {
        if (this.hasCache()) return Observable.of(this.cache);
        else if (this.observable) return this.observable;
        else this.saveObservable(this.http.get<Color[]>('/color', 'outcobra')
                .map((res: Color[]) => {
                    this.clearObservable();
                    this.saveCache(res);
                    return this.cache;
                }).share()
            );
    }

    saveCache(arg: Color[]): void {
        this.cache = arg;
    }

    saveObservable(observable: Observable<Color[]>): Observable<Color[]> {
        return this.observable = observable;
    }

    clearCache(): void {
        this.cache = null;
    }

    clearObservable(): void {
        this.cache = null;
    }

    hasCache(): boolean {
        return this.cache && this.expiration && Util.getMillis() - this.expiration <= 600000; // cache not older than 10 minutes TODO other?
    }
}
