import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import {SchoolClassService} from '../school-class.service';
import {SchoolClassDto} from '../../../model/manage/school-class.dto';

@Injectable()
export class SchoolClassByIdResolverService implements Resolve<SchoolClassDto> {
    constructor(private _schoolClassService: SchoolClassService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SchoolClassDto> | Promise<SchoolClassDto> | SchoolClassDto {
        return of(route.paramMap)
            .pipe(
                filter(params => params.has('schoolClassId')),
                map(params => parseInt(params.get('schoolClassId'))),
                switchMap(classId => this._schoolClassService.readById(classId))
            );
    }

}
