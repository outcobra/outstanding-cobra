import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {SubjectDto} from '../../old/model/manage.dto';
import {SubjectService} from '../subject.service';

@Injectable()
export class SubjectResolverService implements Resolve<Array<SubjectDto>> {
    constructor(private _subjectService: SubjectService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<SubjectDto>> | Promise<Array<SubjectDto>> | Array<SubjectDto> {
        console.log(this._subjectService);
        return of(route.paramMap)
            .pipe(
                map(params => {
                    return {
                        schoolClassId: parseInt(params.get('schoolClassId')),
                        semesterId: parseInt(params.get('semesterId'))
                    };
                }),
                switchMap(({schoolClassId, semesterId}) => {
                    if (schoolClassId && semesterId) {
                        return this._subjectService.getSubjectsBySchoolClassAndSemester(schoolClassId, semesterId);
                    } else if (schoolClassId) {
                        return this._subjectService.getSubjectsBySchoolClass(schoolClassId);
                    } else if (semesterId) {
                        return this._subjectService.getSubjectsBySemester(semesterId);
                    }
                    return this._subjectService.readAll();
                })
            )
            ;
    }

}
