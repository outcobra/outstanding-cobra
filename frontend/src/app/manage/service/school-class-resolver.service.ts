import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {SchoolClassDto} from '../old/model/manage.dto';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {SchoolClassService} from '../../core/services/manage/school-class.service';
import {filter, map, switchMap} from 'rxjs/operators';

@Injectable()
export class SchoolClassResolverService implements Resolve<SchoolClassDto> {
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
