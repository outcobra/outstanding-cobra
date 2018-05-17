import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../../core/services/core/app.service';
import {ManageDto, SchoolClassDto, SchoolYearDto, SubjectDto} from '../old/model/manage.dto';

@Injectable()
export class ManageService extends AppService {
    constructor(http: HttpClient) {
        super(http, '/api/manage')
    }

    public getManageData(): Observable<ManageDto> {
        return this._http.get<ManageDto>(this._baseUri);
    }

    public getSchoolClasses(): Observable<Array<SchoolClassDto>> {
        return this._http.get<Array<SchoolClassDto>>(`${this._baseUri}/classes`);
    }

    public getSchoolYearSemester(): Observable<Array<SchoolYearDto>> {
        return this._http.get<Array<SchoolYearDto>>(`${this._baseUri}/schoolYearsSemesters`);
    }

    public getSubjects(): Observable<Array<SubjectDto>> {
        return this._http.get<Array<SubjectDto>>(`${this._baseUri}/subjects`);
    }

}
