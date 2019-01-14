import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SubjectDto} from '../../../manage/old/model/manage.dto';
import {AppCrudService} from '../core/app-crud.service';

@Injectable()
export class SubjectService extends AppCrudService<SubjectDto> {
    constructor(http: HttpClient) {
        super(http, '/api/subject');
    }

    public readById(id: number): Observable<SubjectDto> {
        throw new Error('not implemented');
    }

    public getCurrentSubjects(): Observable<SubjectDto[]> {
        return this._http.get<SubjectDto[]>(`/semester/current/${this._baseUri}`);
    }

    public getSubjectsBySchoolClassAndSemester(schoolClassId: number, semesterId: number): Observable<SubjectDto[]> {
        return this._http.get<SubjectDto[]>(`${this._baseUri}/schoolClass/${schoolClassId}/semester/${semesterId}`);
    }

    public getSubjectsBySchoolClass(schoolClassId: number): Observable<SubjectDto[]> {
        return this._http.get<SubjectDto[]>(`${this._baseUri}/schoolClass/${schoolClassId}`);
    }

    public getSubjectsBySemester(semesterId: number): Observable<SubjectDto[]> {
        return this._http.get<SubjectDto[]>(`${this._baseUri}/semester/${semesterId}`);
    }
}