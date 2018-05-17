import {Injectable} from '@angular/core';
import {AppService} from './core/app.service';
import {Observable} from 'rxjs';
import {Info} from '../model/info.dto';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class InfoService extends AppService {
    constructor(http: HttpClient) {
        super(http, '/info');
    }

    public getInfo(): Observable<Info> {
        return this._http.get<Info>(this._baseUri);
    }
}
