import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SchoolClassDto, SchoolYearDto} from '../../../manage/old/model/manage.dto';
import {AppCrudService} from '../core/app-crud.service';

@Injectable()
export class SchoolClassService extends AppCrudService<SchoolClassDto> {
    constructor(http: HttpClient) {
        super(http, '/api/schoolClass');
    }

    public readSchoolYearsByClass(schoolClassId: number): Observable<Array<SchoolYearDto>> {
        return this._http.get<Array<SchoolYearDto>>(`${this._baseUri}/${schoolClassId}/schoolYear`);
    }
}
