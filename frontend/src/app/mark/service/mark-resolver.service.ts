import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MarkDto } from '../model/mark.dto';
import { MarkService } from './mark.service';

@Injectable()
export class MarkResolver implements Resolve<MarkDto> {
  constructor(private _markService: MarkService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MarkDto | Observable<MarkDto> | Promise<MarkDto> {
    let markId = route.params['markId'];
    return this._markService.getMarkById(markId);
  }

}
