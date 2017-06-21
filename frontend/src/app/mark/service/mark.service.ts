import {Injectable} from '@angular/core';
import {AppCrudService} from '../../core/services/core/app-crud.service';
import {MarkDto} from '../model/MarkDto';
import {HttpInterceptor} from '../../core/http/http-interceptor';
import {SemesterMarkDto} from '../model/SemesterMarkDto';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MarkService extends AppCrudService<MarkDto> {
    constructor(http: HttpInterceptor) {
        super(http, '/mark');
    }

    public getMarkSemesterBySemesterId(semesterId: number): Observable<SemesterMarkDto> {
        return this._http.get<SemesterMarkDto>(`${this._baseUri}/semester/${semesterId}`);
    }
}
