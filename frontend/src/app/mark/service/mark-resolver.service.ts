import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {MarkService} from './mark.service';
import {MarkDto} from '../model/mark.dto';

@Injectable()
export class MarkResolver implements Resolve<MarkDto> {
    constructor(private _markService: MarkService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MarkDto | Observable<MarkDto> | Promise<MarkDto> {
        let markId = route.params['markId'];
        return this._markService.getMarkById(markId);
    }

}
