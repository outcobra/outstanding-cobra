import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';

import { map, switchMap } from 'rxjs/operators';
import { MarkGroupDto } from '../model/mark-group.dto';
import { MarkService } from './mark.service';

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
