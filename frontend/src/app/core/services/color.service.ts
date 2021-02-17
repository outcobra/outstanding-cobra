import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColorDto } from '../model/color.dto';
import { CacheableService } from './core/cacheable.service';

@Injectable()
export class ColorService extends CacheableService<ColorDto[]> {
  constructor(http: HttpClient) {
    super(http, '/api/color');
  }

  public getColors(): Observable<ColorDto[]> {
    return this.getFromCacheOrFetch(() => this._http.get<ColorDto[]>(this._baseUri));
  }
}
