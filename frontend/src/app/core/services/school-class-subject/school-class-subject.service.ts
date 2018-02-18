import {Injectable} from '@angular/core';
import {SchoolClassSubjectDto} from '../../../task/model/school-class-subject.dto';
import {Observable} from 'rxjs/Observable';
import {CacheableService} from '../core/cacheable.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SchoolClassSubjectService extends CacheableService<Array<SchoolClassSubjectDto>> {
    constructor(http: HttpClient) {
        super(http, "/api/schoolClassSubject");
    }

    public getSchoolClassSubjects(): Observable<Array<SchoolClassSubjectDto>> {
        return this.getFromCacheOrFetch(() => this._http.get<Array<SchoolClassSubjectDto>>(this._baseUri));
    }
}
