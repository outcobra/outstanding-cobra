import {Injectable} from '@angular/core';
import {ColorDto} from '../model/color.dto';
import {Observable} from 'rxjs';
import {CacheableService} from './core/cacheable.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ColorService extends CacheableService<ColorDto[]> {
    constructor(http: HttpClient) {
        super(http, '/api/color')
    }

    public getColors(): Observable<ColorDto[]> {
        return this.getFromCacheOrFetch(() => this._http.get<ColorDto[]>(this._baseUri));
    }
}
