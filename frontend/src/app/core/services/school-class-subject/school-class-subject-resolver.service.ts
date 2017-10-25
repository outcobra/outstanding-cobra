import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {SchoolClassSubjectDto} from '../../../task/model/school-class-subject.dto';
import {Observable} from 'rxjs/Observable';
import {SchoolClassSubjectService} from './school-class-subject.service';

@Injectable()
export class SubjectFilterResolver implements Resolve<SchoolClassSubjectDto> {
    constructor(private _filterService: SchoolClassSubjectService) {
    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SchoolClassSubjectDto> | Promise<SchoolClassSubjectDto> | SchoolClassSubjectDto {
        return this._filterService.getSchoolCLassSubjects();
    }

}
