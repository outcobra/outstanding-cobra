/**
 * Created by fbbue on 25.06.2017.
 */

import {Injectable} from '@angular/core';
import {HttpInterceptor} from '../../core/http/http-interceptor';
import {AppCrudService} from '../../core/services/core/app-crud.service';
import {ExamDto} from '../model/exam.dto';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ExamService extends AppCrudService<ExamDto> {
    constructor(http: HttpInterceptor) {
        super(http, "/exam")
    }

    public readBySemester(semesterId: number): Observable<ExamDto[]> {
        throw "Not implemented"
    }

    public readAllActive(): Observable<ExamDto[]> {
        throw "Not implemented"
    }
}
