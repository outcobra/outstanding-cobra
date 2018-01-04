import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {SubjectDto} from '../../../manage/model/manage.dto';
import {Observable} from 'rxjs/Observable';
import {SubjectService} from '../../../manage/service/subject.service';
import {Injectable} from '@angular/core';

@Injectable()
export class CurrentSubjectsResolverService implements Resolve<Array<SubjectDto>> {
    constructor(private _subjectService: SubjectService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<SubjectDto>> | Promise<Array<SubjectDto>> | Array<SubjectDto> {
        return this._subjectService.getCurrentSubjects();
    }
}
