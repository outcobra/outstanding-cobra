import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {SchoolClassSubjectDto} from '../../../task/model/school-class-subject.dto';
import {Observable} from 'rxjs';
import {SchoolClassSubjectService} from './school-class-subject.service';

@Injectable()
export class SchoolClassSubjectResolver implements Resolve<Array<SchoolClassSubjectDto>> {
    constructor(private _schoolClassSubjectService: SchoolClassSubjectService) {
    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<SchoolClassSubjectDto>> | Promise<Array<SchoolClassSubjectDto>> | Array<SchoolClassSubjectDto> {
        return this._schoolClassSubjectService.getSchoolClassSubjects();
    }

}
