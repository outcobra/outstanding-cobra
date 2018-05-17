import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {MarkService} from './mark.service';
import {MarkGroupDto} from '../model/mark-group.dto';
import {map, switchMap} from 'rxjs/operators';

@Injectable()
export class SubjectMarkGroupResolver implements Resolve<MarkGroupDto> {
    constructor(private _markService: MarkService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MarkGroupDto | Observable<MarkGroupDto> | Promise<MarkGroupDto> {
        return of(route.paramMap).pipe(
            map(map => parseInt(map.get('subjectId'))),
            switchMap(subjectId => this._markService.getMarkGroupBySubjectId(subjectId))
        )
    }

}
