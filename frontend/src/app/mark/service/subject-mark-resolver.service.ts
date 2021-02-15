
import {of as observableOf, Observable} from 'rxjs';

import {switchMap, map} from 'rxjs/operators';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {MarkService} from './mark.service';
import {MarkGroupDto} from '../model/mark-group.dto';

@Injectable()
export class SubjectMarkGroupResolver implements Resolve<MarkGroupDto> {
    constructor(private _markService: MarkService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MarkGroupDto | Observable<MarkGroupDto> | Promise<MarkGroupDto> {
        return observableOf(route.paramMap).pipe(
            map(map => parseInt(map.get('subjectId'))),
            switchMap(subjectId => this._markService.getMarkGroupBySubjectId(subjectId)),);
    }

}
