import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import {SemesterService} from '../../core/services/manage/semester.service';
import { SemesterDto } from '../../core/model/manage/semester.dto';

@Injectable()
export class SemesterResolverService implements Resolve<SemesterDto> {
    constructor(private _semesterService: SemesterService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SemesterDto> | Promise<SemesterDto> | SemesterDto {
        return of(route.paramMap)
            .pipe(
                filter(params => params.has('semesterId')),
                map(params => parseInt(params.get('semesterId'))),
                switchMap(semesterId => this._semesterService.readById(semesterId))
            );
    }
}
