import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {SemesterDto} from '../old/model/manage.dto';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import {SemesterService} from '../../core/services/manage/semester.service';

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
