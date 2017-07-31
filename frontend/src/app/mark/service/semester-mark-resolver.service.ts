import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {SemesterMarkDto} from '../model/semester-mark.dto';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {MarkService} from './mark.service';

@Injectable()
export class SemesterMarkResolver implements Resolve<SemesterMarkDto> {
    constructor(private _markService: MarkService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        SemesterMarkDto
        | Observable<SemesterMarkDto>
        | Promise<SemesterMarkDto> {
        let semesterId = route.params['semesterId'];
        return this._markService.getMarkSemesterBySemesterId(semesterId);
    }

}
