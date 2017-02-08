import {Injectable} from '@angular/core';
import {HttpInterceptor} from '../http/HttpInterceptor';
import {Color} from '../model/Color';
import {Observable} from 'rxjs';
import {CacheableService} from './core/cacheable.service';

@Injectable()
export class ColorService extends CacheableService<Color[]> {
    constructor(http: HttpInterceptor) {
        super(http, '/color')
    }

    public getColors(): Observable<Color[]> {
        if (this.hasCache()) return Observable.of(this.cache);
        else if (this.observable) return this.observable;
        return this.saveObservable(this.http.get<Color[]>(this.baseUri, 'outcobra')
                .map((res: Color[]) => {
                    this.clearObservable();
                    this.saveCache(res);
                    return this.cache;
                }).share()
            );
    }
}
