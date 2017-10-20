import {Injectable} from '@angular/core';
import {HttpInterceptor} from '../../core/http/http-interceptor';
import {AppCrudService} from '../../core/services/core/app-crud.service';
import {ExamDto} from '../model/exam.dto';
import {Observable} from 'rxjs/Observable';

/**
 * @author Florian Bürgi
 * @since 1.2.0
 */

@Injectable()
export class ExamService extends AppCrudService<ExamDto> {
    constructor(http: HttpInterceptor) {
        super(http, "/exam")
    }

    public readBySemester(semesterId: number): Observable<ExamDto[]> {
        var uri: string = `/semester/${semesterId}${this._baseUri}`;
        return this._http.get<ExamDto[]>(uri);
    }

    public readAllActive(): Observable<ExamDto[]> {
        var uri: string = `/active${this._baseUri}`;
        return this._http.get<ExamDto[]>(uri);
    }


}
