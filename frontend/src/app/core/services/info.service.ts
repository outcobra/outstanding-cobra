import {Injectable} from '@angular/core';
import {AppService} from './core/app.service';
import {HttpInterceptor} from '../http/http-interceptor';
import {Observable} from 'rxjs/Observable';
import {Info} from '../model/info.dto';

@Injectable()
export class InfoService extends AppService {
    constructor(http: HttpInterceptor) {
        super(http, '/info');
    }

    public getInfo(): Observable<Info> {
        return this._http.get<Info>(this._baseUri, 'outcobra_public');
    }
}
