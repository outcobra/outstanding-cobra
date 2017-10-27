import {Injectable} from '@angular/core';
import {HttpInterceptor} from '../http/http-interceptor';
import {ColorDto} from '../model/color.dto';
import {Observable} from 'rxjs/Observable';
import {CacheableService} from './core/cacheable.service';

@Injectable()
export class ColorService extends CacheableService<ColorDto[]> {
    constructor(http: HttpInterceptor) {
        super(http, '/color')
    }

    public getColors(): Observable<ColorDto[]> {
        return this.getFromCacheOrFetch(() => this._http.get<ColorDto[]>(this._baseUri, 'outcobra'));
    }
}
