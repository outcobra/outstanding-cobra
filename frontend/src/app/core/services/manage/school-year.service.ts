import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppCrudService} from '../core/app-crud.service';
import {SchoolYearDto} from '../../model/manage/school-year.dto';

@Injectable()
export class SchoolYearService extends AppCrudService<SchoolYearDto> {
    constructor(http: HttpClient) {
        super(http, '/api/schoolYear');
    }

    public readById(id: number): Observable<SchoolYearDto> {
        throw new Error('not implemented');
    }

    public linkSchoolClass(id: number, schoolClassId: number): Observable<SchoolYearDto> {
        return this._http.put<SchoolYearDto>(`${this._baseUri}/${id}/link/schoolClass/${schoolClassId}`, null);
    }
}
