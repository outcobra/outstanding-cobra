import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ManageDto} from '../model/manage.dto';
import {AppService} from '../../../core/services/core/app.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ManageService extends AppService {
    constructor(http: HttpClient) {
        super(http, '/api/manage')
    }

    public getManageData(): Observable<ManageDto> {
        return this._http.get<ManageDto>(this._baseUri);
    }

}
