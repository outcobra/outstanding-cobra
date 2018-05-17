import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AppCrudService} from '../../core/services/core/app-crud.service';
import {SubjectDto} from '../old/model/manage.dto';

@Injectable()
export class SubjectService extends AppCrudService<SubjectDto> {
    constructor(http: HttpClient) {
        super(http, '/api/subject')
    }

    public readById(id: number): Observable<SubjectDto> {
        throw new Error('not implemented');
    }

    public getCurrentSubjects(): Observable<SubjectDto[]> {
        return this._http.get<SubjectDto[]>(`/semester/current/${this._baseUri}`);
    }
}
