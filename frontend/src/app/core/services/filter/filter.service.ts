import {AppService} from '../core/app.service';
import {HttpInterceptor} from '../../http/http-interceptor';
import {Injectable} from '@angular/core';
import {SubjectFilterDto} from '../../../task/model/subject-filter.dto';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FilterService extends AppService {
    constructor(http: HttpInterceptor) {
        super(http, "/filter");
    }

    public getSubjectFilter(): Observable<SubjectFilterDto> {
        return this._http.get<SubjectFilterDto>(`/subject${this._baseUri}`, 'outcobra');
    }
}
