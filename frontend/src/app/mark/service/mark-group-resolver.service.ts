import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MarkGroupDto } from '../model/mark-group.dto';
import { MarkService } from './mark.service';

@Injectable()
export class MarkGroupResolver implements Resolve<MarkGroupDto> {
  constructor(private _markService: MarkService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MarkGroupDto | Observable<MarkGroupDto> | Promise<MarkGroupDto> {
    let groupId = route.params['groupId'];
    return this._markService.getMarkGroupById(groupId);
  }

}
