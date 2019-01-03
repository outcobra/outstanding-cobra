import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AppCrudService} from '../core/app-crud.service';
import {SchoolClassDto} from '../../model/manage/school-class.dto';
import {SchoolYearDto} from '../../model/manage/school-year.dto';

@Injectable()
export class SchoolClassService extends AppCrudService<SchoolClassDto> {
    constructor(http: HttpClient) {
        super(http, '/api/schoolClass');
    }

    public readSchoolYearsByClass(schoolClassId: number): Observable<Array<SchoolYearDto>> {
        return this._http.get<Array<SchoolYearDto>>(`${this._baseUri}/${schoolClassId}/schoolYear`);
    }
}
