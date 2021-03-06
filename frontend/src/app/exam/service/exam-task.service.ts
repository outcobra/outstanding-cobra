import {AppCrudService} from '../../core/services/core/app-crud.service';
import {ExamTaskDto} from '../model/exam.task.dto';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

/**
 * @author Florian Bürgi
 * @since 1.2.0
 */
@Injectable()
export class ExamTaskService extends AppCrudService<ExamTaskDto> {
    constructor(http: HttpClient) {
        super(http, "/api/examTask")
    }

    public saveAll(tasks: ExamTaskDto[]): Observable<ExamTaskDto[]> {
        return this._http.put<ExamTaskDto[]>(`/all${this._baseUri}`, tasks);
    }

    public changeState(id: number): Observable<ExamTaskDto> {
        return this._http.post<ExamTaskDto>(`${this._baseUri}/state`, id)
    }
}
