import {Injectable} from '@angular/core';
import {HttpInterceptor} from '../../shared/http/HttpInterceptor';
import {Observable} from 'rxjs';
import {ManageDto} from '../model/ManageDto';
import {AppService} from '../../shared/services/core/app.service';

@Injectable()
export class ManageService extends AppService {
    constructor(http: HttpInterceptor) {
        super(http, '/manage')
    }

    public getManageData(): Observable<ManageDto> {
        return this._http.get<ManageDto>(this._baseUri, 'outcobra');
    }

}
