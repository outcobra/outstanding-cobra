import {Injectable} from '@angular/core';
import {HttpInterceptor} from '../../core/http/http-interceptor';
import {Observable} from 'rxjs/Observable';
import {ManageDto} from '../model/manage.dto';
import {AppService} from '../../core/services/core/app.service';

@Injectable()
export class ManageService extends AppService {
    constructor(http: HttpInterceptor) {
        super(http, '/manage')
    }

    public getManageData(): Observable<ManageDto> {
        return this._http.get<ManageDto>(this._baseUri, 'outcobra');
    }

}
