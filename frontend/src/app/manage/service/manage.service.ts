import {Injectable} from '@angular/core';
import {HttpInterceptor} from '../../core/http/HttpInterceptor';
import {Observable} from 'rxjs';
import {ManageDto} from '../model/ManageDto';
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
