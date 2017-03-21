import {Injectable} from '@angular/core';
import {AppService} from './core/app.service';
import {HttpInterceptor} from '../http/HttpInterceptor';
import {Observable} from 'rxjs';
import {Info} from '../model/Info';

@Injectable()
export class InfoService extends AppService {
    constructor(http: HttpInterceptor) {
        super(http, '/info');
    }

    getInfo(): Observable<Info> {
        return this.http.get<Info>(this.baseUri, 'outcobra_public');
    }
}
