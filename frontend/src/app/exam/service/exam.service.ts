import {Injectable} from '@angular/core';
import {AppCrudService} from '../../core/services/core/app-crud.service';
import {ExamDto} from '../model/exam.dto';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

/**
 * @author Florian Bürgi
 * @since 1.2.0
 */

@Injectable()
export class ExamService extends AppCrudService<ExamDto> {
    constructor(http: HttpClient) {
        super(http, "/api/exam")
    }

    public readBySemester(semesterId: number): Observable<ExamDto[]> {
        let uri: string = `/semester/${semesterId}${this._baseUri}`;
        return this._http.get<ExamDto[]>(uri);
    }

    public readAllActive(): Observable<ExamDto[]> {
        let uri: string = `${this._baseUri}/active`;
        return this._http.get<ExamDto[]>(uri);
    }


}
