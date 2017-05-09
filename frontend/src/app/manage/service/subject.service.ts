import {Injectable} from '@angular/core';
import {HttpInterceptor} from '../../shared/http/HttpInterceptor';
import {Observable} from 'rxjs';
import {SubjectDto} from '../model/ManageDto';
import {AppCrudService} from '../../shared/services/core/app-crud.service';

@Injectable()
export class SubjectService extends AppCrudService<SubjectDto> {
    constructor(http: HttpInterceptor) {
        super(http, '/subject')
    }

    public readById(id: number): Observable<SubjectDto> {
        throw new Error('not implemented');
    }

    public update(arg: SubjectDto): Observable<SubjectDto> {
        throw new Error('not implemented');
    }

    public getCurrentSubjects(): Observable<SubjectDto[]> {
        return this._http.get<SubjectDto[]>(`/semester/current/${this._baseUri}`, 'outcobra');
    }
}
