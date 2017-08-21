import {Injectable} from '@angular/core';
import {HttpInterceptor} from '../../core/http/http-interceptor';
import {Observable} from 'rxjs/Observable';
import {SubjectDto} from '../model/manage.dto';
import {AppCrudService} from '../../core/services/core/app-crud.service';

@Injectable()
export class SubjectService extends AppCrudService<SubjectDto> {
    constructor(http: HttpInterceptor) {
        super(http, '/subject')
    }

    public readById(id: number): Observable<SubjectDto> {
        throw new Error('not implemented');
    }

    public getCurrentSubjects(): Observable<SubjectDto[]> {
        return this._http.get<SubjectDto[]>(`/semester/current/${this._baseUri}`, 'outcobra');
    }
}
