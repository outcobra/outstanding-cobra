import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Info } from '../model/info.dto';
import { AppService } from './core/app.service';

@Injectable()
export class InfoService extends AppService {
  constructor(http: HttpClient) {
    super(http, '/info');
  }

  public getInfo(): Observable<Info> {
    return this._http.get<Info>(this._baseUri);
  }
}
