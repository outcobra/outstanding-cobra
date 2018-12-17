import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AppCrudService} from '../../core/services/core/app-crud.service';
import {SchoolClassDto, SchoolYearDto} from '../old/model/manage.dto';

@Injectable()
export class SchoolClassService extends AppCrudService<SchoolClassDto> {
    constructor(http: HttpClient) {
        super(http, '/api/schoolClass');
    }

    public readSchoolYearsByClass(schoolClassId: number): Observable<Array<SchoolYearDto>> {
        return this._http.get<Array<SchoolYearDto>>(`${this._baseUri}/${schoolClassId}/schoolYear`);
    }
}
