import {Injectable} from '@angular/core';
import {HttpInterceptor} from '../../core/http/http-interceptor';
import {SemesterMarkDto} from '../model/semester-mark.dto';
import {Observable} from 'rxjs/Observable';
import {AppService} from '../../core/services/core/app.service';

@Injectable()
export class MarkService extends AppService {
    constructor(http: HttpInterceptor) {
        super(http, '/mark');
    }

    public getMarkSemesterBySemesterId(semesterId: number): Observable<SemesterMarkDto> {
        return this._http.get<SemesterMarkDto>(`${this._baseUri}/semester/${semesterId}`);
    }

    public deleteMark(id: number): Observable<any> {
        return this._http.delete(`${this._baseUri}/value/${id}`);
    }

    public deleteMarkGroup(id: number): Observable<any> {
        return this._http.delete(`${this._baseUri}/group/${id}`);
    }
}
