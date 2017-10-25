import {AppService} from '../core/app.service';
import {HttpInterceptor} from '../../http/http-interceptor';
import {Injectable} from '@angular/core';
import {SchoolClassSubjectDto} from '../../../task/model/school-class-subject.dto';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SchoolClassSubjectService extends AppService {
    constructor(http: HttpInterceptor) {
        super(http, "/schoolClassSubject");
    }

    public getSchoolCLassSubjects(): Observable<SchoolClassSubjectDto> {
        return this._http.get<SchoolClassSubjectDto>(`/subject${this._baseUri}`, 'outcobra');
    }
}
